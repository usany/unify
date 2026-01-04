import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #__next { height: 100%; }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: #1a1a1a;
    background-color: #fafafa;
  }
  a { color: inherit; text-decoration: none; }
`
