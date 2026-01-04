import React from 'react';
import { Box, Container, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import styled from 'styled-components';
import Link from 'next/link';

const Section = styled.section`
  margin: 32px 0;
  & h2 {
    margin: 16px 0;
  }
  & p {
    margin: 8px 0;
  }
`;

export default function DocsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 3 : 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 2 }}>
        <Typography variant={isMobile ? 'h4' : 'h3'} component="h1">
          Posts Docs
        </Typography>
        <Button component={Link} href="/" variant="text">Home</Button>
      </Box>

      <Typography variant="body1" color="text.secondary" paragraph>
        This documentation site demonstrates styled-components for custom styling and Material UI's
        useMediaQuery for responsive behavior.
      </Typography>

      <Section>
        <Typography variant="h5" component="h2">Responsive Example</Typography>
        <Typography variant="body1">
          Current breakpoint: <strong>{isMobile ? 'mobile (≤ md)' : 'desktop (≥ lg)'}</strong>
        </Typography>
        <Box sx={{ mt: 2, p: 2, borderRadius: 1, bgcolor: isMobile ? 'grey.100' : 'grey.200' }}>
          <Typography>
            The padding and background change based on screen size using useMediaQuery.
          </Typography>
        </Box>
      </Section>

      <Section>
        <Typography variant="h5" component="h2">Styled Components</Typography>
        <Typography variant="body1">
          This page uses styled-components for global and local styles. You can compose styles with the theme
          from MUI by reading values via the useTheme hook.
        </Typography>
      </Section>
    </Container>
  );
}
