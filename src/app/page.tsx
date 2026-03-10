'use client';

import styles from './root.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { LinkItem } from '@/types/links';
import links from 'links';
import { Button } from '@mui/material';
import RainAnimation from '@/components/RainAnimation';
import { useEffect, useState } from 'react';
const method = <>
            <div>
              쿠우산KHUSAN은 다음의 목적을 위하여 개인정보를 처리합니다.
              처리하고 있는 개인정보는 다음의 목적 외의 용도로는 이용되지
              않으며, 이용 목적이 변경되는 경우에는 관계 법령에 따라 별도의
              동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </div>
            <div>1. 회원 가입 및 관리</div>
            <div>
              회원 자격 유지와 관리, 서비스 부정이용 방지 목적으로 개인정보를
              처리합니다.
            </div>
            <div>2. 서비스 제공</div>
            <div>콘텐츠 제공, 본인인증의 목적으로 개인정보를 처리합니다.</div>
            <div>3. 서비스 개선 및 분석</div>
            <div>
              서비스 이용에 대한 분석, 서비스 개선을 목적으로 개인정보를
              처리합니다.
            </div>
            <div>4. 서비스 개발</div>
            <div>
              기존 서비스와 별개의 신규 서비스 개발 목적으로 개인정보를
              처리합니다.
            </div>
            <div>각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</div>
            <div>1. 홈페이지 회원 가입: 회원 탈퇴 시까지</div>
            <div>
              다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
              보관합니다.
            </div>
            <div>
              1. 관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우에는 해당
              수사, 조사 종료 시까지
            </div>
            <div>
              쿠우산KHUSAN은 개인정보 보유기간의 경과, 처리목적 달성 등
              개인정보가 불필요하게 되었을 떄에는 지체없이 해당 개인정보를
              파기합니다.
            </div>
            <div>
              쿠우산KHUSAN은 정보주체에게 개별적인 서비스와 편의를 제공하기 위해
              이용정보를 저장하고 수시로 불러오는 쿠키를 사용합니다.
            </div>
            <div>
              쿠우산KHUSAN은 원활한 개인정보 업무처리를 위하여 다음과 같이
              개인정보 처리 업무를 위탁하고 있습니다.
            </div>
            <div>위탁받는 자: Google구글</div>
            <div>위탁업무: 개인정보 관리</div>
            <div>
              쿠키는 웹사이트 운영에 이용되는 http 서버가 정보주체의 브라우저에
              보내는 소량의 정보로서 정보주체의 컴퓨터 또는 모바일에 저장되며,
              웹사이트 접속 시 정보주체의 브라우저에서 서버로 자동 전송됩니다.
            </div>
            <div>
              정보주체는 브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의 설정을
              할 수 있습니다.
            </div>
          </>
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
        question: 'How can I delete my KHUSAN account?',
        answer: 'You can delete your account from the bottom of your profile.'
      },
      q3: {
        question: 'Can I share my service improvement opinions?',
        answer: 'Please send service improvement requests to ahncb@khu.ac.kr. Criticism is also appreciated.'
      }
    },
    policy: 'Privacy policy'
  },
  ko: {
    title: '쿠우산 설명서',
    subtitle: '쿠우산 사용법을 알아보세요.',
    faq: {
      title: '자주 묻는 질문',
      q1: {
        question: '쿠우산이란 무엇인가요?',
        answer: '쿠우산은 문서를 효율적으로 생성, 관리 및 검색할 수 있도록 도와주는 고급 AI 기반 문서 플랫폼입니다. 누구나 서울, 국제, 광릉 캠퍼스에서 쿠우산을 이용할 수 있습니다.'
      },
      q2: {
        question: '계정은 어떻게 삭제할 수 있나요?',
        answer: '내 프로필 하단에서 계정 삭제를 진행할 수 있습니다.'
      },
      q3: {
        question: '서비스 개선에 대한 의견을 낼 수 있나요?',
        answer: '서비스 개선 사항을 ahncb@khu.ac.kr으로 보내주세요. 비판도 감사하게 받겠습니다.'
      },
    },
    policy: '개인정보처리방침'
  }
};

export default function RootPage() {
  const { language } = useLanguage();
  const translation = translations[language];
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    
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
      
      {/* Footer */}
      <footer>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 KHUSAN.</p>
          <button 
            className={styles.privacyLink}
            onClick={() => setShowPrivacyModal(true)} 
          >
            {translation.policy}
          </button>
        </div>
      </footer>
      
      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPrivacyModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{translation.policy}</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowPrivacyModal(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              {method}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
