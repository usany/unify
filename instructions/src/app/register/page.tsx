import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './register.module.css';
import fs from 'fs';
import path from 'path';
import Comments from '@/components/Comments';

export default function RegisterPage() {
  const registerPath = path.join(process.cwd(), 'src/content/register.md');
  const registerContent = fs.readFileSync(registerPath, 'utf8');

  return (
    <div className={styles.container}>
      {/* <a href="/" className={styles.homeButton}>Default</a> */}
      <div className={styles.header}>
        <h1 className={styles.title}>Register Docs</h1>
      </div>

      <div className={styles.content}>
        <ReactMarkdown>{registerContent}</ReactMarkdown>
      </div>

      <Comments pageId="register" />
    </div>
  );
}
