'use client'
import PageLayout from '@app/[slug]/components/pageLayout';
import docs from '@contents/docs.mdx';

export default function DocsPage() {

  return (
    <PageLayout file={docs} pageId="docs" />
  );
}
