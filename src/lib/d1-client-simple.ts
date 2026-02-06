// Simplified D1 Client - No fallback needed
// Works with real D1 in both development and production

interface D1Result<T = any> {
  success: boolean;
  results: T[];
  meta: {
    changes?: number;
    duration?: number;
  };
}

export class SimpleD1Client {
  private db: any;

  constructor(env: any) {
    if (!env?.instructions_db) {
      throw new Error('D1 database binding "instructions_db" not found in environment');
    }
    this.db = env.instructions_db;
  }

  // Execute any query
  async execute<T = any>(
    query: string,
    params: any[] = []
  ): Promise<D1Result<T>> {
    try {
      const stmt = this.db.prepare(query);
      const boundStmt = params.length > 0 ? stmt.bind(...params) : stmt;

      // Determine query type
      const isSelect = query.trim().toLowerCase().startsWith('select');
      const isReturning = query.trim().toLowerCase().includes('returning');

      if (isSelect) {
        const result = await boundStmt.all();
        return {
          success: true,
          results: result.results as T[],
          meta: result.meta || { changes: 0 }
        };
      } else if (isReturning) {
        const result = await boundStmt.all();
        return {
          success: true,
          results: result.results as T[],
          meta: result.meta || { changes: 1 }
        };
      } else {
        const result = await boundStmt.run();
        return {
          success: true,
          results: [],
          meta: result.meta || { changes: 0 }
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

  // Get first result
  async first<T = any>(query: string, params: any[] = []): Promise<T | null> {
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

  // Run modification query
  async run(query: string, params: any[] = []): Promise<D1Result> {
    try {
      const stmt = this.db.prepare(query);
      const boundStmt = params.length > 0 ? stmt.bind(...params) : stmt;
      const result = await boundStmt.run();
      return {
        success: true,
        results: [],
        meta: result.meta || { changes: 0 }
      };
    } catch (error) {
      console.error('D1 Run Error:', error);
      return {
        success: false,
        results: [],
        meta: { changes: 0 }
      };
    }
  }

  // Batch operations
  // async batch(queries: Array<{ query: string; params?: any[] }>): Promise<D1Result[]> {
  //   try {
  //     const statements = queries.map(({ query, params = [] }) => {
  //       const stmt = this.db.prepare(query);
  //       return params.length > 0 ? stmt.bind(...params) : stmt;
  //     });
      
  //     const results = await this.db.batch(statements);
      
  //     return results.map((result: any) => ({
  //       success: result.success || true,
  //       results: result.results || [],
  //       meta: result.meta || { changes: 0 }
  //     }));
  //   } catch (error) {
  //     console.error('D1 Batch Error:', error);
  //     return queries.map(() => ({
  //       success: false,
  //       results: [],
  //       meta: { changes: 0 }
  //     }));
  //   }
  // }
}

export function createD1Client(env: any): SimpleD1Client {
  return new SimpleD1Client(env);
}
