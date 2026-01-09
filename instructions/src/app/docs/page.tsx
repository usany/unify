'use client'
import PageLayout from '@app/[slug]/components/pageLayout';
import docs from '@app/content/docs.mdx';

export default function DocsPage() {

  return (
    <PageLayout file={docs} pageId="docs" />
  );
}
