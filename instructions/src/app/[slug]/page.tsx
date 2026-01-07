import React from 'react';
import ReactMarkdown from 'react-markdown';
import path from 'path';
import fs from 'fs';
import PageLayout from '@/components/pageLayout';

interface PageProps {
  params: { slug: string };
}

// Dynamic route to serve markdown-driven pages like /docs and /register
export default function DynamicPage({ params }: PageProps) {
  const { slug } = params;

  // Map known slugs to existing markdown files
  const fileMap: Record<string, string> = {
    docs: 'docs.md',
    register: 'register.md',
  };

  const mdFile = fileMap[slug];

  if (!mdFile) {
    return <div>Page not found</div>;
  }

  const filePath = path.join(process.cwd(), 'src/content', mdFile);
  const content = fs.readFileSync(filePath, 'utf8');

  return <PageLayout file={content} pageId={slug} />;
}

// Pre-generate the known slugs at build time
export async function generateStaticParams() {
  return [
    { slug: 'docs' },
    { slug: 'register' },
  ];
}
