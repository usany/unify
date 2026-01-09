'use client'
import PageLayout from '@/components/pageLayout';
import docs from '@/content/docs.mdx';

export default function DocsPage() {

  return (
    <PageLayout file={docs} pageId="docs" />
  );
}
