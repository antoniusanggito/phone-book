import { css } from '@emotion/react';

export default css`
  :root {
    --clr-primary: #40513b;
    --clr-secondary: #609966;
    --clr-tertiary: #9dc08b;
    --clr-background: #edf1d6;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 16px;
  }

  p,
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }

  h1 {
    font-size: clamp(1.75rem, 0.5vw, 10rem);
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1rem;
  }

  p {
    font-size: 0.75rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;
