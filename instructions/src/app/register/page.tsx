'use client';
import PageLayout from '@app/[slug]/components/pageLayout';
import register from '@contents/register.mdx';
export default function RegisterPage() {
  return (
    <PageLayout file={register} pageId="register" />
  );
}
q