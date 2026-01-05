import Link from 'next/link';
import styles from './register.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Register Docs</h1>
        <Link href="/" className={styles.homeButton}>Home</Link>
      </div>

      <p className={styles.subtitle}>
        This documentation site demonstrates CSS Modules for custom styling and responsive design
        with CSS media queries instead of JavaScript-based breakpoints.
      </p>

      <section className={styles.section}>
        <h2>Responsive Example</h2>
        <p>
          Current breakpoint: <strong className={styles.breakpoint}>responsive (CSS media queries)</strong>
        </p>
        <div className={styles.responsiveBox}>
          <p>
            The padding and background change based on screen size using CSS media queries.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>CSS Modules</h2>
        <p>
          This page uses CSS Modules for local styles. Global styles are provided via GlobalStyles.
        </p>
      </section>
    </div>
  );
}
