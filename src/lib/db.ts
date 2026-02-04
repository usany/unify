// Database client for Azure SQL Database
// Dynamically import mssql to handle environments where it might not be available
let sql: any = null;

async function loadMssql(): Promise<any> {
  if (!sql) {
    try {
      // @ts-ignore - Dynamic import for optional dependency
      sql = await import('mssql');
    } catch (error: any) {
      const errorMsg = error?.message || String(error);
      if (errorMsg.includes('Cannot find module') || errorMsg.includes('MODULE_NOT_FOUND')) {
        console.warn('mssql package is not installed. To use Azure SQL Database, please run: pnpm add mssql');
      } else {
        console.warn('mssql package not available, Azure SQL connections will not work:', errorMsg);
      }
      return null;
    }
  }
  return sql;
}

// Local development fallback database
class LocalDevDB {
  private static instance: LocalDevDB;
  private comments: Comment[] = [];
  private nextId = 1;

  static getInstance(): LocalDevDB {
    if (!LocalDevDB.instance) {
      LocalDevDB.instance = new LocalDevDB();
    }
    return LocalDevDB.instance;
  }

  private constructor() {}

  prepare(query: string) {
    return new LocalDevQuery(this, query);
  }

  getComments() {
    return this.comments;
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
  }

  getComment(id: number) {
    return this.comments.find(c => c.id === id);
  }

  updateComment(id: number, content: string) {
    const comment = this.comments.find(c => c.id === id);
    if (comment) {
      comment.content = content;
      comment.updated_at = new Date().toISOString();
      return comment;
    }
    return null;
  }

  deleteComment(id: number, password?: string) {
    const comment = this.getComment(id);
    if (!comment) {
      return {
        success: true,
        meta: { changes: 0 }
      };
    }
    
    // If comment has a password, verify it matches
    if (comment.password && comment.password !== '' && comment.password !== password) {
      throw new Error('Incorrect password');
    }
    
    const initialLength = this.comments.length;
    this.comments = this.comments.filter(c => c.id !== id);
    return {
      success: true,
      meta: { changes: initialLength - this.comments.length }
    };
  }
}

class LocalDevQuery {
  private db: LocalDevDB;
  private query: string;
  private params: any[] = [];

  constructor(db: LocalDevDB, query: string) {
    this.db = db;
    this.query = query;
  }

  bind(...params: any[]) {
    this.params = params;
    return this;
  }

  async all() {
    if (this.query.includes('WHERE slug =')) {
      const slug = this.params[0];
      return {
        results: this.db.getComments()
          .filter(comment => comment.slug === slug)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      };
    }
    return { results: this.db.getComments() };
  }

