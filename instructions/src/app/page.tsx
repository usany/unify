'use client';

import styles from './root.module.css';
import getLinks from 'links';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { LinkItem } from '@/types/links';

const translations = {
  en: {
    title: 'Posts Documentation',
    subtitle: 'Learn how to use components and APIs from the posts project.'
  },
  ko: {
    title: '문서',
    subtitle: '프로젝트의 컴포넌트와 API 사용법을 알아보세요.'
  }
};

export default function RootPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const links = getLinks(language);
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>
        {t.subtitle}
      </p>
      <div className={`${styles.buttonGroup}`}>
        {links.map((link: LinkItem, index: number) => (
          <Link key={index} href={link.href} className={styles.button}>
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
