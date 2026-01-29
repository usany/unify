'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, memo } from 'react';
import styles from './SideNav.module.css';
import getLinks from 'links';
import { useLanguage } from '@/app/context/LanguageContext';
import { LinkItem } from '@/types/links';
import links from 'links';

// interface NavItem {
//   label: string;
//   href: string;
//   icon?: string;
// }


export default memo(function SideNav({
  isMinified = false,
  onToggle
}: {
  isMinified?: boolean;
  onToggle?: () => void;
}) {
  const pathname = usePathname();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Don't show on home page or small screens
  if (pathname === '/' || !isLargeScreen) {
    return null;
  }

  return (
    <nav className={`${styles.sideNav} ${isMinified ? styles.minified : ''}`}>
      <div className={styles.navHeader}>
        <h3 className={styles.navTitle}>{language === 'en' ? 'Contents' : '목차'}</h3>
        {onToggle && (
          <button
            onClick={onToggle}
            className={styles.toggleButton}
            title={isMinified ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isMinified ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isMinified ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 17L18 12L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 17L6 12L11 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        )}
      </div>

      <ul className={styles.navList}>
        {links[language].map((item: LinkItem) => (
          <li key={item.href} className={styles.navItem}>
            <Link
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* <div className={styles.navFooter}>
        <div className={styles.navInfo}>
          <p className={styles.navVersion}>v1.0.0</p>
        </div>
      </div> */}
    </nav>
  );
});
