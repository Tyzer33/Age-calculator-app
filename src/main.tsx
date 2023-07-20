import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import Error from './components/Error'
import App from './components/App'
import GlobalStyle from './styles/globalStyles'
import AgeProvider from './context/AgeProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <ErrorBoundary fallback={<Error />}>
      <AgeProvider>
        <App />
      </AgeProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
