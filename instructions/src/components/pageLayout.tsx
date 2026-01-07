'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './pageLayout.module.css';
import fs from 'fs';
import path from 'path';
import Comments from '@/components/Comments';
import SideNav from '@/components/SideNav';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function extractHeadings(markdown: string): HeadingItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}

export default function PageLayout({file, pageId}: {file: string; pageId: string}) {
  const headings = React.useMemo(() => extractHeadings(file), [file]);
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

  const headingRenderer = (level: 1 | 2 | 3) =>
    function Heading(props: any) {
      const { children } = props;
      const text = String(children);
      const id = slugify(text);
      const Tag = (`h${level}` as keyof JSX.IntrinsicElements);
      return (
        <Tag id={id}>
          {children}
        </Tag>
      );
    };

  return (
    <div className={styles.pageContainer}>
      <SideNav />
      <div className={styles.contentContainer}>
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
                        className={`${styles.tocLink} ${
                          activeId === h.id ? styles.tocLinkActive : ''
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

        <div className={styles.content}>
          <ReactMarkdown
            components={{
              h1: headingRenderer(1),
              h2: headingRenderer(2),
              h3: headingRenderer(3),
            }}
          >
            {file}
          </ReactMarkdown>
        </div>

        <Comments pageId={pageId} />
      </div>
    </div>
  );
}
