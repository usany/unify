import Link from 'next/link';
import styles from './explanation.module.css';

export default function Explanation() {
    return (
        <section className={styles.hero}>
            <h1 className={styles.title}>Posts Documentation</h1>
            <p className={styles.subtitle}>
                Learn how to use components and APIs from the posts project.
            </p>
            <div className={styles.buttonGroup}>
                <Link href="/docs" className={styles.button}>
                    Browse Docs
                </Link>
                <Link href="/register" className={styles.button}>
                    Browse Register
                </Link>
            </div>
        </section>
    );
}