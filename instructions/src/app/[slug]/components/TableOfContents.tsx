'use client';

import { useState, useEffect } from 'react';
import styles from './pageLayout.module.css';

interface HeadingItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    pageId: string;
}

export default function TableOfContents({ pageId }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<HeadingItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isTocOpen, setIsTocOpen] = useState(true);

    const handleTocClick = (id: string) => {
        if (typeof document === 'undefined') return;
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        if (typeof document === 'undefined') return;

        let observer: IntersectionObserver | null = null;
        let mutationObserver: MutationObserver | null = null;

        const extractAndObserveHeadings = () => {
            const headingElements = Array.from(
                document.querySelectorAll<HTMLElement>('h1[id], h2[id], h3[id]')
            );

            if (headingElements.length === 0) return false;

            // Extract headings from DOM
            const extractedHeadings: HeadingItem[] = headingElements.map((el) => ({
                id: el.id,
                text: el.textContent || '',
                level: parseInt(el.tagName.substring(1), 10),
            }));
            setHeadings(extractedHeadings);

            // Clean up previous observer if it exists
            if (observer) {
                observer.disconnect();
            }

            observer = new IntersectionObserver(
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

            headingElements.forEach((el) => observer!.observe(el));
            return true;
        };

        // Try to extract headings immediately
        const success = extractAndObserveHeadings();

        // If no headings found, watch for DOM changes
        if (!success) {
            mutationObserver = new MutationObserver(() => {
                const found = extractAndObserveHeadings();
                if (found && mutationObserver) {
                    mutationObserver.disconnect();
                }
            });

            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true,
            });
        }

        return () => {
            if (observer) observer.disconnect();
            if (mutationObserver) mutationObserver.disconnect();
        };
    }, [pageId]);

    if (headings.length === 0) return null;

    return (
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
    );
}
