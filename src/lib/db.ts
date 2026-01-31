// Database client for D1
// Local development fallback database

// Global in-memory storage that persists across requests
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

// Helper function to create database client
export function createDBClient(env: any): DatabaseClient {
  return new DatabaseClient(env);
}
