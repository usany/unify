"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './explanation.module.css';

const links = [
    { href: '/docs', label: 'Browse Docs' },
    { href: '/register', label: 'Browse Register' },
    { href: '/register', label: 'Browse Register' },
    { href: '/register', label: 'Browse Register' },
    { href: '/register', label: 'Browse Register' },
    { href: '/register', label: 'Browse Register' },
];

export default function Explanation() {
    const [showLinks, setShowLinks] = useState(false);

    return (
        <>
            <button 
                className={`${styles.showMoreButton} ${showLinks ? styles.active : ''}`}
                onClick={() => setShowLinks(!showLinks)}
                aria-label="Toggle navigation links"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <section className={styles.hero}>
                {!showLinks &&
                    <>
                        <h1 className={styles.title}>Posts Documentation</h1>
                        <p className={styles.subtitle}>
                            Learn how to use components and APIs from the posts project.
                        </p>
                    </>
                }
                <div className={`${styles.buttonGroup} ${showLinks ? styles.visible : ''}`}>
                    {links.map((link, index) => (
                        <Link key={index} href={link.href} className={styles.button}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}