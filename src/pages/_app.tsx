import React from "react";
import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import styled from "styled-components";

import { Frame, styleReset } from "react95";
// pick a theme of your choice
import original from "react95/dist/themes/original";

import localFont from "@next/font/local";

const fonts = localFont({
  src: [
    {
      path: "../fonts/ms_sans_serif.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ms_sans_serif_bold.woff2",
      weight: "bold",
      style: "normal",
    },
  ],
});

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  body {
    width: 100%;
    min-height: 100vh;
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

const FrameStyles = styled(Frame)`
  background: ${({ theme }) => theme.desktopBackground};
  width: 100%;
  min-height: 100vh;
  border: 0;
`;

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <FrameStyles variant="window">
        <div className={fonts.className}>
          <Component {...pageProps} />
        </div>
      </FrameStyles>
    </ThemeProvider>
  </>
);

export default App;