  async first() {
    if (this.query.includes('INSERT')) {
      const [slug, author, email, content, password] = this.params;
      const newComment: Comment = {
        id: this.db['nextId']++,
        slug,
        author,
        email,
        content,
        password: password || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.db.addComment(newComment);
      return newComment;
    } else if (this.query.includes('UPDATE')) {
      const [content, id] = this.params;
      return this.db.updateComment(id, content);
    } else if (this.query.includes('SELECT') && this.query.includes('WHERE id =')) {
      const id = this.params[0];
      return this.db.getComment(id) || null;
    }
    return null;
  }

  async run() {
    if (this.query.includes('DELETE')) {
      const [id, password] = this.params;
      return this.db.deleteComment(id, password);
    }
    return { success: true, meta: { changes: 0 } };
  }
}

export interface Comment {
  id: number;
  slug: string;
  author: string;
  email: string;
  content: string;
  password?: string;
  created_at: string;
  updated_at: string;
}

// Connection pool for Azure SQL Database
let pool: any = null;

async function getConnectionPool(): Promise<any> {
  const mssql = await loadMssql();
  if (!mssql) {
    throw new Error('mssql package is not available. Cannot connect to Azure SQL Database. Please install mssql package or use an alternative database.');
  }

  if (pool) {
    try {
      // Check if pool is still connected by attempting a simple query
      const request = pool.request();
      await request.query('SELECT 1');
      return pool;
    } catch (error) {
      // Pool is disconnected or in error state, reset it
      try {
        if (pool && typeof pool.close === 'function') {
          await pool.close();
        }
      } catch (closeError) {
        // Ignore close errors
      }
      pool = null;
    }
  }

  // Use individual environment variables
  let server = process.env.AZURE_SQL_SERVER;
  let database = process.env.AZURE_SQL_DATABASE;
  let user = process.env.AZURE_SQL_USER;
  let password = process.env.AZURE_SQL_PASSWORD;

  if (!database || !user || !password) {
    throw new Error('Azure SQL Database connection is not configured. Please provide AZURE_SQL_DATABASE, AZURE_SQL_USER, and AZURE_SQL_PASSWORD environment variables.');
  }

  const config: any = {
    server,
    database,
    user,
    password,
    options: {
      encrypt: true,
      trustServerCertificate: false,
      enableArithAbort: true,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  };

  try {
    pool = new mssql.ConnectionPool(config);
    await pool.connect();
    return pool;
  } catch (error: any) {
    pool = null;
    const errorMessage = error?.message || 'Unknown error';
    if (errorMessage.includes('Login failed') || errorMessage.includes('authentication')) {
      throw new Error(`Azure SQL Database authentication failed: ${errorMessage}. Please check your credentials.`);
    }
    if (errorMessage.includes('timeout') || errorMessage.includes('ECONNREFUSED') || errorMessage.includes('getaddrinfo')) {
      throw new Error(`Cannot connect to Azure SQL Database at ${server}. Please check your connection settings and firewall rules.`);
    }
    if (errorMessage.includes('Invalid object name') || errorMessage.includes('does not exist')) {
      throw new Error(`Database table does not exist. Please run the migration file migrations/0001_comments_schema_azure.sql on your Azure SQL Database.`);
    }
    throw new Error(`Failed to connect to Azure SQL Database: ${errorMessage}`);
  }
}

export class DatabaseClient {
  private db: any;
  private isLocalDev: boolean;
  private useAzureSQL: boolean;

  constructor(env: any) {
    this.isLocalDev = process.env.NODE_ENV === 'development';
    // Check if Azure SQL environment variables are available and valid
    const hasIndividualVars = !!(process.env.AZURE_SQL_DATABASE && 
      process.env.AZURE_SQL_DATABASE.trim().length > 0 &&
      process.env.AZURE_SQL_USER && 
      process.env.AZURE_SQL_USER.trim().length > 0 &&
      process.env.AZURE_SQL_PASSWORD && 
      process.env.AZURE_SQL_PASSWORD.trim().length > 0);
    const hasAzureSQL = hasIndividualVars;
    
    // Use Azure SQL if configured (even in local dev if explicitly configured)
    // But prefer local dev fallback if Azure SQL is not configured
    // Note: mssql package availability will be checked at runtime
    this.useAzureSQL = hasAzureSQL;
    
    // Always set up fallback databases in case Azure SQL fails
    if (!this.useAzureSQL) {
      // Local development fallback - use singleton in-memory storage
      this.db = LocalDevDB.getInstance();
    }
  }

  private async getDb() {
    if (this.useAzureSQL) {
      try {
        // Check if mssql is available before trying to connect
        const mssql = await loadMssql();
        if (!mssql) {
          // mssql package not available, fall back to alternative database
          if (this.db) {
            console.warn('mssql package is not available. Falling back to alternative database. To use Azure SQL, please install: pnpm add mssql');
            this.useAzureSQL = false; // Disable Azure SQL for this instance
            return this.db;
          }
          throw new Error('mssql package is not available and no fallback database is configured. Please install mssql (pnpm add mssql) or configure an alternative database.');
        }
        return await getConnectionPool();
      } catch (error) {
        // If Azure SQL connection fails and we have a fallback, use it
        if (this.db) {
          console.warn('Azure SQL connection failed, falling back to alternative database:', error instanceof Error ? error.message : error);
          this.useAzureSQL = false; // Disable Azure SQL for this instance to avoid repeated failures
          return this.db;
        }
        // Otherwise, throw the error
        throw error;
      }
    }
    if (!this.db) {
      throw new Error('Database not initialized. Make sure instructions_db binding is available or Azure SQL connection is configured.');
    }
    return this.db;
  }

  // Comments CRUD operations
  async getComments(slug: string): Promise<Comment[]> {
    const db = await this.getDb();
    
    if (this.useAzureSQL) {
      const mssql = await loadMssql();
      if (!mssql) {
        throw new Error('mssql package is not available');
      }
      const pool = db as any;
      const request = pool.request();
      request.input('slug', mssql.NVarChar, slug);
      const result = await request.query(
        'SELECT * FROM comments WHERE slug = @slug ORDER BY created_at DESC'
      );
      return (result.recordset || []) as Comment[];
    } else {
    const result = await db
      .prepare('SELECT * FROM comments WHERE slug = ? ORDER BY created_at DESC')
      .bind(slug)
      .all();
    return result.results as Comment[];
    }
  }

  async createComment(slug: string, author: string, email: string, content: string, password?: string): Promise<Comment> {
    const db = await this.getDb();
    
    if (this.useAzureSQL) {
      const mssql = await loadMssql();
      if (!mssql) {
        throw new Error('mssql package is not available');
      }
      const pool = db as any;
      const request = pool.request();
      request.input('slug', mssql.NVarChar, slug);
      request.input('author', mssql.NVarChar, author);
      request.input('email', mssql.NVarChar, email);
      request.input('content', mssql.NVarChar, content);
      request.input('password', mssql.NVarChar, password || '');
      
      try {
        const result = await request.query(
          `INSERT INTO comments (slug, author, email, content, password, created_at, updated_at) 
           OUTPUT INSERTED.*
           VALUES (@slug, @author, @email, @content, @password, GETUTCDATE(), GETUTCDATE())`
        );
        
        if (result.recordset && result.recordset.length > 0) {
          return result.recordset[0] as Comment;
        }
        throw new Error('Failed to create comment: No record returned from INSERT');
      } catch (error: any) {
        const errorMessage = error?.message || 'Unknown error';
        if (errorMessage.includes('Invalid object name') || errorMessage.includes('does not exist')) {
          throw new Error('Comments table does not exist. Please run the migration file migrations/0001_comments_schema_azure.sql on your Azure SQL Database.');
        }
        if (errorMessage.includes('Cannot insert duplicate key') || errorMessage.includes('UNIQUE constraint')) {
          throw new Error('A comment with this information already exists.');
        }
        if (errorMessage.includes('String or binary data would be truncated')) {
          throw new Error('Comment data is too long. Please shorten your input.');
        }
        throw new Error(`Failed to create comment: ${errorMessage}`);
      }
    } else {
    const result = await db
      .prepare('INSERT INTO comments (slug, author, email, content, password) VALUES (?, ?, ?, ?, ?) RETURNING *')
      .bind(slug, author, email, content, password || '')
      .first();
    return result as Comment;
    }
  }

  async updateComment(id: number, content: string): Promise<Comment | null> {
    const db = await this.getDb();
    
    if (this.useAzureSQL) {
      const mssql = await loadMssql();
      if (!mssql) {
        throw new Error('mssql package is not available');
      }
      const pool = db as any;
      const request = pool.request();
      request.input('id', mssql.Int, id);
      request.input('content', mssql.NVarChar, content);
      
      const result = await request.query(
        `UPDATE comments 
         SET content = @content, updated_at = GETUTCDATE() 
         OUTPUT INSERTED.*
         WHERE id = @id`
      );
      
      if (result.recordset && result.recordset.length > 0) {
        return result.recordset[0] as Comment;
      }
      return null;
    } else {
    const result = await db
      .prepare('UPDATE comments SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *')
      .bind(content, id)
      .first();
    return result as Comment | null;
    }
  }

  async deleteComment(id: number, password?: string): Promise<boolean> {
    const db = await this.getDb();
    
    if (this.useAzureSQL) {
      const mssql = await loadMssql();
      if (!mssql) {
        throw new Error('mssql package is not available');
      }
      const pool = db as any;
      const request = pool.request();
      request.input('id', mssql.Int, id);
      
      // First, get the comment to verify password
      const commentResult = await request.query(
        'SELECT password FROM comments WHERE id = @id'
      );
      
      if (!commentResult.recordset || commentResult.recordset.length === 0) {
        return false;
      }
      
      const comment = commentResult.recordset[0] as { password: string };
      
      // If comment has a password, verify it matches
      if (comment.password && comment.password !== '' && comment.password !== password) {
        throw new Error('Incorrect password');
      }
      
      // Delete the comment
      const deleteRequest = pool.request();
      deleteRequest.input('id', mssql.Int, id);
      const deleteResult = await deleteRequest.query(
        'DELETE FROM comments WHERE id = @id'
      );
      
      return (deleteResult.rowsAffected[0] || 0) > 0;
    } else {
    // First, get the comment to verify password
    const comment = await db
      .prepare('SELECT password FROM comments WHERE id = ?')
      .bind(id)
      .first();
    
    if (!comment) {
      return false;
    }
    
    // If comment has a password, verify it matches
    if (comment.password && comment.password !== '' && comment.password !== password) {
      throw new Error('Incorrect password');
    }
    
    // Delete the comment
    const result = await db.prepare('DELETE FROM comments WHERE id = ?').bind(id).run();
    return result.success && (result.meta?.changes || 0) > 0;
    }
  }
}

// Helper function to create database client
export function createDBClient(env: any): DatabaseClient {
  return new DatabaseClient(env);
}
