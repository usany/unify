import PageLayout from '@/[slug]/components/pageLayout';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const possibleLinks = ['docs', 'register', 'registers', 'board', 'profile', 'search', 'chat', 'exhibition', 'report']
  if (!possibleLinks.includes(slug)) {
    redirect('/')
  }
  const content = await import(`@contents/${slug}.mdx`)
  return <PageLayout file={content.default} pageId={slug} />
}
