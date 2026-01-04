import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
