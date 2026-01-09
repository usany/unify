import styles from './root.module.css';
import links from '@/app/lib/links';
import Link from 'next/link';

export default function RootPage() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Posts Documentation</h1>
      <p className={styles.subtitle}>
        Learn how to use components and APIs from the posts project.
      </p>
      <div className={`${styles.buttonGroup}`}>
        {links.map((link, index) => (
          <Link key={index} href={link.href} className={styles.button}>
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
