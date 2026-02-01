// Database client for Azure SQL Database
import sql from 'mssql';

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
let pool: sql.ConnectionPool | null = null;

async function getConnectionPool(): Promise<sql.ConnectionPool> {
  if (pool && pool.connected) {
    return pool;
  }

  let connectionString = process.env.AZURE_SQL_CONNECTION_STRING || process.env.DATABASE_URL;
  
  // If no connection string, build it from individual components
  if (!connectionString) {
    const server = process.env.AZURE_SQL_SERVER || 'remake.database.windows.net';
    const database = process.env.AZURE_SQL_DATABASE;
    const user = process.env.AZURE_SQL_USER;
    const password = process.env.AZURE_SQL_PASSWORD;
    
    if (!database || !user || !password) {
      throw new Error('Azure SQL Database connection is not configured. Please set AZURE_SQL_CONNECTION_STRING or provide AZURE_SQL_DATABASE, AZURE_SQL_USER, and AZURE_SQL_PASSWORD environment variables.');
    }
    
    connectionString = `Server=${server};Database=${database};User Id=${user};Password=${password};Encrypt=true;TrustServerCertificate=false`;
  }

  if (!connectionString) {
    throw new Error('Azure SQL Database connection string is not configured.');
  }

  const config: sql.config = {
    connectionString,
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

  pool = new sql.ConnectionPool(config);
  await pool.connect();
  return pool;
}

export class DatabaseClient {
  private db: any;
  private isLocalDev: boolean;
  private useAzureSQL: boolean;

  constructor(env: any) {
    this.isLocalDev = process.env.NODE_ENV === 'development';
    // Check if Azure SQL connection string is available
    const hasAzureSQL = !!(process.env.AZURE_SQL_CONNECTION_STRING || 
      (process.env.AZURE_SQL_DATABASE && process.env.AZURE_SQL_USER && process.env.AZURE_SQL_PASSWORD));
    
    this.useAzureSQL = hasAzureSQL && !this.isLocalDev;
    
    if (env?.instructions_db && !this.useAzureSQL) {
      // Fallback to D1 if available and not using Azure SQL
      this.db = env.instructions_db;
    } else if (this.isLocalDev && !hasAzureSQL) {
      // Local development fallback - use singleton in-memory storage
      this.db = LocalDevDB.getInstance();
    }
  }

  private async getDb() {
    if (this.useAzureSQL) {
      return await getConnectionPool();
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
      const pool = db as sql.ConnectionPool;
      const request = pool.request();
      request.input('slug', sql.NVarChar, slug);
      const result = await request.query<Comment>(
        'SELECT * FROM comments WHERE slug = @slug ORDER BY created_at DESC'
      );
      return result.recordset;
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
      const pool = db as sql.ConnectionPool;
      const request = pool.request();
      request.input('slug', sql.NVarChar, slug);
      request.input('author', sql.NVarChar, author);
      request.input('email', sql.NVarChar, email);
      request.input('content', sql.NVarChar, content);
      request.input('password', sql.NVarChar, password || '');
      
      const result = await request.query<Comment>(
        `INSERT INTO comments (slug, author, email, content, password, created_at, updated_at) 
         OUTPUT INSERTED.*
         VALUES (@slug, @author, @email, @content, @password, GETUTCDATE(), GETUTCDATE())`
      );
      
      if (result.recordset && result.recordset.length > 0) {
        return result.recordset[0];
      }
      throw new Error('Failed to create comment');
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
      const pool = db as sql.ConnectionPool;
      const request = pool.request();
      request.input('id', sql.Int, id);
      request.input('content', sql.NVarChar, content);
      
      const result = await request.query<Comment>(
        `UPDATE comments 
         SET content = @content, updated_at = GETUTCDATE() 
         OUTPUT INSERTED.*
         WHERE id = @id`
      );
      
      if (result.recordset && result.recordset.length > 0) {
        return result.recordset[0];
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
      const pool = db as sql.ConnectionPool;
      const request = pool.request();
      request.input('id', sql.Int, id);
      
      // First, get the comment to verify password
      const commentResult = await request.query<{ password: string }>(
        'SELECT password FROM comments WHERE id = @id'
      );
      
      if (!commentResult.recordset || commentResult.recordset.length === 0) {
        return false;
      }
      
      const comment = commentResult.recordset[0];
      
      // If comment has a password, verify it matches
      if (comment.password && comment.password !== '' && comment.password !== password) {
        throw new Error('Incorrect password');
      }
      
      // Delete the comment
      const deleteRequest = pool.request();
      deleteRequest.input('id', sql.Int, id);
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
