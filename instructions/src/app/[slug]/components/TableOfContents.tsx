'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

    // Custom hook-like logic using refs and callbacks
    const observerManagerRef = useRef<{
        observer: IntersectionObserver | null;
        mutationObserver: MutationObserver | null;
        isInitialized: boolean;
    }>({
        observer: null,
        mutationObserver: null,
        isInitialized: false
    });

    const initializeObservers = useCallback(() => {
        if (typeof document === 'undefined' || observerManagerRef.current.isInitialized) return;

        const manager = observerManagerRef.current;
        
        const extractHeadings = () => {
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
            return true;
        };

        const setupIntersectionObserver = (elements: HTMLElement[]) => {
            if (manager.observer) manager.observer.disconnect();

            manager.observer = new IntersectionObserver(
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
                    rootMargin: '-60px 0px -80% 0px',
                    threshold: 0
                }
            );

            elements.forEach(el => manager.observer?.observe(el));
        };

        const initialize = () => {
            const hElements = Array.from(
                document.querySelectorAll<HTMLElement>('h1, h2, h3')
            ).filter(el => el.id || el.querySelector('a[id]'));

            if (hElements.length === 0) return false;

            extractHeadings();
            setupIntersectionObserver(hElements);
            manager.isInitialized = true;
            return true;
        };

        if (!initialize()) {
            manager.mutationObserver = new MutationObserver(() => {
                if (initialize()) {
                    manager.mutationObserver?.disconnect();
                }
            });
            manager.mutationObserver.observe(document.body, { childList: true, subtree: true });
        }
    }, [setActiveId, setHeadings]);

    // Simple effect that just calls the initialization function
    useEffect(() => {
        initializeObservers();
        
        return () => {
            const manager = observerManagerRef.current;
            if (manager.observer) manager.observer.disconnect();
            if (manager.mutationObserver) manager.mutationObserver.disconnect();
            manager.isInitialized = false;
        };
    }, [pageId, language, initializeObservers]);

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
