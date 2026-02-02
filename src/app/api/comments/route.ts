import { NextRequest, NextResponse } from 'next/server';
import { createD1Client } from '@/lib/d1-client-simple';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    const { env } = await getCloudflareContext();
    const db = createD1Client(env);
    const result = await db.execute(
      'SELECT * FROM comments WHERE slug = ? ORDER BY created_at DESC',
      [slug]
    );

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }

    return NextResponse.json({ comments: result.results });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { slug?: string; author?: string; email?: string; content?: string; password?: string };
    const { slug, author, email, content, password } = body;

    if (!slug || !author || !email || !content) {
      return NextResponse.json({ error: 'slug, author, email, and content are required' }, { status: 400 });
    }

    const { env } = await getCloudflareContext();
    const db = createD1Client(env);
    const result = await db.execute(
      'INSERT INTO comments (slug, author, email, content, password) VALUES (?, ?, ?, ?, ?) RETURNING *',
      [slug, author, email, content, password || '']
    );

    const comment = result.results?.[0];
    console.log(result)
    if (!result.success || !comment) {
      return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    }
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json() as { id?: number; content?: string };
    const { id, content } = body;

    if (!id || !content) {
      return NextResponse.json({ error: 'id and content are required' }, { status: 400 });
    }

    const { env } = await getCloudflareContext();
    const db = createD1Client(env);
    const result = await db.execute(
      'UPDATE comments SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *',
      [content, id]
    );

    const comment = result.results?.[0];
    if (!result.success || !comment) {
      return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
    }

    return NextResponse.json({ comment });
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json() as { id?: number; password?: string };
    const { id, password } = body;

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const { env } = await getCloudflareContext();
    const db = createD1Client(env);

    // First check if comment exists and verify password
    const comment = await db.first(
      'SELECT password FROM comments WHERE id = ?',
      [id]
    );

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // If comment has a password, verify it matches
    if (comment.password && comment.password !== '' && comment.password !== password) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    // Delete the comment
    const deleteResult = await db.run(
      'DELETE FROM comments WHERE id = ?',
      [id]
    );
    console.log(deleteResult)
    if (!deleteResult.success || (deleteResult.meta?.changes || 0) === 0) {
      return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
