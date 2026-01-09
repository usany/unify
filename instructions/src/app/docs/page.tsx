'use client'
import PageLayout from '@app/[slug]/components/pageLayout';
import docs from '@/content/docs.mdx';

export default function DocsPage() {

  return (
    <PageLayout file={docs} pageId="docs" />
  );
}
