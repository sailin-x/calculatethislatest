// NUCLEAR OPTION - Global allInputs polyfill to catch ANY reference
if (typeof window !== 'undefined') {
  // Create a global allInputs object
  (window as any).allInputs = {};
  
  // Override any direct allInputs access
  Object.defineProperty(window, 'allInputs', {
    get() {
      return {};
    },
    set(value) {
      // Do nothing - prevent assignment
    }
  });
  
  // Force cache bust
  console.log('Nuclear allInputs polyfill loaded - cache bust:', Date.now());
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
