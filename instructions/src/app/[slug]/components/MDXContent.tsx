'use client';

import dynamic from 'next/dynamic';
import TableOfContents from './TableOfContents';

export default function MDXContent({ slug, language }: { slug: string, language: string }) {
    const Content = dynamic(() => {
        if (language === 'en') {
            return import(`@contents/${slug}En.mdx`);
        }
        return import(`@contents/${slug}.mdx`);
    }, {
        loading: () => <div>Loading...</div>,
    });

    return <>
        <TableOfContents pageId={slug} />
        <Content />
    </>
}
