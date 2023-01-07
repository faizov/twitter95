import React from "react";
import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import styled from "styled-components";

import { Frame, styleReset } from "react95";
// pick a theme of your choice
import original from "react95/dist/themes/original";

import localFont from "@next/font/local";
import { Provider } from "react-redux";

import { store } from "../__data__/store";

import { LeftMenu } from "../components/left-menu";
import { RightMenu } from "../components/right-menu";

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

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 800px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
`;

export const FrameStyled = styled(Frame)`
  min-width: 600px;
  max-width: 600px;
  padding: 15px;
`;

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Provider store={store()}>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <FrameStyles variant="window">
          <div className={fonts.className}>
            <Wrapper>
              <LeftMenu />
              <FrameStyled variant="inside">
                <Component {...pageProps} />
              </FrameStyled>
              <RightMenu />
            </Wrapper>
          </div>
        </FrameStyles>
      </ThemeProvider>
    </Provider>
  </>
);

export default App;
