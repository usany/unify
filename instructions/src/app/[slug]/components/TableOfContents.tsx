'use client';

import { useState, useEffect } from 'react';
import styles from './TableOfContents.module.css';
import { useLanguage } from '@/app/context/LanguageContext';

interface HeadingItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    pageId: string;
    isTocOpen: boolean;
    toggleToc: () => void;
}

export default function TableOfContents({ pageId, isTocOpen, toggleToc }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<HeadingItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const { language } = useLanguage();
    const translations = {
        en: {
            title: 'On this page',
            showToc: 'Show table of contents',
            hideToc: 'Hide table of contents'
        },
        ko: {
            title: '목차',
            showToc: '목차 보기',
            hideToc: '목차 숨기기'
        }
    };
    
    const t = translations[language] || translations.ko;

    const handleTocClick = (id: string) => {
        if (typeof document === 'undefined') return;
        let el: HTMLElement | null = document.getElementById(id);

        // If the ID is on an anchor inside a heading, scroll the heading instead
        // This ensures scroll-margin-top on the heading is respected
        if (el?.tagName === 'A' && el.parentElement && /^H[1-3]$/.test(el.parentElement.tagName)) {
            el = el.parentElement as HTMLElement;
        }

        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Immediate feedback on click
            setActiveId(id);
        }
    };

    useEffect(() => {
        if (typeof document === 'undefined') return;

        let observer: IntersectionObserver | null = null;
        let mutationObserver: MutationObserver | null = null;

        const extractAndObserve = () => {
            const hElements = Array.from(
                document.querySelectorAll<HTMLElement>('h1, h2, h3')
            ).filter(el => el.id || el.querySelector('a[id]'));

            if (hElements.length === 0) return false;

            const extracted = hElements.map((el) => {
                const childAnchor = el.querySelector('a[id]');
                return {
                    id: el.id || childAnchor?.id || '',
                    text: el.textContent || '',
                    level: parseInt(el.tagName.substring(1), 10),
                };
            }).filter(h => h.id);

            setHeadings(extracted);

            if (observer) observer.disconnect();

            // Using IntersectionObserver with rootMargin is much more reliable across different scroll layouts
            observer = new IntersectionObserver(
                (entries) => {
                    const intersecting = entries
                        .filter(entry => entry.isIntersecting)
                        .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);

                    if (intersecting.length > 0) {
                        const targetId = intersecting[0].target.id || intersecting[0].target.querySelector('a[id]')?.id || null;
                        if (targetId) setActiveId(targetId);
                    }
                },
                {
                    // -60px accounts for the TopBar height, -80% bottom ensures we focus on the top of the page
                    rootMargin: '-60px 0px -80% 0px',
                    threshold: 0
                }
            );

            hElements.forEach(el => observer?.observe(el));
            return true;
        };

        if (!extractAndObserve()) {
            mutationObserver = new MutationObserver(() => {
                if (extractAndObserve()) mutationObserver?.disconnect();
            });
            mutationObserver.observe(document.body, { childList: true, subtree: true });
        }

        return () => {
            if (mutationObserver) mutationObserver.disconnect();
            if (observer) observer.disconnect();
        };
    }, [pageId, language]);

    if (headings.length === 0) return null;

    return (
        <nav
            className={`${styles.toc} ${!isTocOpen ? styles.tocCollapsed : ''}`}
            aria-label="Page navigation"
        >
            <div className={styles.tocHeaderRow}>
                <div className={styles.tocTitle}>{t.title}</div>
                <button
                    type="button"
                    className={styles.tocToggle}
                    onClick={toggleToc}
                    aria-label={isTocOpen ? t.hideToc : t.showToc}
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
    );
}
