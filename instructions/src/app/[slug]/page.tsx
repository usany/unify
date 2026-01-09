
import { redirect } from 'next/navigation';
import PageLayout from './components/PageLayout';
import MDXContent from './components/MDXContent';
import dynamic from 'next/dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const possibleLinks = ['docs', 'register', 'registers', 'status', 'board', 'profile', 'search', 'chat', 'exhibition', 'report']
  if (!possibleLinks.includes(slug)) {
    redirect('/')
  }

  // const Content = dynamic(() => import(`@contents/${slug}.mdx`), {
  //   loading: () => <div>Loading...</div>,
  // });
  {/* <div></div>
  <MDXContent slug={slug} />
  <Content />
</PageLayout > */}
  return (
    <PageLayout pageId={slug} />
  )
}
