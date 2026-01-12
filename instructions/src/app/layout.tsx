import TopBar from '@/components/TopBar';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { LanguageProvider } from '@/context/LanguageContext';
import MuiThemeProvider from '@/components/MuiThemeProvider';
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
  const language = cookieStore.get('language')?.value || 'ko';

  return (
    <html lang={language} className={theme} data-theme={theme}>
      <body>
        <AppRouterCacheProvider>
          <LanguageProvider initialLanguage={language as 'ko' | 'en'}>
            <MuiThemeProvider theme={theme}>
              <TopBar language={language} theme={theme} />
              <main style={{ paddingTop: '60px' }}>
                {children}
              </main>
            </MuiThemeProvider>
          </LanguageProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
