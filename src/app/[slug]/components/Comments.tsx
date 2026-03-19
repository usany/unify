"use client";

import React, { useState, memo, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getComments, postComment, updateComment, deleteComment, verifyCommentPassword } from '../../../lib/comments';
import { Comment } from '@/types/comment';
import styles from './Comments.module.css';


interface CommentsProps {
  slug: string;
}

export default memo(function Comments({ slug }: CommentsProps) {
  const { language } = useLanguage();
  
  const translations: Record<string, Record<string, string>> = {
    en: {
      title: 'Comments',
      nameLabel: 'Name',
      // emailLabel: 'Email',
      // emailPlaceholder: 'Enter your email',
      commentLabel: 'Comment',
      passwordLabel: 'Password (for deletion)',
      namePlaceholder: 'Enter your name',
      commentPlaceholder: 'Share your thoughts...',
      passwordPlaceholder: 'Enter a password to delete this comment later',
      postComment: 'Post Comment',
      posting: 'Posting...',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      deleteComment: 'Delete Comment',
      deletePasswordPrompt: 'Enter the password to delete this comment:',
      editPasswordPrompt: 'Enter the password to edit this comment:',
      enterPassword: 'Enter password',
      noComments: 'No comments yet. Be the first to share your thoughts!',
      loadingComments: 'Loading comments...',
      passwordRequired: 'Password is required to delete comment',
      failedToFetch: 'Failed to fetch comments',
      failedToPost: 'Failed to post comment',
      failedToUpdate: 'Failed to update comment',
      failedToDelete: 'Failed to delete comment',
      anErrorOccurred: 'An error occurred',
      reply: 'Reply',
      replyTo: 'Reply to',
      cancelReply: 'Cancel Reply',
      postReply: 'Post Reply'
    },
    ko: {
      title: '댓글',
      nameLabel: '이름',
      // emailLabel: '이메일',
      // emailPlaceholder: '이메일을 입력하세요',
      commentLabel: '댓글',
      passwordLabel: '비밀번호 (삭제용)',
      namePlaceholder: '이름을 입력하세요',
      commentPlaceholder: '의견을 공유하세요...',
      passwordPlaceholder: '나중에 댓글을 삭제할 비밀번호를 입력하세요',
      postComment: '댓글 작성',
      posting: '작성 중...',
      edit: '수정',
      save: '저장',
      cancel: '취소',
      delete: '삭제',
      deleteComment: '댓글 삭제',
      deletePasswordPrompt: '이 댓글을 삭제할 비밀번호를 입력하세요:',
      editPasswordPrompt: '이 댓글을 수정할 비밀번호를 입력하세요:',
      enterPassword: '비밀번호 입력',
      noComments: '아직 댓글이 없습니다. 첫 번째로 의견을 공유해보세요!',
      loadingComments: '댓글 로딩 중...',
      passwordRequired: '댓글을 삭제하려면 비밀번호가 필요합니다',
      failedToFetch: '댓글을 가져오는데 실패했습니다',
      failedToPost: '댓글 작성에 실패했습니다',
      failedToUpdate: '댓글 수정에 실패했습니다',
      failedToDelete: '댓글 삭제에 실패했습니다',
      anErrorOccurred: '오류가 발생했습니다',
      reply: '답글',
      replyTo: '답글 달기',
      cancelReply: '답글 취소',
      postReply: '답글 작성'
    }
  };
  
  const t = translations[language] || translations.ko;
  const [newComment, setNewComment] = useState({
    author: '',
    content: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [editPassword, setEditPassword] = useState('');
  const [showEditModal, setShowEditModal] = useState<number | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch comments
  const loadComments = useCallback(async () => {
    if (!slug) return;
    
    setIsLoading(true);
    setFetchError(null);
    
    try {
      const data = await getComments(slug);
      setComments(data);
    } catch (error) {
      setFetchError(error instanceof Error ? error.message : 'Failed to fetch comments');
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Safety check: ensure all required fields exist and are not empty
    if (!newComment.author || !newComment.content ||
        !newComment.author.trim() || !newComment.content.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      if (replyingTo !== null) {
        // Post as reply
        await postComment({
          slug,
          author: newComment.author,
          content: newComment.content,
          password: newComment.password,
          reply_to: replyingTo
        });
      } else {
        // Post as regular comment
        await postComment({
          slug,
          author: newComment.author,
          content: newComment.content,
          password: newComment.password
        });
      }
      
      // Refresh comments and reset form
      await loadComments();
      setNewComment({ author: '', content: '', password: '' });
      setReplyingTo(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: 'author' | 'content' | 'password', value: string) => {
    setNewComment(prev => ({ ...prev, [field]: value }));
  };

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
    // Scroll to comment form
    const commentForm = document.querySelector(`.${styles.commentForm}`);
    if (commentForm) {
      commentForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setNewComment({ author: '', content: '', password: '' });
  };

  const handleEdit = (commentId: number) => {
    setShowEditModal(commentId);
  };

  // Edit comment function
  const handleEditComment = async (editData: { id: number; content: string; password: string }) => {
    try {
      await updateComment({
        slug,
        id: editData.id,
        content: editData.content,
        password: editData.password
      });
      
      // Refresh comments and reset edit state
      await loadComments();
      setEditingComment(null);
      setEditContent('');
      setEditPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update comment');
    }
  };

  const handleSaveEdit = async () => {
    if (editingComment && editContent.trim()) {
      await handleEditComment({
        id: editingComment,
        content: editContent,
        password: editPassword
      });
    }
  };

  const handleCheckEditPassword = async (commentId: number, password: string) => {
    if (!password.trim()) {
      setError(t.passwordRequired);
      return;
    }

    try {
      // Verify the password
      await verifyCommentPassword({
        id: commentId,
        password
      });

      // If password is correct, proceed with edit
      const comment = comments.find(c => c.id === commentId);
      if (comment) {
        setEditingComment(commentId);
        setEditContent(comment.content);
        setEditPassword(password);
        setShowEditModal(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password verification failed');
    }
  };

  // const handleEditWithPassword = (commentId: number, password: string) => {
  //   if (!password.trim()) {
  //     setError(t.passwordRequired);
  //     return;
  //   }
  //   const comment = comments.find(c => c.id === commentId);
  //   if (comment) {
  //     setEditingComment(commentId);
  //     setEditContent(comment.content);
  //     setEditPassword(password);
  //     setShowEditModal(null);
  //   }
  // };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent('');
    setEditPassword('');
  };

  // Delete comment function
  const handleDeleteComment = async (deleteData: { id: number; password: string }) => {
    try {
      await deleteComment(deleteData);
      
      // Refresh comments and reset delete state
      await loadComments();
      setShowDeleteModal(null);
      setDeletePassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete comment');
    }
  };

  const handleDelete = async (commentId: number, password: string) => {
    if (!password.trim()) {
      setError(t.passwordRequired);
      return;
    }

    await handleDeleteComment({
      id: commentId,
      password
    });
  };

  // Organize comments hierarchically
  const organizeComments = (comments: Comment[]): Comment[] => {
    const commentMap = new Map<number, Comment & { replies: Comment[] }>();
    const rootComments: (Comment & { replies: Comment[] })[] = [];

    // First pass: create comment objects with empty replies array
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: organize into hierarchy
    comments.forEach(comment => {
      const commentWithReplies = commentMap.get(comment.id)!;
      
      if (comment.reply_to) {
        const parent = commentMap.get(comment.reply_to);
        if (parent) {
          parent.replies.push(commentWithReplies);
        }
      } else {
        rootComments.push(commentWithReplies);
      }
    });

    return rootComments;
  };

  const CommentItem = ({ comment, level = 0 }: { comment: Comment & { replies?: Comment[] }; level?: number }) => {
    const isEditing = editingComment === comment.id;
    const isReply = comment.reply_to !== undefined;
    const replies = comment.replies || [];

    return (
      <div className={`${styles.comment} ${isReply ? styles.reply : ''}`}>
        <div className={styles.commentHeader}>
          <span className={styles.author}>{comment.author}</span>
          <div className={styles.commentMeta}>
            {isReply && (
              <span className={styles.replyBadge}>
                {t.reply}
              </span>
            )}
            <span className={styles.timestamp}>
              {comment.updated_at && comment.updated_at !== comment.created_at
                ? `Updated: ${new Date(comment.updated_at).toLocaleString()} (Created: ${new Date(comment.created_at).toLocaleString()})`
                : new Date(comment.created_at).toLocaleString()
              }
            </span>
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
                {t.save}
              </button>
              <button
                onClick={handleCancelEdit}
                className={styles.cancelButton}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.commentContent}>{comment.content}</p>
        )}

        <div className={styles.commentActions}>
          <button 
            onClick={() => handleEdit(comment.id)}
            className={styles.editButton}
          >
            {t.edit}
          </button>
          <button 
            onClick={() => handleReply(comment.id)}
            className={styles.replyButton}
          >
            {t.reply}
          </button>
          <button 
            onClick={() => setShowDeleteModal(comment.id)}
            className={styles.deleteButton}
          >
            {t.delete}
          </button>
        </div>

        {/* Render replies */}
        {replies.length > 0 && (
          <div className={styles.replies}>
            {replies.map((reply: Comment & { replies?: Comment[] }) => (
              <CommentItem key={reply.id} comment={reply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };
    return (
    <div className={styles.commentsSection}>
      <h3 className={styles.commentsTitle}>{t.title}</h3>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        {replyingTo !== null && (
          <div className={styles.replyContext}>
            <span>{t.replyTo} {comments.find(c => c.id === replyingTo)?.author}</span>
            <button 
              type="button"
              onClick={handleCancelReply}
              className={styles.cancelReplyButton}
            >
              {t.cancelReply}
            </button>
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="author" className={styles.label}>{t.nameLabel}</label>
          <input
            type="text"
            id="author"
            value={newComment.author}
            onChange={(event) => handleInputChange('author', event.target.value)}
            className={styles.input}
            placeholder={t.namePlaceholder}
            required
          />
        </div>
        
        
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>{t.commentLabel}</label>
          <textarea
            id="content"
            value={newComment.content}
            onChange={(event) => handleInputChange('content', event.target.value)}
            className={styles.textarea}
            placeholder={t.commentPlaceholder}
            rows={4}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>{t.passwordLabel}</label>
          <input
            type="password"
            id="password"
            value={newComment.password}
            onChange={(event) => handleInputChange('password', event.target.value)}
            className={styles.input}
            placeholder={t.passwordPlaceholder}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting 
            ? (replyingTo !== null ? t.posting : t.posting) 
            : (replyingTo !== null ? t.postReply : t.postComment)
          }
        </button>
      </form>

      {/* Error Display */}
      {/* {(error || fetchError) && (
        <div className={styles.errorMessage}>
          <span>{error || (fetchError instanceof Error ? fetchError.message : t.anErrorOccurred)}</span>
          <button onClick={() => setError(null)} className={styles.errorClose}>×</button>
        </div>
      )} */}

      {/* Loading State */}
      {isLoading && (
        <div className={styles.loadingMessage}>
          <span>{t.loadingComments}</span>
        </div>
      )}

      {/* Comments List */}
      {!isLoading && (
        <div className={styles.commentsList}>
          {comments.length === 0 ? (
            <p className={styles.noComments}>{t.noComments}</p>
          ) : (
            organizeComments(comments).map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{t.deleteComment}</h3>
            <p>{t.deletePasswordPrompt}</p>
            <input
              type="password"
              value={deletePassword}
              onChange={(event) => setDeletePassword(event.target.value)}
              className={styles.input}
              placeholder={t.enterPassword}
              autoFocus
            />
            <div className={styles.modalActions}>
              <button
                onClick={() => handleDelete(showDeleteModal, deletePassword)}
                className={styles.deleteButton}
              >
                {t.delete}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(null);
                  setDeletePassword('');
                }}
                className={styles.cancelButton}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Password Modal */}
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{t.edit}</h3>
            <p>{t.editPasswordPrompt}</p>
            {error && (
              <div className={styles.errorMessage}>
                <span>{error}</span>
                <button onClick={() => setError(null)} className={styles.errorClose}>×</button>
              </div>
            )}
            <input
              type="password"
              value={editPassword}
              onChange={(event) => {
                setEditPassword(event.target.value);
                setError(null); // Clear error when user starts typing
              }}
              className={styles.input}
              placeholder={t.enterPassword}
              autoFocus
            />
            <div className={styles.modalActions}>
              <button
                onClick={() => handleCheckEditPassword(showEditModal, editPassword)}
                className={styles.editButton}
              >
                {t.edit}
              </button>
              <button
                onClick={() => {
                  setShowEditModal(null);
                  setEditPassword('');
                  setError(null);
                }}
                className={styles.cancelButton}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
