"use client";

import React, { useState } from 'react';
import styles from './Comments.module.css';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  parentId?: string;
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
      timestamp: new Date().toLocaleString(),
      parentId: newComment.parentId || undefined,
      replies: []
    };

    if (newComment.parentId) {
      // Add as reply to parent comment
      setComments(prev => addReplyToComment(prev, newComment.parentId, comment));
    } else {
      // Add as top-level comment
      setComments(prev => [comment, ...prev]);
    }

    setNewComment({ author: '', content: '', parentId: '' });
    setReplyingTo(null);
    setIsSubmitting(false);
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

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const isReplying = replyingTo === comment.id;

    return (
      <div className={`${styles.comment} ${depth > 0 ? styles.reply : ''}`}>
        <div className={styles.commentHeader}>
          <span className={styles.author}>{comment.author}</span>
          <div className={styles.commentMeta}>
            <span className={styles.timestamp}>{comment.timestamp}</span>
            {depth > 0 && (
              <span className={styles.replyBadge}>Reply</span>
            )}
          </div>
        </div>
        
        <p className={styles.commentContent}>{comment.content}</p>

        <div className={styles.commentActions}>
          <button 
            onClick={() => handleReply(comment.id)}
            className={styles.replyButton}
          >
            Reply
          </button>
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

      {/* Comments List */}
      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}
