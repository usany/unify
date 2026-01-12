export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

// Mock D1 database interface for development
// In production, this would be replaced with actual Cloudflare D1 binding
interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
}

interface D1PreparedStatement {
  bind: (...params: any[]) => D1PreparedStatement;
  first: () => Promise<any>;
  run: () => Promise<D1Result>;
  all: () => Promise<D1Result>;
}

interface D1Result {
  results: any[];
  success: boolean;
  error?: string;
}

// Mock implementation for development
const mockDB: D1Database = {
  prepare: (query: string) => {
    const stmt: D1PreparedStatement = {
      bind: (...params: any[]) => stmt,
      first: async () => {
        // Mock data for development
        if (query.includes('SELECT') && query.includes('WHERE id =')) {
          return null;
        }
        return null;
      },
      run: async () => ({ results: [], success: true }),
      all: async () => ({ results: [], success: true })
    };
    return stmt;
  }
};

// In production, you would get this from the Cloudflare environment
// const db = (process.env as any).DB as D1Database;
const db = mockDB;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');

    if (!pageId) {
      return NextResponse.json({ error: 'pageId is required' }, { status: 400 });
    }

    // Get all comments for a page, ordered by creation date
    const result = await db
      .prepare('SELECT * FROM comments WHERE page_id = ? ORDER BY created_at DESC')
      .bind(pageId)
      .all();

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }

    // Organize comments into a tree structure
    const comments = organizeComments(result.results);
    
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageId, author, content, parentId } = body;

    if (!pageId || !author || !content) {
      return NextResponse.json({ error: 'pageId, author, and content are required' }, { status: 400 });
    }

    const id = Date.now().toString();
    
    // Insert new comment
    const result = await db
      .prepare('INSERT INTO comments (id, page_id, author, content, parent_id) VALUES (?, ?, ?, ?, ?)')
      .bind(id, pageId, author, content, parentId || null)
      .run();

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    }

    // Get the created comment
    const comment = await db
      .prepare('SELECT * FROM comments WHERE id = ?')
      .bind(id)
      .first();

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, content } = body;

    if (!id || !content) {
      return NextResponse.json({ error: 'id and content are required' }, { status: 400 });
    }

    // Update comment
    const result = await db
      .prepare('UPDATE comments SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(content, id)
      .run();

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
    }

    // Get the updated comment
    const comment = await db
      .prepare('SELECT * FROM comments WHERE id = ?')
      .bind(id)
      .first();

    return NextResponse.json({ comment });
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    // Delete comment (cascade delete will handle replies)
    const result = await db
      .prepare('DELETE FROM comments WHERE id = ?')
      .bind(id)
      .run();

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to organize flat comments into a tree structure
function organizeComments(flatComments: any[]): any[] {
  const commentMap = new Map();
  const rootComments: any[] = [];

  // Create a map of all comments
  flatComments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // Build the tree structure
  flatComments.forEach(comment => {
    const commentNode = commentMap.get(comment.id);
    
    if (comment.parent_id) {
      const parent = commentMap.get(comment.parent_id);
      if (parent) {
        parent.replies.push(commentNode);
      }
    } else {
      rootComments.push(commentNode);
    }
  });

  return rootComments;
}
