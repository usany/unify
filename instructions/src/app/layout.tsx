import DefaultButton from '@/components/Default';
import SideNav from '@/components/SideNav';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
// import StyledComponentsRegistry from './StyledComponentsRegistry';
// import { GlobalStyles } from '@/styles/GlobalStyles';
// import styles from './docs.module.css';

export const metadata: Metadata = {
  title: 'Posts Docs',
  description: 'Documentation site for the posts project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <DefaultButton />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
