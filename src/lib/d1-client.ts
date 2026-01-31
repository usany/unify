// Cloudflare D1 Client Utility
// Simplified database client for consistent D1 operations
let globalComments: Comment[] = [];
let globalNextId = 1;

class LocalDevDB {
  private static instance: LocalDevDB;

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
    return globalComments;
  }

  addComment(comment: Comment) {
    globalComments.push(comment);
  }

  getComment(id: number) {
    return globalComments.find(c => c.id === id);
  }

  updateComment(id: number, content: string) {
    const comment = globalComments.find(c => c.id === id);
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
    
    const initialLength = globalComments.length;
    globalComments = globalComments.filter(c => c.id !== id);
    return {
      success: true,
      meta: { changes: initialLength - globalComments.length }
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
        id: globalNextId++,
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

export class DatabaseClient {
  private db: any;
  private isLocalDev: boolean;

  constructor(env: any) {
    this.isLocalDev = env?.NODE_ENV === 'development';
    if (env?.instructions_db) {
      this.db = env.instructions_db;
    } else if (this.isLocalDev) {
      // Local development fallback - use singleton in-memory storage
      this.db = LocalDevDB.getInstance();
    }
  }

  private getDb() {
    if (!this.db) {
      throw new Error('Database not initialized. Make sure instructions_db binding is available.');
    }
    return this.db;
  }

  // Comments CRUD operations
  async getComments(slug: string): Promise<Comment[]> {
    const db = this.getDb();
    const result = await db
      .prepare('SELECT * FROM comments WHERE slug = ? ORDER BY created_at DESC')
      .bind(slug)
      .all();
    return result.results as Comment[];
  }

  async createComment(slug: string, author: string, email: string, content: string, password?: string): Promise<Comment> {
    const db = this.getDb();
    const result = await db
      .prepare('INSERT INTO comments (slug, author, email, content, password) VALUES (?, ?, ?, ?, ?) RETURNING *')
      .bind(slug, author, email, content, password || '')
      .first();
    return result as Comment;
  }

  async updateComment(id: number, content: string): Promise<Comment | null> {
    const db = this.getDb();
    const result = await db
      .prepare('UPDATE comments SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *')
      .bind(content, id)
      .first();
    return result as Comment | null;
  }

  async deleteComment(id: number, password?: string): Promise<boolean> {
    const db = this.getDb();
    
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

export function createDBClient(env: any): DatabaseClient {
  return new DatabaseClient(env);
}

export interface D1Result<T = any> {
  success: boolean;
  results?: T[];
  meta?: {
    changes?: number;
    last_row_id?: number;
    duration?: number;
  };
}

export class D1Client {
  private db: any;
  private isLocalDev: boolean;
  private fallbackClient: any;

  constructor(env: any) {
    this.isLocalDev = env?.NODE_ENV === 'development';
    
    if (env?.instructions_db) {
      // Production/remote D1 database
      this.db = env.instructions_db;
      this.fallbackClient = null;
    } else if (this.isLocalDev) {
      // Local development - use the existing fallback database
      this.fallbackClient = createDBClient(env);
      this.db = null;
    } else {
      throw new Error('D1 database binding "instructions_db" not found in environment');
    }
  }

  // Execute a prepared statement with parameters
  async execute<T = any>(
    query: string,
    params: any[] = []
  ): Promise<D1Result<T>> {
    if (this.fallbackClient) {
      return await this.executeFallback(query, params);
    }

    try {
      const stmt = this.db.prepare(query);
      const boundStmt = params.length > 0 ? stmt.bind(...params) : stmt;
      
      // Determine if it's a SELECT query or a modification query
      if (query.trim().toLowerCase().startsWith('select')) {
        const result = await boundStmt.all();
        return {
          success: true,
          results: result.results,
          meta: result.meta
        };
      } else {
        const result = await boundStmt.run();
        return {
          success: result.success || true,
          meta: result.meta
        };
      }
    } catch (error) {
      console.error('D1 Query Error:', error);
      return {
        success: false,
        results: [],
        meta: { changes: 0 }
      };
    }
  }

  // Get first result from a query
  async first<T = any>(query: string, params: any[] = []): Promise<T | null> {
    if (this.fallbackClient) {
      return await this.firstFallback(query, params);
    }

    try {
      const stmt = this.db.prepare(query);
      const boundStmt = params.length > 0 ? stmt.bind(...params) : stmt;
      const result = await boundStmt.first();
      return result || null;
    } catch (error) {
      console.error('D1 First Error:', error);
      return null;
    }
  }

  // Run a modification query (INSERT, UPDATE, DELETE)
  async run(query: string, params: any[] = []): Promise<D1Result> {
    if (this.fallbackClient) {
      return await this.runFallback(query, params);
    }

    try {
      const stmt = this.db.prepare(query);
      const boundStmt = params.length > 0 ? stmt.bind(...params) : stmt;
      const result = await boundStmt.run();
      return {
        success: result.success || true,
        meta: result.meta
      };
    } catch (error) {
      console.error('D1 Run Error:', error);
      return {
        success: false,
        meta: { changes: 0 }
      };
    }
  }

  // Fallback methods for local development
  private async executeFallback<T = any>(query: string, params: any[] = []): Promise<D1Result<T>> {
    try {
      if (query.includes('SELECT') && query.includes('FROM sqlite_master')) {
        // Return mock table info for local dev
        return {
          success: true,
          results: [
            { name: 'comments' },
            { name: 'users' },
            { name: 'pages' }
          ] as T[]
        };
      }
      
      if (query.includes('SELECT COUNT(*)') && query.includes('comments')) {
        // For simplicity, just return 0 for count in local dev
        return {
          success: true,
          results: [{ count: 0 }] as T[]
        };
      }
      
      if (query.includes('SELECT * FROM pages')) {
        return {
          success: true,
          results: [] as T[]
        };
      }
      
      // Handle UPDATE queries that use RETURNING
      if (query.includes('UPDATE comments') && query.includes('RETURNING')) {
        const [content, id] = params;
        
        const db = this.fallbackClient.getDb();
        const result = await db
          .prepare(query)
          .bind(...params)
          .first();
        
        return {
          success: true,
          results: result ? [result] as T[] : [] as T[],
          meta: { changes: result ? 1 : 0 }
        };
      }
      
      // Handle INSERT queries that use RETURNING
      if (query.includes('INSERT INTO comments') && query.includes('RETURNING')) {
        const [slug, author, email, content, password] = params;
        
        const db = this.fallbackClient.getDb();
        const result = await db
          .prepare(query)
          .bind(...params)
          .first();
        
        return {
          success: true,
          results: result ? [result] as T[] : [] as T[],
          meta: { changes: 1 }
        };
      }
      
      // For other SELECT queries, try to use getComments
      if (query.includes('SELECT * FROM comments') && query.includes('WHERE slug =')) {
        const slug = params[0];
        const comments = await this.fallbackClient.getComments(slug);
        return {
          success: true,
          results: comments as T[]
        };
      }
      
      return { success: true, results: [] as T[] };
    } catch (error) {
      console.error('Fallback execute error:', error);
      return { success: false, results: [] as T[] };
    }
  }

  private async firstFallback<T = any>(query: string, params: any[] = []): Promise<T | null> {
    try {
      if (query.includes('SELECT password FROM comments') && query.includes('WHERE id =')) {
        const id = params[0];
        
        // Use the DatabaseClient's getDb() to access the underlying LocalDevDB
        const db = this.fallbackClient.getDb();
        const comment = db.getComment(id);
        return comment ? { password: comment.password || '' } as T : null;
      }
      
      // Handle other SELECT queries that return single results
      if (query.includes('SELECT') && query.includes('WHERE id =')) {
        const id = params[0];
        const db = this.fallbackClient.getDb();
        const comment = db.getComment(id);
        return comment as T || null;
      }
      
      return null;
    } catch (error) {
      console.error('Fallback first error:', error);
      return null;
    }
  }

  private async runFallback(query: string, params: any[] = []): Promise<D1Result> {
    try {
      if (query.includes('INSERT INTO comments')) {
        const [slug, author, email, content, password] = params;
        
        const db = this.fallbackClient.getDb();
        const result = await db
          .prepare('INSERT INTO comments (slug, author, email, content, password) VALUES (?, ?, ?, ?, ?) RETURNING *')
          .bind(slug, author, email, content, password || '')
          .first();
        
        return { 
          success: true, 
          meta: { changes: 1 },
          results: result ? [result] : []
        };
      }
      
      if (query.includes('UPDATE comments') && query.includes('SET content =')) {
        const [content, id] = params;
        const db = this.fallbackClient.getDb();
        const result = await db
          .prepare('UPDATE comments SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *')
          .bind(content, id)
          .first();
        return { 
          success: !!result, 
          meta: { changes: result ? 1 : 0 },
          results: result ? [result] : []
        };
      }
      
      if (query.includes('DELETE FROM comments')) {
        const [id] = params;
        const db = this.fallbackClient.getDb();
        const result = await db.prepare('DELETE FROM comments WHERE id = ?').bind(id).run();
        return { success: result.success, meta: { changes: result.meta?.changes || 0 } };
      }
      
      return { success: true, meta: { changes: 0 } };
    } catch (error) {
      console.error('Fallback run error:', error);
      return { success: false, meta: { changes: 0 } };
    }
  }

  // Batch execute multiple statements
  async batch(queries: Array<{ query: string; params?: any[] }>): Promise<D1Result[]> {
    if (this.fallbackClient) {
      return queries.map(() => ({ success: true, results: [], meta: { changes: 0 } }));
    }

    try {
      const statements = queries.map(({ query, params = [] }) => {
        const stmt = this.db.prepare(query);
        return params.length > 0 ? stmt.bind(...params) : stmt;
      });
      
      const results = await this.db.batch(statements);
      
      return results.map((result: any) => ({
        success: result.success || true,
        results: result.results || [],
        meta: result.meta || { changes: 0 }
      }));
    } catch (error) {
      console.error('D1 Batch Error:', error);
      return queries.map(() => ({
        success: false,
        results: [],
        meta: { changes: 0 }
      }));
    }
  }
}

// Helper function to create D1 client
export function createD1Client(env: any): D1Client {
  return new D1Client(env);
}
