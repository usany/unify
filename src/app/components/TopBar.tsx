'use client';
import { useState, useEffect } from 'react';
import styles from './TopBar.module.css';
import { usePathname } from 'next/navigation';
import links from 'links';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTheme } from '@/app/context/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';

export default function TopBar() {
  const [showLinks, setShowLinks] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleDarkMode = () => {
    toggleTheme();
  };

  return (
    <>
      <div className={styles.topBar}>
        <Link href="/" className={styles.homeButton}>
          <Image
            src="/favicons.png"
            alt="KHUSAN"
            width={84}
            height={24}
          />
          {/* KHUSAN */}
        </Link>
        <div className={styles.topBarActions}>
          <button
            className={styles.toggleButton}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="m12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
            )}
          </button>
          <button
            className={styles.toggleButton}
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            {language === 'en' ? 'ENG' : '한국어'}
          </button>
          {pathname !== '/' && isSmallScreen && (
            <button
              className={`${styles.showMoreButton} ${showLinks ? styles.active : ''}`}
              onClick={() => setShowLinks(!showLinks)}
              aria-label="Toggle navigation links"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
        </div>
      </div>
      {pathname !== '/' && isSmallScreen && (
        <div className={`${styles.buttonGroup} ${showLinks ? styles.visible : ''}`}>
          {links[language].map((link, index) => (
            <Link key={index} href={link.href} className={styles.button}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
