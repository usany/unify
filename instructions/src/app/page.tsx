"use client";

import React from 'react';
import Link from 'next/link';
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import styled from 'styled-components';

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
`;

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 4 : 8 }}>
      <Hero>
        <Typography variant={isMobile ? 'h4' : 'h2'} component="h1" gutterBottom>
          Posts Documentation
        </Typography>
        <Typography variant={isMobile ? 'body1' : 'h6'} color="text.secondary" paragraph>
          Learn how to use components and APIs from the posts project.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button component={Link} href="/docs" variant="contained" color="primary">
            Browse Docs
          </Button>
        </Box>
      </Hero>
    </Container>
  );
}
