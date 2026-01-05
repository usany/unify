import type { Metadata } from 'next';
import StyledComponentsRegistry from './StyledComponentsRegistry';
import { GlobalStyles } from '@/styles/GlobalStyles';

export const metadata: Metadata = {
  title: 'Posts Docs',
  description: 'Documentation site for the posts project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}
