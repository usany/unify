import TopBar from '@/components/TopBar';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { ThemeProvider } from '@/app/context/ThemeContext';
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
            <ThemeProvider initialTheme={theme as 'light' | 'dark'}>
              <MuiThemeProvider>
                <TopBar language={language as 'ko' | 'en'} />
                <main style={{ paddingTop: '60px' }}>
                  {children}
                </main>
              </MuiThemeProvider>
            </ThemeProvider>
          </LanguageProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
