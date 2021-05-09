import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { defaultTheme } from "./theme";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  body {
    background: lightgray;
  }

  body, p, ul {
    margin: 0
  }

  ul {
    list-style: none;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  p {
    font-size: 0.8rem
  }

  @media (min-width: 768px) {    
    p {
      font-size: 0.9rem
    }  
  }

`;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
