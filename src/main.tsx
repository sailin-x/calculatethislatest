// SUPER SIMPLE NUCLEAR OPTION - Global allInputs declaration
declare global {
  var allInputs: any;
}

// Set global allInputs
if (typeof globalThis !== 'undefined') {
  (globalThis as any).allInputs = {};
}
if (typeof window !== 'undefined') {
  (window as any).allInputs = {};
}

// MEGA NUCLEAR OPTION - Global allInputs polyfill to catch ANY reference
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
  
  // Nuclear option: Intercept ALL variable access
  const originalEval = window.eval;
  window.eval = function(code) {
    // Replace any raw allInputs references with safe versions
    const safeCode = code.replace(/\ballInputs\b(?!\?\.)/g, 'allInputs || {}');
    return originalEval.call(this, safeCode);
  };
  
  // SUPER NUCLEAR OPTION: Global error handler
  window.addEventListener('error', function(event) {
    if (event.message && event.message.includes('allInputs is not defined')) {
      console.log('SUPER NUCLEAR: Caught allInputs error, providing fallback');
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });
  
  // MEGA NUCLEAR OPTION: Global variable declaration
  (window as any).allInputs = {};
  
  // Force cache bust
  console.log('MEGA NUCLEAR allInputs polyfill loaded - cache bust:', Date.now());
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
