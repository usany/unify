'use client';

import dynamic from 'next/dynamic';

export default function MDXContent({ slug }: { slug: string }) {
    const Content = dynamic(() => import(`@contents/${slug}.mdx`), {
        loading: () => <div>Loading...</div>,
    });

    return <>
        <Content />
    </>
}
