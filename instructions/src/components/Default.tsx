import type { Metadata } from 'next';
import styles from './Default.module.css';

export const metadata: Metadata = {
  title: 'Posts Docs',
  description: 'Documentation site for the posts project',
};

export default function DefaultButton() {
  return (
    <a href="/" className={styles.homeButton}>Default</a>
  );
}
