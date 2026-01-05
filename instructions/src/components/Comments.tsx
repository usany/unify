"use client";

import React, { useState } from 'react';
import styles from './Comments.module.css';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface CommentsProps {
  pageId: string;
}

export default function Comments({ pageId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.author.trim() || !newComment.content.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author,
      content: newComment.content,
      timestamp: new Date().toLocaleString()
    };

    setComments(prev => [comment, ...prev]);
    setNewComment({ author: '', content: '' });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: 'author' | 'content', value: string) => {
    setNewComment(prev => ({ ...prev, [field]: value }));
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

      {/* Comments List */}
      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <span className={styles.author}>{comment.author}</span>
                <span className={styles.timestamp}>{comment.timestamp}</span>
              </div>
              <p className={styles.commentContent}>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
