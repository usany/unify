import { createD1Client } from '@/lib/d1-client';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET(request: Request) {
  try {
    // Test database connection
    const { env } = await getCloudflareContext();
    const db = createD1Client(env);

    // Test basic query
    const tables = await db.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      ORDER BY name
    `);

    // Test comments table
    const commentCount = await db.first(
      'SELECT COUNT(*) as count FROM comments'
    );

    // Test sample data
    const samplePages = await db.execute(
      'SELECT * FROM pages LIMIT 3'
    );

    return Response.json({
      success: true,
      database: 'connected',
      tables: tables.results,
      commentCount: commentCount?.count || 0,
      samplePages: samplePages.results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Database test error:', error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
