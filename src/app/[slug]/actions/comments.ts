'use server';

import { getComments, postComment, updateComment, deleteComment, verifyCommentPassword } from '../../../lib/comments';
import { Comment } from '@/types/comment';

export async function fetchComments(slug: string): Promise<Comment[]> {
  return getComments(slug);
}

export async function addComment(commentData: {
  slug: string;
  author: string;
  content: string;
  password: string;
  reply_to?: number;
}) {
  return postComment(commentData);
}

export async function editComment(updateData: {
  slug: string;
  id: number;
  content: string;
  password: string;
}) {
  return updateComment(updateData);
}

export async function removeComment(deleteData: {
  id: number;
  password: string;
}) {
  return deleteComment(deleteData);
}

export async function verifyPassword(verifyData: {
  id: number;
  password: string;
}) {
  return verifyCommentPassword(verifyData);
}
