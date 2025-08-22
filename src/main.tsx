// RADICAL SOLUTION - Test if site works without validation
console.log('RADICAL SOLUTION: Testing site without complex validation - timestamp:', Date.now());

// Simple global allInputs fallback
if (typeof window !== 'undefined') {
  (window as any).allInputs = {};
}

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
