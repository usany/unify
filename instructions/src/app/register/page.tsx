import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './register.module.css';
import fs from 'fs';
import path from 'path';

export default function RegisterPage() {
  const registerPath = path.join(process.cwd(), 'src/content/register.md');
  const registerContent = fs.readFileSync(registerPath, 'utf8');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Register Docs</h1>
        <a href="/" className={styles.homeButton}>Home</a>
      </div>

      <div className={styles.content}>
        <ReactMarkdown>{registerContent}</ReactMarkdown>
      </div>
    </div>
  );
}
