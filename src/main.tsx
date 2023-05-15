import React from 'react'
import ReactDOM from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import App from './components/App'
import AgeProvider from './context/AgeProvider'

const GlobalStyle = createGlobalStyle`
  :root {
    --accent-color: hsl(259, 100%, 65%);
    --error-color: hsl(0, 100%, 67%);
    --container-background: hsl(0, 0%, 100%);
    --body-background: hsl(0, 0%, 94%);
    --label-color: hsl(0, 1%, 44%);
    --default-font-color: hsl(0, 0%, 8%);
    --input-border-color: hsl(0, 0%, 86%);
    --button-background-hover: var(--default-font-color);
    --line-color: var(--body-background);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    font: inherit;
  }

  body {
    display: flex;
    justify-content: center;
    background: var(--body-background);
    min-height: 100svh;
    font-family: 'Poppins', sans-serif;
    color: var(--default-font-color);
    padding: 0 1rem 2rem 1rem;
  }

  img, picture, svg, video {
    display: block;
    max-width: 100%;
  }

  input {
    display: block;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }
`

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AgeProvider>
      <GlobalStyle />
      <App />
    </AgeProvider>
  </React.StrictMode>
)
