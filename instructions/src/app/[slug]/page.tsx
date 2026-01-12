
import { redirect } from 'next/navigation';
import SlugLayout from './components/SlugLayout';
import MDXContent from './components/MDXContent';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

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

  const cookieStore = await cookies()
  const language = cookieStore.get('language')?.value || 'ko'

  return (
    <SlugLayout pageId={slug} />
  )
}
