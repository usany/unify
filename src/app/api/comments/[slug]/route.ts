import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const response = await fetch(`https://express-d1-app.ckd-qja.workers.dev/api/comments/${params.slug}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    
    const response = await fetch(`https://express-d1-app.ckd-qja.workers.dev/api/comments/${params.slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to post comment');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting comment:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to post comment' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    
    const response = await fetch(`https://express-d1-app.ckd-qja.workers.dev/api/comments/${params.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error((errorData as any)?.error || 'Failed to update comment');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update comment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const commentId = body.id;
    
    const response = await fetch(`https://express-d1-app.ckd-qja.workers.dev/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: commentId,
        password: body.password
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error((errorData as any)?.error || 'Failed to delete comment');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
