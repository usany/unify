// import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
// import styled from 'styled-components';
import Explanation from './explanation';
import { headers } from 'next/headers';

export default async function HomePage() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  
  console.log('Current pathname:', pathname);

  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div>
      {/* <div>Posts Documentation</div> */}
      <Explanation />
    </div>
  );
}
