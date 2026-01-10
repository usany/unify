import TopBar from '@/components/TopBar';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Posts Docs',
  description: 'Documentation site for the posts project',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';

  return (
    <html lang="en" className={theme} data-theme={theme}>
      <body>
        <AppRouterCacheProvider>
          <TopBar theme={theme} />
          <main style={{ paddingTop: '60px' }}>
            {children}
          </main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
