
import { redirect } from 'next/navigation';
import SlugLayout from './components/SlugLayout';
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
</SlugLayout > */}
  return (
    <SlugLayout pageId={slug} />
  )
}
