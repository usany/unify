'use client';
import { useState, useEffect } from 'react';
import styles from './TopBar.module.css';
import { usePathname } from 'next/navigation';
import links from 'links';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTheme } from '@/app/context/ThemeContext';
import Link from 'next/link';

export default function TopBar() {
  const [showLinks, setShowLinks] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // lg breakpoint
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
        <Link href="/" className={styles.homeButton}>KHUSAN</Link>
        <div className={styles.topBarActions}>
          <button
            className={styles.toggleButton}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button
            className={styles.toggleButton}
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            {language === 'en' ? 'En' : 'Ko'}
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
