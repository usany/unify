// Database client for D1
export interface Comment {
  id: number;
  slug: string;
  author: string;
  email: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export class DatabaseClient {
  private db: any;

  constructor(env: any) {
    if (env?.instructions_db) {
      this.db = env.instructions_db;
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

  async createComment(slug: string, author: string, email: string, content: string): Promise<Comment> {
    const db = this.getDb();
    const result = await db
      .prepare('INSERT INTO comments (slug, author, email, content) VALUES (?, ?, ?, ?) RETURNING *')
      .bind(slug, author, email, content)
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

  async deleteComment(id: number): Promise<boolean> {
    const db = this.getDb();
    const result = await db.prepare('DELETE FROM comments WHERE id = ?').bind(id).run();
    return result.success && (result.meta?.changes || 0) > 0;
  }
}

// Helper function to create database client
export function createDBClient(env: any): DatabaseClient {
  return new DatabaseClient(env);
}
