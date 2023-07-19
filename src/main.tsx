import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import GlobalStyle from './styles/globalStyles'
import AgeProvider from './context/AgeProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AgeProvider>
      <GlobalStyle />
      <App />
    </AgeProvider>
  </React.StrictMode>
)
