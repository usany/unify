'use client';
import PageLayout from '@/[slug]/components/pageLayout';
import register from '@contents/register.mdx';
export default function RegisterPage() {
  return (
    <PageLayout file={register} pageId="register" />
  );
}