'use client';
import { useState, useEffect } from 'react';
import styles from './Default.module.css';
import { usePathname } from 'next/navigation';
import links from '@/lib/links';


export default function TopBar() {
  const [showLinks, setShowLinks] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const pathname = usePathname();
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'en' ? 'es' : 'en');
  };

  return (
    <>
      <div className={styles.topBar}>
        <a href="/" className={styles.homeButton}>Posts Documentation</a>
        <div className={styles.topBarActions}>
          <button
            className={styles.toggleButton}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          <button
            className={styles.toggleButton}
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            {currentLang === 'en' ? 'ES' : 'EN'}
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
          {links.map((link, index) => (
            <a key={index} href={link.href} className={styles.button}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
