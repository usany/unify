'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';

interface MuiThemeProviderProps {
    children: React.ReactNode;
    theme: string;
}

export default function MuiThemeProvider({ children, theme }: MuiThemeProviderProps) {
    const muiTheme = useMemo(() => {
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
                MuiBottomNavigation: {
                    styleOverrides: {
                        root: {
                            backgroundColor: 'var(--bg-topbar)',
                            borderTop: '1px solid',
                            borderColor: 'var(--border)',
                            borderRadius: '10px 10px 0 0',
                            height: 64,
                            boxShadow: '0 -2px 10px 0 rgba(0,0,0,0.05)',
                        },
                    },
                },
                MuiBottomNavigationAction: {
                    styleOverrides: {
                        root: {
                            color: 'var(--text-muted)',
                            padding: '12px 12px 10px',
                            '&.Mui-selected': {
                                color: 'var(--primary)',
                                '& .MuiBottomNavigationAction-label': {
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                },
                            },
                        },
                        label: {
                            fontSize: '0.75rem',
                            transition: 'font-size 0.2s, font-weight 0.2s',
                        },
                    },
                },
            },
        });

    }, [theme]);

    return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
