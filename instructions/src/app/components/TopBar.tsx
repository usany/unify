'use client';
import { useState, useEffect } from 'react';
import styles from './TopBar.module.css';
import { usePathname } from 'next/navigation';
import links from 'links';

interface TopBarProps {
  language: string;
  theme: string;
}

export default function TopBar({ language, theme }: TopBarProps) {
  const [showLinks, setShowLinks] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const [isEnglish, setIsEnglish] = useState(language === 'en');
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
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    const themeValue = newMode ? 'dark' : 'light';
    document.cookie = `theme=${themeValue}; path=/; max-age=31536000`; // 1 year

    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const toggleLanguage = () => {
    const newLanguage = !isEnglish ? 'en' : 'ko';
    setIsEnglish(newLanguage === 'en');
    document.cookie = `language=${newLanguage}; path=/; max-age=31536000`; // 1 year
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
            {isEnglish ? 'En' : 'Ko'}
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
