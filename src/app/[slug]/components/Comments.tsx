"use client";

import React, { useState, useEffect } from 'react';
import styles from './Comments.module.css';

interface Comment {
  id: number;
  slug: string;
  author: string;
  email: string;
  content: string;
  created_at: string;
  updated_at?: string;
}

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments from API
  const fetchComments = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/comments?slug=${slug}`);
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
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.author.trim() || !newComment.email.trim() || !newComment.content.trim()) {
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
          slug,
          author: newComment.author,
          email: newComment.email,
          content: newComment.content
        })
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      await fetchComments(); // Refresh comments
      setNewComment({ author: '', email: '', content: '' });
      setReplyingTo(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: 'author' | 'email' | 'content', value: string) => {
    setNewComment(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = (commentId: number, content: string) => {
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
            id: parseInt(editingComment),
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

  const handleDelete = async (commentId: number) => {
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

  const CommentItem = ({ comment }: { comment: Comment }) => {
    const isEditing = editingComment === comment.id;

    return (
      <div className={styles.comment}>
        <div className={styles.commentHeader}>
          <span className={styles.author}>{comment.author}</span>
          <div className={styles.commentMeta}>
            <span className={styles.timestamp}>{new Date(comment.created_at).toLocaleString()}</span>
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
        </div>
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
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={newComment.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={styles.input}
            placeholder="Enter your email"
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
