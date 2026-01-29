
import { redirect } from 'next/navigation';
import SlugLayout from './components/SlugLayout';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const possibleLinks = ['docs', 'register', 'registers', 'status', 'board', 'profile', 'search', 'chat', 'exhibition', 'report', 'platform', 'playlist']
  if (!possibleLinks.includes(slug)) {
    redirect('/')
  }

  return (
    <SlugLayout pageId={slug} />
  )
}
