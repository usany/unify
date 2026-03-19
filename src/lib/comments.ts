'use server';

import { Comment } from '@/types/comment';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://express-d1-app.ckd-qja.workers.dev';

export async function getComments(slug: string): Promise<Comment[]> {
  try {
    const response = await fetch(`${API_BASE}/api/comments/${slug}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    
    const data = await response.json() as { comments: Comment[] };
    return data.comments || [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export async function postComment(commentData: {
  slug: string;
  author: string;
  content: string;
  password: string;
  reply_to?: number;
}) {
  try {
    const response = await fetch(`${API_BASE}/api/comments/${commentData.slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error((errorData as any)?.error || 'Failed to post comment');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
}

export async function updateComment(updateData: {
  slug: string;
  id: number;
  content: string;
  password: string;
}) {
  try {
    const response = await fetch(`${API_BASE}/api/comments/${updateData.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: updateData.id,
        content: updateData.content,
        password: updateData.password
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error((errorData as any)?.error || 'Failed to update comment');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
}

export async function deleteComment(deleteData: {
  id: number;
  password: string;
}) {
  try {
    const response = await fetch(`${API_BASE}/api/comments/slug`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: deleteData.id,
        password: deleteData.password
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error((errorData as any)?.error || 'Failed to delete comment');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
}

export async function verifyCommentPassword(verifyData: {
  id: number;
  password: string;
}) {
  try {
    const response = await fetch(`${API_BASE}/api/comments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: verifyData.id,
        password: verifyData.password
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error((errorData as any)?.error || 'Password verification failed');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
}
