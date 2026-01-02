import { Preview, ReactRenderer } from '@storybook/react-vite';

import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { createGlobalStyle, } from 'styled-components';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';

import { withThemeByClassName } from "@storybook/addon-themes";
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#cbd5df',
    },
  },
})
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a202c',
    },
  },
})
export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
]

