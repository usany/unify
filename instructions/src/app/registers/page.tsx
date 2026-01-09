'use client';
import registers from '@contents/registers.mdx';
import PageLayout from '@/[slug]/components/pageLayout';

export default function RegisterPage() {

  return (
    <PageLayout file={registers} pageId="register" />
  );
}
