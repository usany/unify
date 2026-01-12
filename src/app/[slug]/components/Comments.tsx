"use client";

import React, { useState, useEffect } from 'react';
import styles from './Comments.module.css';

interface Comment {
  id: string;
  page_id: string;
  author: string;
  content: string;
  created_at: string;
  updated_at?: string;
  parent_id?: string;
  replies?: Comment[];
}

interface CommentsProps {
  pageId: string;
}

export default function Comments({ pageId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author: '',
    content: '',
    parentId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments from API
  const fetchComments = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/comments?pageId=${pageId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json() as { comments: any[] };
      setComments(data.comments || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  // Load comments when component mounts
  useEffect(() => {
    fetchComments();
  }, [pageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.author.trim() || !newComment.content.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageId,
          author: newComment.author,
          content: newComment.content,
          parentId: newComment.parentId || undefined
        })
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      await fetchComments(); // Refresh comments
      setNewComment({ author: '', content: '', parentId: '' });
      setReplyingTo(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addReplyToComment = (comments: Comment[], parentId: string, reply: Comment): Comment[] => {
    return comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, parentId, reply)
        };
      }
      return comment;
    });
  };

  const handleInputChange = (field: 'author' | 'content', value: string) => {
    setNewComment(prev => ({ ...prev, [field]: value }));
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
    setNewComment(prev => ({ ...prev, parentId: commentId }));
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setNewComment(prev => ({ ...prev, parentId: '' }));
  };

  const handleEdit = (commentId: string, content: string) => {
    setEditingComment(commentId);
    setEditContent(content);
  };

  const handleSaveEdit = async () => {
    if (editingComment && editContent.trim()) {
      try {
        setError(null);
        const response = await fetch('/api/comments', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: editingComment,
            content: editContent
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update comment');
        }

        await fetchComments(); // Refresh comments
        setEditingComment(null);
        setEditContent('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update comment');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const handleDelete = async (commentId: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/comments?id=${commentId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      await fetchComments(); // Refresh comments
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete comment');
    }
  };

  const updateCommentContent = (comments: Comment[], commentId: string, content: string): Comment[] => {
    return comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, content };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentContent(comment.replies, commentId, content)
        };
      }
      return comment;
    });
  };

  const deleteCommentFromTree = (comments: Comment[], commentId: string): Comment[] => {
    return comments
      .filter(comment => comment.id !== commentId)
      .map(comment => ({
        ...comment,
        replies: comment.replies ? deleteCommentFromTree(comment.replies, commentId) : []
      }));
  };

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const isReplying = replyingTo === comment.id;
    const isEditing = editingComment === comment.id;

    return (
      <div className={`${styles.comment} ${depth > 0 ? styles.reply : ''}`}>
        <div className={styles.commentHeader}>
          <span className={styles.author}>{comment.author}</span>
          <div className={styles.commentMeta}>
            <span className={styles.timestamp}>{new Date(comment.created_at).toLocaleString()}</span>
            {depth > 0 && (
              <span className={styles.replyBadge}>Reply</span>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <div className={styles.editForm}>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={styles.editTextarea}
              rows={3}
            />
            <div className={styles.editActions}>
              <button
                onClick={handleSaveEdit}
                className={styles.saveButton}
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.commentContent}>{comment.content}</p>
        )}

        <div className={styles.commentActions}>
          <button 
            onClick={() => handleReply(comment.id)}
            className={styles.replyButton}
          >
            Reply
          </button>
          
          <>
            <button 
              onClick={() => handleEdit(comment.id, comment.content)}
              className={styles.editButton}
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(comment.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </>
        </div>

        {isReplying && (
          <div className={styles.replyForm}>
            <div className={styles.replyFormHeader}>
              <span>Replying to {comment.author}</span>
              <button 
                onClick={handleCancelReply}
                className={styles.cancelReplyButton}
              >
                ✕
              </button>
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={newComment.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className={styles.input}
                placeholder="Your name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <textarea
                value={newComment.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className={styles.textarea}
                placeholder="Write your reply..."
                rows={3}
                required
              />
            </div>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Posting...' : 'Post Reply'}
            </button>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className={styles.replies}>
            {comment.replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };
    return (
    <div className={styles.commentsSection}>
      <h3 className={styles.commentsTitle}>Comments</h3>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <div className={styles.formGroup}>
          <label htmlFor="author" className={styles.label}>Name</label>
          <input
            type="text"
            id="author"
            value={newComment.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            className={styles.input}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>Comment</label>
          <textarea
            id="content"
            value={newComment.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            className={styles.textarea}
            placeholder="Share your thoughts..."
            rows={4}
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className={styles.errorMessage}>
          <span>{error}</span>
          <button onClick={() => setError(null)} className={styles.errorClose}>×</button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className={styles.loadingMessage}>
          <span>Loading comments...</span>
        </div>
      )}

      {/* Comments List */}
      {!isLoading && (
        <div className={styles.commentsList}>
          {comments.length === 0 ? (
            <p className={styles.noComments}>No comments yet. Be the first to share your thoughts!</p>
          ) : (
            comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
