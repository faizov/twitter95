import React from "react";
import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import "../../styles/globals.css"
import { styleReset } from "react95";
// pick a theme of your choice
import original from "react95/dist/themes/original";

import { store } from "../__data__/store";

import { Protect } from "./protect";


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

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <Provider store={store()}>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Protect>
          <Component {...pageProps} />
        </Protect>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
