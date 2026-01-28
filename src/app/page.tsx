'use client';

import styles from './root.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { LinkItem } from '@/types/links';
import links from 'links';
import { Button } from '@mui/material';

const translations = {
  en: {
    title: 'KHUSAN Instructions',
    subtitle: 'Learn how to use KHUSAN.'
  },
  ko: {
    title: '쿠우산 설명서',
    subtitle: '쿠우산 사용법을 알아보세요.'
  }
};

export default function RootPage() {
  const { language } = useLanguage();
  const translation = translations[language];
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{translation.title}</h1>
      <p className={styles.subtitle}>
        {translation.subtitle}
      </p>
      <div className={`${styles.buttonGroup}`}>
        {links[language].map((link: LinkItem, index: number) => (
          <Button key={index} href={link.href} variant='outlined' className={'colorOne'}>
            {link.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
