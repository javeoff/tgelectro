import { FC } from 'react';
import { createGlobalStyle, css, ThemeProvider } from 'styled-components';

const defaultTheme = {
  colors: {
    default: '#000',
  },
};

export type ITheme = typeof defaultTheme & {
  isMobile: boolean;
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;

    ${(p) =>
      !p.theme.isMobile &&
      css`
        width: 100%;
      `}
  }
`;

export const Layout: FC = ({ children }) => (
  <ThemeProvider theme={{ ...defaultTheme, isMobile: global.isMobile }}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
