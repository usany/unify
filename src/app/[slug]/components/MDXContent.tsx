'use client';

import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';

const MDXContent = ({ slug }: { slug: string }) => {
    const { language } = useLanguage();
    const Content = dynamic(() => {
        if (language === 'ko') {
            return import(`../../contents/${slug}.mdx`);
        }
        return import(`../../contents/${slug}En.mdx`);
    }, {
        loading: () => <div>Loading...</div>,
    });

    return <Content />;
}


export default MDXContent;
