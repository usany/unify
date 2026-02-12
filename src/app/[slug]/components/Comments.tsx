"use client";

import React, { useState, memo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import styles from './Comments.module.css';

interface Comment {
  id: number;
  slug: string;
  author: string;
  email: string;
  content: string;
  password?: string;
  created_at: string;
  updated_at?: string;
}

interface CommentsProps {
  slug: string;
}

export default memo(function Comments({ slug }: CommentsProps) {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments using React Query
  const { data: commentsData, isLoading, error: fetchError, refetch } = useQuery(
    ['comments', slug],
    async () => {
      const response = await fetch(`http://localhost:8787/api/comments/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json() as { comments: Comment[] };
      return data.comments || [];
    },
    {
      enabled: !!slug,
    }
  );

  const comments = commentsData || [];

  // Post comment mutation
  const postCommentMutation = useMutation(
    async (commentData: {
      slug: string;
      author: string;
      email: string;
      content: string;
      password: string;
    }) => {
      const response = await fetch(`http://localhost:8787/api/comments/${commentData.slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData)
      });
      if (!response.ok) {
        throw new Error('Failed to post comment');
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', slug]);
        setNewComment({ author: '', email: '', content: '', password: '' });
        setReplyingTo(null);
      },
      onError: (err: Error) => {
        setError(err.message || 'Failed to post comment');
      }
    }
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Safety check: ensure all required fields exist and are not empty
    if (!newComment.author || !newComment.email || !newComment.content ||
        !newComment.author.trim() || !newComment.email.trim() || !newComment.content.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    postCommentMutation.mutate({
      slug,
      author: newComment.author,
      email: newComment.email,
      content: newComment.content,
      password: newComment.password
    });
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: 'author' | 'email' | 'content' | 'password', value: string) => {
    setNewComment(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = (commentId: number, content: string) => {
    setEditingComment(commentId);
    setEditContent(content);
  };

  // Edit comment mutation
  const editCommentMutation = useMutation(
    async (editData: { id: number; content: string }) => {
      const response = await fetch(`http://localhost:8787/api/comment/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData)
      });
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', slug]);
        setEditingComment(null);
        setEditContent('');
      },
      onError: (err: Error) => {
        setError(err.message || 'Failed to update comment');
      }
    }
  );

  const handleSaveEdit = async () => {
    if (editingComment && editContent.trim()) {
      editCommentMutation.mutate({
        id: editingComment,
        content: editContent
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent('');
  };

  // Delete comment mutation
  const deleteCommentMutation = useMutation(
    async (deleteData: { id: number; password: string }) => {
      const response = await fetch(`http://localhost:8787/api/comments/${deleteData.id}`, {
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
        const errorData = await response.json() as any;
        throw new Error(errorData.error || 'Failed to delete comment');
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', slug]);
        setShowDeleteModal(null);
        setDeletePassword('');
      },
      onError: (err: Error) => {
        setError(err.message || 'Failed to delete comment');
      }
    }
  );

  const handleDelete = async (commentId: number, password: string) => {
    if (!password.trim()) {
      setError('Password is required to delete comment');
      return;
    }

    deleteCommentMutation.mutate({
      id: commentId,
      password
    });
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
              onChange={(event) => setEditContent(event.target.value)}
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
            onClick={() => setShowDeleteModal(comment.id)}
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
            onChange={(event) => handleInputChange('author', event.target.value)}
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
            onChange={(event) => handleInputChange('email', event.target.value)}
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
            onChange={(event) => handleInputChange('content', event.target.value)}
            className={styles.textarea}
            placeholder="Share your thoughts..."
            rows={4}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password (for deletion)</label>
          <input
            type="password"
            id="password"
            value={newComment.password}
            onChange={(event) => handleInputChange('password', event.target.value)}
            className={styles.input}
            placeholder="Enter a password to delete this comment later"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting || postCommentMutation.isLoading}
          className={styles.submitButton}
        >
          {isSubmitting || postCommentMutation.isLoading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {/* Error Display */}
      {(error || fetchError) && (
        <div className={styles.errorMessage}>
          <span>{error || (fetchError instanceof Error ? fetchError.message : 'An error occurred')}</span>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete Comment</h3>
            <p>Enter the password to delete this comment:</p>
            <input
              type="password"
              value={deletePassword}
              onChange={(event) => setDeletePassword(event.target.value)}
              className={styles.input}
              placeholder="Enter password"
              autoFocus
            />
            <div className={styles.modalActions}>
              <button
                onClick={() => handleDelete(showDeleteModal, deletePassword)}
                className={styles.deleteButton}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(null);
                  setDeletePassword('');
                }}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
