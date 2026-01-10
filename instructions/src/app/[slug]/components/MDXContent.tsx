'use client';

import dynamic from 'next/dynamic';
import TableOfContents from './TableOfContents';
import { useLanguage } from '@/context/LanguageContext';

export default function MDXContent({ slug }: { slug: string }) {
    const { language } = useLanguage();
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
