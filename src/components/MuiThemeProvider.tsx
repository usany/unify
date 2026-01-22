'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface MuiThemeProviderProps {
    children: React.ReactNode;
}

export default function MuiThemeProvider({ children }: MuiThemeProviderProps) {
    const { theme } = useTheme();

    const muiTheme = useMemo(() => {
        const colorOne = theme === 'dark' ? '#5c6778' : '#f7fafb'
        const colorTwo = theme === 'dark' ? '#2d3848' : '#e2e8f0'
        const colorThree = theme === 'dark' ? '#1a202c' : '#cbd5df'

        return createTheme({
            palette: {
                mode: theme === 'dark' ? 'dark' : 'light',
                primary: {
                    main: theme === 'dark' ? '#64b5f6' : '#1976d2',
                },
                background: {
                    default: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                    paper: theme === 'dark' ? '#2d2d2d' : '#ffffff',
                },
            },
            components: {
      MuiCard: {
        defaultProps: {
          sx: {
            bgcolor: colorThree,
            ':hover': {
              bgcolor: colorThree,
            },
          },
        },
        styleOverrides: {
          root: {
            variants: [
              {
                props: { className: 'colorTwo' },
                style: {
                  backgroundColor: colorTwo,
                },
              },
              {
                props: { className: 'colorOne' },
                style: {
                  backgroundColor: colorOne,
                },
              },
            ],
          },
        },
      },
      // MuiButtonBase: {
      //   defaultProps: {
      //     sx: {
      //       bgcolor: colorTwo,
      //     },
      //   }
      // },
      MuiButton: {
        styleOverrides: {
          root: {
            variants: [
              {
                props: { className: 'colorOne' },
                style: {
                  backgroundColor: colorOne,
                },
              },
              {
                props: { className: 'colorTwo' },
                style: {
                  backgroundColor: colorTwo,
                },
              },
            ],
          },
        },
      },
      MuiChip: {
        defaultProps: {
          sx: {
            bgcolor: colorOne,
            ':hover': {
              bgcolor: colorOne,
            },
          },
        },
        styleOverrides: {
          root: {
            variants: [
              {
                props: { className: 'specific' },
                style: {
                  fontSize: '12px',
                },
              },
            ],
          },
        },
      },
    },
        });

    }, [theme]);

    return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
