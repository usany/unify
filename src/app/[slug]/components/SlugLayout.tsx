'use client';

import { useState } from 'react';
import styles from './SlugLayout.module.css';
import Comments from './Comments';
import SideNav from './SideNav';
import MDXContent from './MDXContent';
import TableOfContents from './TableOfContents';

export default function SlugLayout({ pageId }: { pageId: string }) {

  const [isSideNavMinified, setIsSideNavMinified] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(true);
  const toggleSideNav = () => setIsSideNavMinified(!isSideNavMinified);
  const toggleToc = () => setIsTocOpen(!isTocOpen);
  return (
    <div className={styles.pageContainer}>
      <SideNav
        isMinified={isSideNavMinified}
        onToggle={toggleSideNav}
      />
      <div className={`${styles.contentContainer} ${isSideNavMinified ? styles.contentMinifiedSideNav : ''} ${!isTocOpen ? styles.contentExpanded : ''}`}>
        <div className={styles.content}>
          <TableOfContents pageId={pageId} isTocOpen={isTocOpen} toggleToc={toggleToc} />
          <MDXContent slug={pageId} />
        </div>
        <Comments pageId={pageId} />
      </div>
    </div>
  );
}
