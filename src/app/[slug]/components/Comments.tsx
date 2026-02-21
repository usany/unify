"use client";

import React, { useState, memo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useLanguage } from '../../context/LanguageContext';
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
  const { language } = useLanguage();
  
  const translations: Record<string, Record<string, string>> = {
    en: {
      title: 'Comments',
      nameLabel: 'Name',
      emailLabel: 'Email',
      commentLabel: 'Comment',
      passwordLabel: 'Password (for deletion)',
      namePlaceholder: 'Enter your name',
      emailPlaceholder: 'Enter your email',
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
      enterPassword: 'Enter password',
      noComments: 'No comments yet. Be the first to share your thoughts!',
      loadingComments: 'Loading comments...',
      passwordRequired: 'Password is required to delete comment',
      failedToFetch: 'Failed to fetch comments',
      failedToPost: 'Failed to post comment',
      failedToUpdate: 'Failed to update comment',
      failedToDelete: 'Failed to delete comment',
      anErrorOccurred: 'An error occurred'
    },
    ko: {
      title: '댓글',
      nameLabel: '이름',
      emailLabel: '이메일',
      commentLabel: '댓글',
      passwordLabel: '비밀번호 (삭제용)',
      namePlaceholder: '이름을 입력하세요',
      emailPlaceholder: '이메일을 입력하세요',
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
      enterPassword: '비밀번호 입력',
      noComments: '아직 댓글이 없습니다. 첫 번째로 의견을 공유해보세요!',
      loadingComments: '댓글 로딩 중...',
      passwordRequired: '댓글을 삭제하려면 비밀번호가 필요합니다',
      failedToFetch: '댓글을 가져오는데 실패했습니다',
      failedToPost: '댓글 작성에 실패했습니다',
      failedToUpdate: '댓글 수정에 실패했습니다',
      failedToDelete: '댓글 삭제에 실패했습니다',
      anErrorOccurred: '오류가 발생했습니다'
    }
  };
  
  const t = translations[language] || translations.ko;
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
        setError(err.message || t.failedToUpdate);
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
        throw new Error(errorData.error || t.failedToDelete);
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
        setError(err.message || t.failedToDelete);
      }
    }
  );

  const handleDelete = async (commentId: number, password: string) => {
    if (!password.trim()) {
      setError(t.passwordRequired);
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
            onClick={() => handleEdit(comment.id, comment.content)}
            className={styles.editButton}
          >
            {t.edit}
          </button>
          <button 
            onClick={() => setShowDeleteModal(comment.id)}
            className={styles.deleteButton}
          >
            {t.delete}
          </button>
        </div>
      </div>
    );
  };
    return (
    <div className={styles.commentsSection}>
      <h3 className={styles.commentsTitle}>{t.title}</h3>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className={styles.commentForm}>
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
          <label htmlFor="email" className={styles.label}>{t.emailLabel}</label>
          <input
            type="email"
            id="email"
            value={newComment.email}
            onChange={(event) => handleInputChange('email', event.target.value)}
            className={styles.input}
            placeholder={t.emailPlaceholder}
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
          disabled={isSubmitting || postCommentMutation.isLoading}
          className={styles.submitButton}
        >
          {isSubmitting || postCommentMutation.isLoading ? t.posting : t.postComment}
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
    </div>
  );
});
