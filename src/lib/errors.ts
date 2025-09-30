/**
 * Custom error classes for enhanced error handling and user experience
 */

/**
 * Base calculator error class with additional context
 */
export class CalculatorError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly field?: string,
    public readonly value?: any,
    public readonly suggestion?: string
  ) {
    super(message);
    this.name = 'CalculatorError';

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CalculatorError);
    }
  }

  /**
   * Returns a user-friendly error message with suggestions
   */
  getUserMessage(): string {
    let message = this.message;

    if (this.suggestion) {
      message += ` ${this.suggestion}`;
    }

    if (this.field) {
      message += ` (Field: ${this.field})`;
    }

    return message;
  }

  /**
   * Returns error details for debugging
   */
  getDebugInfo(): Record<string, any> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      field: this.field,
      value: this.value,
      suggestion: this.suggestion,
      stack: this.stack
    };
  }
}

/**
 * Validation error for input validation failures
 */
export class ValidationError extends CalculatorError {
  constructor(
    field: string,
    value: any,
    message: string,
    suggestion?: string
  ) {
    super(message, 'VALIDATION_ERROR', field, value, suggestion);
    this.name = 'ValidationError';
  }

  static invalidRange(field: string, value: any, min: number, max: number): ValidationError {
    return new ValidationError(
      field,
      value,
      `${field} must be between ${min} and ${max}`,
      `Please enter a value between ${min} and ${max}`
    );
  }

  static required(field: string): ValidationError {
    return new ValidationError(
      field,
      undefined,
      `${field} is required`,
      `Please provide a value for ${field}`
    );
  }

  static invalidFormat(field: string, value: any, expectedFormat: string): ValidationError {
    return new ValidationError(
      field,
      value,
      `${field} has invalid format`,
      `Expected format: ${expectedFormat}`
    );
  }
}

/**
 * Calculation error for mathematical computation failures
 */
export class CalculationError extends CalculatorError {
  constructor(
    message: string,
    field?: string,
    value?: any,
    suggestion?: string
  ) {
    super(message, 'CALCULATION_ERROR', field, value, suggestion);
    this.name = 'CalculationError';
  }

  static divisionByZero(field: string, operation: string): CalculationError {
    return new CalculationError(
      `Division by zero in ${operation}`,
      field,
      0,
      'Check input values to ensure no zero denominators'
    );
  }

  static overflow(field: string, value: any, maxValue: number): CalculationError {
    return new CalculationError(
      `Value exceeds maximum allowed: ${maxValue}`,
      field,
      value,
      `Please use a value less than or equal to ${maxValue}`
    );
  }

  static underflow(field: string, value: any, minValue: number): CalculationError {
    return new CalculationError(
      `Value below minimum allowed: ${minValue}`,
      field,
      value,
      `Please use a value greater than or equal to ${minValue}`
    );
  }
}

/**
 * Network/API error for external service failures
 */
export class NetworkError extends CalculatorError {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly endpoint?: string
  ) {
    super(message, 'NETWORK_ERROR', undefined, undefined, 'Please check your internet connection and try again');
    this.name = 'NetworkError';
  }
}

/**
 * Configuration error for setup/initialization issues
 */
export class ConfigurationError extends CalculatorError {
  constructor(
    message: string,
    public readonly configKey?: string,
    suggestion?: string
  ) {
    super(message, 'CONFIGURATION_ERROR', configKey, undefined, suggestion);
    this.name = 'ConfigurationError';
  }
}

/**
 * Error handler utility for consistent error processing
 */
export class ErrorHandler {
  /**
   * Converts any error to a CalculatorError
   */
  static normalize(error: any): CalculatorError {
    if (error instanceof CalculatorError) {
      return error;
    }

    if (error instanceof Error) {
      return new CalculatorError(
        error.message,
        'UNKNOWN_ERROR',
        undefined,
        undefined,
        'An unexpected error occurred. Please try again.'
      );
    }

    return new CalculatorError(
      'An unknown error occurred',
      'UNKNOWN_ERROR',
      undefined,
      error,
      'Please contact support if this persists'
    );
  }

  /**
   * Logs error for debugging and monitoring
   */
  static log(error: CalculatorError, context?: Record<string, any>): void {
    const logData = {
      timestamp: new Date().toISOString(),
      error: error.getDebugInfo(),
      context: context || {},
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server'
    };

    // In production, this would send to logging service
    console.error('Calculator Error:', logData);

    // Could also send to analytics/monitoring service
    // analytics.track('error', logData);
  }

  /**
   * Returns appropriate error message for user display
   */
  static getUserMessage(error: any): string {
    const normalizedError = this.normalize(error);
    return normalizedError.getUserMessage();
  }

  /**
   * Determines if error should trigger retry
   */
  static isRetryable(error: CalculatorError): boolean {
    return error.code === 'NETWORK_ERROR' ||
           error.code === 'CALCULATION_ERROR' && error.message.includes('timeout');
  }

  /**
   * Gets suggested retry delay in milliseconds
   */
  static getRetryDelay(error: CalculatorError, attemptNumber: number): number {
    if (!this.isRetryable(error)) return 0;

    // Exponential backoff: 1s, 2s, 4s, 8s, 16s max
    return Math.min(1000 * Math.pow(2, attemptNumber - 1), 16000);
  }
}

/**
 * Error boundary helper for React components
 */
export class ErrorBoundary {
  static catch(error: any, errorInfo?: any): CalculatorError {
    const normalizedError = ErrorHandler.normalize(error);

    ErrorHandler.log(normalizedError, {
      componentStack: errorInfo?.componentStack,
      errorBoundary: true
    });

    return normalizedError;
  }
}