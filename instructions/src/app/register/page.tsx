import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './register.module.css';
import fs from 'fs';
import path from 'path';
import Comments from '@/components/Comments';
import SideNav from '@/components/SideNav';
import PageLayout from '@/components/pageLayout';

export default function RegisterPage() {
  const registerPath = path.join(process.cwd(), 'src/content/register.md');
  const registerContent = fs.readFileSync(registerPath, 'utf8');

  return (
    <PageLayout file={registerContent} pageId="register" />
  );
}
