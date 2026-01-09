'use client';

import dynamic from 'next/dynamic';
import TableOfContents from './TableOfContents';

export default function MDXContent({ slug }: { slug: string }) {
    const Content = dynamic(() => import(`@contents/${slug}.mdx`), {
        loading: () => <div>Loading...</div>,
    });

    return <>
        <TableOfContents pageId={slug} />
        <Content />
    </>
}
