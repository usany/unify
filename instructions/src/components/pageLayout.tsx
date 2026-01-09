'use client';
import React from 'react';
import styles from './pageLayout.module.css';
import Comments from '@/components/Comments';
import SideNav from '@/components/SideNav';
import ContentLayout from './ContentLayout';
interface HeadingItem {
  id: string;
  text: string;
  level: number;
}


export default function PageLayout({ file, pageId }: { file: React.ComponentType<any>; pageId: string }) {
  // For MDX components, we'll use static headings for now
  const headings: HeadingItem[] = [
    { id: 'registers-docs', text: 'Registers Docs', level: 1 },
    { id: 'responsive-example', text: 'Responsive Example', level: 2 },
    { id: 'css-modules', text: 'CSS Modules', level: 2 },
  ];
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isTocOpen, setIsTocOpen] = React.useState(true);

  const handleTocClick = (id: string) => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  React.useEffect(() => {
    if (typeof document === 'undefined') return;

    const headingElements = Array.from(
      document.querySelectorAll<HTMLElement>('h1[id], h2[id], h3[id]')
    );

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);

        if (visible.length > 0) {
          const topMost = visible[0].target as HTMLElement;
          setActiveId(topMost.id || null);
        }
      },
      {
        root: null,
        threshold: 0.4,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [file]);

  const [isSideNavMinified, setIsSideNavMinified] = React.useState(false);

  return (
    <div className={styles.pageContainer}>
      <SideNav
        isMinified={isSideNavMinified}
        onToggle={() => setIsSideNavMinified(!isSideNavMinified)}
      />
      <div className={`${styles.contentContainer} ${!isTocOpen ? styles.contentExpanded : ''} ${isSideNavMinified ? styles.contentMinifiedSideNav : ''}`}>
        <div className={styles.headerRow}>
          <div className={styles.header}>
            <h1 className={styles.title}>{pageId}</h1>
          </div>
          {headings.length > 0 && (
            <nav
              className={`${styles.toc} ${!isTocOpen ? styles.tocCollapsed : ''}`}
              aria-label="Page navigation"
            >
              <div className={styles.tocHeaderRow}>
                <div className={styles.tocTitle}>On this page</div>
                <button
                  type="button"
                  className={styles.tocToggle}
                  onClick={() => setIsTocOpen((prev) => !prev)}
                  aria-label={isTocOpen ? 'Hide table of contents' : 'Show table of contents'}
                >
                  {isTocOpen ? '−' : '+'}
                </button>
              </div>
              {isTocOpen && (
                <ul className={styles.tocList}>
                  {headings.map((h) => (
                    <li
                      key={h.id}
                      className={
                        h.level === 1
                          ? styles.tocItemLevel1
                          : h.level === 2
                            ? styles.tocItemLevel2
                            : styles.tocItemLevel3
                      }
                    >
                      <button
                        type="button"
                        className={`${styles.tocLink} ${activeId === h.id ? styles.tocLinkActive : ''
                          }`}
                        onClick={() => handleTocClick(h.id)}
                      >
                        {h.text}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          )}
        </div>
        <ContentLayout content={file} />
        <Comments pageId={pageId} />
      </div>
    </div>
  );
}
