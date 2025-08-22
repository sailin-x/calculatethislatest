import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ValidationErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ValidationErrorBoundary>
      <App />
    </ValidationErrorBoundary>
  </React.StrictMode>,
)
