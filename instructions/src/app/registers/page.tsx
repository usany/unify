'use client';
import registers from '@/content/registers.mdx';
import PageLayout from '@app/[slug]/components/pageLayout';

export default function RegisterPage() {

  return (
    <PageLayout file={registers} pageId="register" />
  );
}
