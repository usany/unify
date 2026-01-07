'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './SideNav.module.css';

interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'Documentation', href: '/docs', icon: '📚' },
  { name: 'Register', href: '/register', icon: '📝' },
];

export default function SideNav() {
  const pathname = usePathname();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

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
    <nav className={styles.sideNav}>
      <div className={styles.navHeader}>
        <h3 className={styles.navTitle}>Navigation</h3>
      </div>
      
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.href} className={styles.navItem}>
            <Link 
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.navFooter}>
        <div className={styles.navInfo}>
          <p className={styles.navVersion}>v1.0.0</p>
        </div>
      </div>
    </nav>
  );
}
