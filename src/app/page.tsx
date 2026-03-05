'use client';

import styles from './root.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { LinkItem } from '@/types/links';
import links from 'links';
import { Button } from '@mui/material';
import RainAnimation from '@/components/RainAnimation';
import { useEffect, useState } from 'react';

const translations = {
  en: {
    title: 'KHUSAN Instructions',
    subtitle: 'Learn how to use KHUSAN.',
    faq: {
      title: 'Frequently Asked Questions',
      q1: {
        question: 'What is KHUSAN?',
        answer: 'KHUSAN is an advanced AI-powered documentation platform that helps you create, manage, and search documentation efficiently.'
      },
      q2: {
        question: 'Can anyone use KHUSAN?',
        answer: 'Anyone can use KHUSAN at Seoul, International, and Gwangneung campuses.'
      },
      q3: {
        question: 'Want to withdraw from KHUSAN.',
        answer: 'You can withdraw from the bottom of your profile.'
      }
    },
  },
  ko: {
    title: '쿠우산 설명서',
    subtitle: '쿠우산 사용법을 알아보세요.',
    faq: {
      title: '자주 묻는 질문',
      q1: {
        question: '쿠우산이란 무엇인가요?',
        answer: '쿠우산은 문서를 효율적으로 생성, 관리 및 검색할 수 있도록 도와주는 고급 AI 기반 문서 플랫폼입니다.'
      },
      q2: {
        question: '누구나 쿠우산을 이용할 수 있나요?',
        answer: '누구나 서울, 국제, 광릉 캠퍼스에서 쿠우산을 이용할 수 있습니다.'
      },
      q3: {
        question: '쿠우산을 탈퇴하고 싶습니다.',
        answer: '내 프로필 하단에서 탈퇴를 진행할 수 있습니다.'
      }
    },
  }
};

export default function RootPage() {
  const { language } = useLanguage();
  const translation = translations[language];
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    
  return (
    <>
      <RainAnimation />
      <section className={styles.hero}>
        <h1 className={styles.title}>{translation.title}</h1>
        <p className={styles.subtitle}>
          {translation.subtitle}
        </p>
      </section>
      <div className={`${styles.buttonGroup}`}>
        {links[language].map((link: LinkItem, index: number) => (
          <Button key={index} href={link.href} variant='outlined' className={'colorOne'}>
            {link.label}
          </Button>
        ))}
      </div>
      <section className={styles.heroContent}>
        <div className={styles.heroVisual}>
          <div className={styles.floatingCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardLine}></div>
              <div className={styles.cardLine}></div>
              <div className={styles.cardLine}></div>
            </div>
          </div>
        </div>
        <section id="faq" className={styles.faq}>
          <div className={styles.container}>
            {/* <h2 className={styles.sectionTitle}>{translation.faq.title}</h2> */}
            <div className={styles.faqList}>
              {[
                { q: translation.faq.q1.question, a: translation.faq.q1.answer },
                { q: translation.faq.q2.question, a: translation.faq.q2.answer },
                { q: translation.faq.q3.question, a: translation.faq.q3.answer }
              ].map((item, index) => (
                <div key={index} className={styles.faqItem}>
                  <button 
                    className={styles.faqQuestion}
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    {item.q}
                    <span className={`${styles.faqIcon} ${expandedFaq === index ? styles.expanded : ''}`}></span>
                  </button>
                  <div className={`${styles.faqAnswer} ${expandedFaq === index ? styles.open : ''}`}>
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
