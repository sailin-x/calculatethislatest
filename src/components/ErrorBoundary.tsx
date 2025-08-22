import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ValidationErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('=== ERROR BOUNDARY CAUGHT ERROR ===');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Error Stack:', error.stack);
    
    // Special handling for allInputs errors
    if (error.message.includes('allInputs is not defined')) {
      console.error('🚨 CAUGHT: allInputs is not defined error');
      console.error('Stack trace:', error.stack);
      console.error('Error info:', errorInfo);
      
      // Log additional debugging info
      console.error('Window object:', typeof window);
      console.error('Global allInputs:', (window as any).allInputs);
      
      // Try to recover
      if (typeof window !== 'undefined') {
        (window as any).allInputs = (window as any).allInputs || {};
        console.log('Recovery: Set global allInputs');
      }
    }
    
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          margin: '20px', 
          border: '2px solid red', 
          borderRadius: '8px',
          backgroundColor: '#fff5f5'
        }}>
          <h2>🚨 Application Error Detected</h2>
          <p><strong>Error:</strong> {this.state.error?.message}</p>
          <details>
            <summary>Error Details</summary>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '10px', 
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {this.state.error?.stack}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ValidationErrorBoundary;
