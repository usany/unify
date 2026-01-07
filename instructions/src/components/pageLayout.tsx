'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './pageLayout.module.css';
import fs from 'fs';
import path from 'path';
import Comments from '@/components/Comments';
import SideNav from '@/components/SideNav';

export default function PageLayout({file, pageId}: {file: string; pageId: string}) {
  return (
    <div className={styles.pageContainer}>
      <SideNav />
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>{pageId}</h1>
        </div>

        <div className={styles.content}>
          <ReactMarkdown>{file}</ReactMarkdown>
        </div>

        <Comments pageId={pageId} />
      </div>
    </div>
  );
}
