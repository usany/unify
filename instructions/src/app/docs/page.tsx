import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './docs.module.css';
import fs from 'fs';
import path from 'path';
import Comments from '@/components/Comments';

export default function DocsPage() {
  const docsPath = path.join(process.cwd(), 'src/content/docs.md');
  const docsContent = fs.readFileSync(docsPath, 'utf8');

  return (
    <>
      {/* <a href="/" className={styles.homeButton}>Default</a> */}
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Posts Docs</h1>
        </div>

        <div className={styles.content}>
          <ReactMarkdown>{docsContent}</ReactMarkdown>
        </div>

        <Comments pageId="docs" />
      </div>
    </>
  );
}
