import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './docs.module.css';
import fs from 'fs';
import path from 'path';
import Comments from '@/components/Comments';
import SideNav from '@/components/SideNav';
import PageLayout from '@/components/pageLayout';

export default function DocsPage() {
  const docsPath = path.join(process.cwd(), 'src/content/docs.md');
  const docsContent = fs.readFileSync(docsPath, 'utf8');

  return (
    <PageLayout file={docsContent} pageId="docs" />
  );
}
