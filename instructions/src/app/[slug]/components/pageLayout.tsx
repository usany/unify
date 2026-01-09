'use client';

import { useState } from 'react';
import styles from './pageLayout.module.css';
import Comments from './Comments';
import SideNav from './SideNav';
import MDXContent from './MDXContent';

export default function PageLayout({ pageId }: { pageId: string }) {

  const [isSideNavMinified, setIsSideNavMinified] = useState(false);

  return (
    <div className={styles.pageContainer}>
      <SideNav
        isMinified={isSideNavMinified}
        onToggle={() => setIsSideNavMinified(!isSideNavMinified)}
      />
      <div className={`${styles.contentContainer} ${isSideNavMinified ? styles.contentMinifiedSideNav : ''}`}>
        {/* <div className={styles.headerRow}>
          <div className={styles.header}>
            <h1 className={styles.title}>{pageId}</h1>
          </div>
        </div> */}
        <div className={styles.content}>
          <MDXContent slug={pageId} />
        </div>
        {/* {children} */}
        <Comments pageId={pageId} />
      </div>
    </div>
  );
}
