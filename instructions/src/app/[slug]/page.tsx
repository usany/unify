'use client';
// import registers from '@contents/registers.mdx';
import PageLayout from '@/[slug]/components/pageLayout';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const content = await import(`@contents/${slug}.mdx`)
  return <PageLayout file={content.default} pageId={slug} />
}
