'use client';
import PageLayout from '@/components/pageLayout';
import register from '@/content/register.mdx';
export default function RegisterPage() {
  return (
    <PageLayout file={register} pageId="register" />
  );
}
