'use client';

import { useState, useEffect } from 'react';
import styles from './Default.module.css';

const links = [
    { href: '/docs', label: 'Browse Docs' },
    { href: '/register', label: 'Browse Register' },
    { href: '/', label: 'Home' },
];

export default function DefaultButton() {
  const [showLinks, setShowLinks] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <div className={styles.topBar}>
        <a href="/" className={styles.homeButton}>Posts Documentation</a>
        {isSmallScreen && (
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
      
      {isSmallScreen && (
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
