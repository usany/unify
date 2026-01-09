import DefaultButton from '@/components/Default';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';

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
