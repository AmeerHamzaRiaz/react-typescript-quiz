import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './pages/MainPage';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";

ReactDOM.render(
  <ThemeProvider>
    <ColorModeProvider>
      <CSSReset />
      <React.StrictMode>
        <MainPage />
      </React.StrictMode>
    </ColorModeProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
