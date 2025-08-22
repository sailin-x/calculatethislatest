// EMERGENCY POLYFILL - Prevent allInputs is not defined errors
if (typeof window !== 'undefined') {
  (window as any).allInputs = {};
  console.log('Emergency allInputs polyfill loaded');
}

// FORCE MODULE LOADING ORDER - Load validation modules first
import './utils/validation'; // Load validation first
import './engines/ValidationEngine'; // Load engine second
import './debug-allInputs'; // Load debug test

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
