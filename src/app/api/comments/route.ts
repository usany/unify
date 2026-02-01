import { NextRequest, NextResponse } from 'next/server';
import { createDBClient } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    const db = createDBClient(process.env);
    const comments = await db.getComments(slug);
    
    return NextResponse.json({ comments });
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

    console.log('Creating comment with:', { slug, author, email, hasContent: !!content });
    console.log('Azure SQL configured:', !!(process.env.AZURE_SQL_CONNECTION_STRING || 
      (process.env.AZURE_SQL_DATABASE && process.env.AZURE_SQL_USER && process.env.AZURE_SQL_PASSWORD)));

    const db = createDBClient(process.env);
    const comment = await db.createComment(slug, author, email, content, password);

    console.log('Comment created successfully:', comment.id);
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error details:', { errorMessage, errorStack });
    return NextResponse.json({ 
      error: 'Internal server error',
      message: errorMessage 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json() as { id?: number; content?: string };
    const { id, content } = body;

    if (!id || !content) {
      return NextResponse.json({ error: 'id and content are required' }, { status: 400 });
    }

    const db = createDBClient(process.env);
    const comment = await db.updateComment(id, content);

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
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

    const db = createDBClient(process.env);
    
    try {
      const success = await db.deleteComment(id, password);

      if (!success) {
        return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true });
    } catch (deleteError) {
      if (deleteError instanceof Error && deleteError.message === 'Incorrect password') {
        return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
      }
      throw deleteError;
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
