export interface ErrorReport {
  id: string;
  timestamp: Date;
  type: 'javascript' | 'calculation' | 'network' | 'performance' | 'user';
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  userId?: string;
  sessionId: string;
  calculatorId?: string;
  inputs?: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context: Record<string, any>;
  resolved: boolean;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: Date;
  type: 'page_view' | 'calculator_use' | 'calculation' | 'export' | 'error' | 'performance';
  category: string;
  action: string;
  label?: string;
  value?: number;
  calculatorId?: string;
  userId?: string;
  sessionId: string;
  properties: Record<string, any>;
}

export interface PerformanceMetric {
  id: string;
  timestamp: Date;
  type: 'load_time' | 'calculation_time' | 'render_time' | 'memory_usage' | 'bundle_size';
  value: number;
  calculatorId?: string;
  context: Record<string, any>;
}

export class ErrorTrackingService {
  private static errors: ErrorReport[] = [];
  private static events: AnalyticsEvent[] = [];
  private static metrics: PerformanceMetric[] = [];
  private static sessionId: string = this.generateSessionId();
  private static userId?: string;
  private static isInitialized = false;

  // Initialization
  static init(config: {
    userId?: string;
    enableConsoleCapture?: boolean;
    enableNetworkCapture?: boolean;
    enablePerformanceCapture?: boolean;
    maxStoredErrors?: number;
    reportingEndpoint?: string;
  } = {}): void {
    if (this.isInitialized) return;

    this.userId = config.userId;
    this.setupGlobalErrorHandlers();
    
    if (config.enableConsoleCapture !== false) {
      this.setupConsoleCapture();
    }
    
    if (config.enableNetworkCapture !== false) {
      this.setupNetworkCapture();
    }
    
    if (config.enablePerformanceCapture !== false) {
      this.setupPerformanceCapture();
    }

    this.isInitialized = true;
    this.trackEvent('system', 'error_tracking_initialized');
  }

  // Error Reporting
  static reportError(
    error: Error | string,
    context: {
      type?: ErrorReport['type'];
      severity?: ErrorReport['severity'];
      calculatorId?: string;
      inputs?: any;
      additionalContext?: Record<string, any>;
    } = {}
  ): string {
    const errorReport: ErrorReport = {
      id: this.generateId(),
      timestamp: new Date(),
      type: context.type || 'javascript',
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'object' ? error.stack : undefined,
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: this.userId,
      sessionId: this.sessionId,
      calculatorId: context.calculatorId,
      inputs: context.inputs,
      severity: context.severity || 'medium',
      context: {
        timestamp: Date.now(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        memory: this.getMemoryInfo(),
        connection: this.getConnectionInfo(),
        ...context.additionalContext
      },
      resolved: false
    };

    this.errors.push(errorReport);
    this.limitStoredData(this.errors, 100);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', errorReport);
    }

    // Send to external service if configured
    this.sendErrorReport(errorReport);

    return errorReport.id;
  }

  static reportCalculationError(
    calculatorId: string,
    inputs: any,
    error: Error,
    severity: ErrorReport['severity'] = 'high'
  ): string {
    return this.reportError(error, {
      type: 'calculation',
      severity,
      calculatorId,
      inputs,
      additionalContext: {
        calculationAttempt: true,
        inputValidation: this.validateInputs(inputs)
      }
    });
  }

  static reportNetworkError(
    url: string,
    method: string,
    status: number,
    error: Error
  ): string {
    return this.reportError(error, {
      type: 'network',
      severity: status >= 500 ? 'high' : 'medium',
      additionalContext: {
        url,
        method,
        status,
        networkRequest: true
      }
    });
  }

  // Analytics Tracking
  static trackEvent(
    category: string,
    action: string,
    label?: string,
    value?: number,
    properties: Record<string, any> = {}
  ): string {
    const event: AnalyticsEvent = {
      id: this.generateId(),
      timestamp: new Date(),
      type: this.getEventType(category, action),
      category,
      action,
      label,
      value,
      calculatorId: properties.calculatorId,
      userId: this.userId,
      sessionId: this.sessionId,
      properties: {
        url: window.location.href,
        referrer: document.referrer,
        ...properties
      }
    };

    this.events.push(event);
    this.limitStoredData(this.events, 500);

    // Send to analytics service
    this.sendAnalyticsEvent(event);

    return event.id;
  }

  static trackCalculatorUsage(
    calculatorId: string,
    action: 'view' | 'calculate' | 'export' | 'share',
    additionalProperties: Record<string, any> = {}
  ): string {
    return this.trackEvent(
      'calculator',
      action,
      calculatorId,
      undefined,
      {
        calculatorId,
        ...additionalProperties
      }
    );
  }

  static trackPerformance(
    type: PerformanceMetric['type'],
    value: number,
    calculatorId?: string,
    context: Record<string, any> = {}
  ): string {
    const metric: PerformanceMetric = {
      id: this.generateId(),
      timestamp: new Date(),
      type,
      value,
      calculatorId,
      context: {
        url: window.location.href,
        ...context
      }
    };

    this.metrics.push(metric);
    this.limitStoredData(this.metrics, 200);

    // Send performance data
    this.sendPerformanceMetric(metric);

    return metric.id;
  }

  // Data Retrieval
  static getErrors(filter?: {
    type?: ErrorReport['type'];
    severity?: ErrorReport['severity'];
    calculatorId?: string;
    resolved?: boolean;
    limit?: number;
  }): ErrorReport[] {
    let filtered = this.errors;

    if (filter) {
      if (filter.type) filtered = filtered.filter(e => e.type === filter.type);
      if (filter.severity) filtered = filtered.filter(e => e.severity === filter.severity);
      if (filter.calculatorId) filtered = filtered.filter(e => e.calculatorId === filter.calculatorId);
      if (filter.resolved !== undefined) filtered = filtered.filter(e => e.resolved === filter.resolved);
      if (filter.limit) filtered = filtered.slice(0, filter.limit);
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  static getAnalytics(filter?: {
    type?: AnalyticsEvent['type'];
    category?: string;
    calculatorId?: string;
    dateRange?: { start: Date; end: Date };
    limit?: number;
  }): AnalyticsEvent[] {
    let filtered = this.events;

    if (filter) {
      if (filter.type) filtered = filtered.filter(e => e.type === filter.type);
      if (filter.category) filtered = filtered.filter(e => e.category === filter.category);
      if (filter.calculatorId) filtered = filtered.filter(e => e.calculatorId === filter.calculatorId);
      if (filter.dateRange) {
        filtered = filtered.filter(e => 
          e.timestamp >= filter.dateRange!.start && e.timestamp <= filter.dateRange!.end
        );
      }
      if (filter.limit) filtered = filtered.slice(0, filter.limit);
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  static getPerformanceMetrics(filter?: {
    type?: PerformanceMetric['type'];
    calculatorId?: string;
    limit?: number;
  }): PerformanceMetric[] {
    let filtered = this.metrics;

    if (filter) {
      if (filter.type) filtered = filtered.filter(m => m.type === filter.type);
      if (filter.calculatorId) filtered = filtered.filter(m => m.calculatorId === filter.calculatorId);
      if (filter.limit) filtered = filtered.slice(0, filter.limit);
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Error Management
  static markErrorResolved(errorId: string): boolean {
    const error = this.errors.find(e => e.id === errorId);
    if (error) {
      error.resolved = true;
      return true;
    }
    return false;
  }

  static clearErrors(filter?: { resolved?: boolean; olderThan?: Date }): number {
    const initialLength = this.errors.length;
    
    if (filter) {
      this.errors = this.errors.filter(error => {
        if (filter.resolved !== undefined && error.resolved !== filter.resolved) {
          return true; // Keep
        }
        if (filter.olderThan && error.timestamp > filter.olderThan) {
          return true; // Keep
        }
        return false; // Remove
      });
    } else {
      this.errors = [];
    }

    return initialLength - this.errors.length;
  }

  // Setup Methods
  private static setupGlobalErrorHandlers(): void {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.reportError(event.error || new Error(event.message), {
        type: 'javascript',
        severity: 'high',
        additionalContext: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });

    // Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError(event.reason, {
        type: 'javascript',
        severity: 'high',
        additionalContext: {
          promiseRejection: true
        }
      });
    });

    // React error boundary integration
    if (typeof window !== 'undefined') {
      (window as any).__REACT_ERROR_OVERLAY_GLOBAL_HOOK__ = {
        onError: (error: Error) => {
          this.reportError(error, {
            type: 'javascript',
            severity: 'high',
            additionalContext: {
              reactError: true
            }
          });
        }
      };
    }
  }

  private static setupConsoleCapture(): void {
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      originalError.apply(console, args);
      this.reportError(args.join(' '), {
        type: 'javascript',
        severity: 'medium',
        additionalContext: {
          consoleError: true,
          arguments: args
        }
      });
    };

    console.warn = (...args) => {
      originalWarn.apply(console, args);
      this.reportError(args.join(' '), {
        type: 'javascript',
        severity: 'low',
        additionalContext: {
          consoleWarn: true,
          arguments: args
        }
      });
    };
  }

  private static setupNetworkCapture(): void {
    // Intercept fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        
        // Track successful requests
        this.trackPerformance('load_time', endTime - startTime, undefined, {
          networkRequest: true,
          url: args[0],
          status: response.status
        });

        // Track failed requests
        if (!response.ok) {
          this.reportNetworkError(
            args[0] as string,
            'GET',
            response.status,
            new Error(`HTTP ${response.status}: ${response.statusText}`)
          );
        }

        return response;
      } catch (error) {
        const endTime = performance.now();
        this.trackPerformance('load_time', endTime - startTime, undefined, {
          networkRequest: true,
          url: args[0],
          error: true
        });

        this.reportNetworkError(
          args[0] as string,
          'GET',
          0,
          error as Error
        );

        throw error;
      }
    };
  }

  private static setupPerformanceCapture(): void {
    // Capture page load metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          this.trackPerformance('load_time', navigation.loadEventEnd - navigation.fetchStart);
        }

        // Capture resource loading times
        const resources = performance.getEntriesByType('resource');
        resources.forEach(resource => {
          if (resource.duration > 100) { // Only track slow resources
            this.trackPerformance('load_time', resource.duration, undefined, {
              resourceType: (resource as PerformanceResourceTiming).initiatorType,
              resourceName: resource.name
            });
          }
        });
      }, 1000);
    });
  }

  // Utility Methods
  private static generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static getEventType(category: string, action: string): AnalyticsEvent['type'] {
    if (category === 'calculator') return 'calculator_use';
    if (category === 'performance') return 'performance';
    if (category === 'error') return 'error';
    if (action === 'page_view') return 'page_view';
    return 'page_view';
  }

  private static validateInputs(inputs: any): Record<string, boolean> {
    const validation: Record<string, boolean> = {};
    
    if (typeof inputs === 'object' && inputs !== null) {
      Object.keys(inputs).forEach(key => {
        const value = inputs[key];
        validation[key] = value !== null && value !== undefined && value !== '';
      });
    }

    return validation;
  }

  private static getMemoryInfo(): Record<string, number> | null {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  private static getConnectionInfo(): Record<string, any> | null {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      };
    }
    return null;
  }

  private static limitStoredData<T>(array: T[], maxSize: number): void {
    if (array.length > maxSize) {
      array.splice(maxSize);
    }
  }

  private static async sendErrorReport(error: ErrorReport): Promise<void> {
    // In a real implementation, send to error tracking service
    try {
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(error)
      // });
    } catch (err) {
      console.error('Failed to send error report:', err);
    }
  }

  private static async sendAnalyticsEvent(event: AnalyticsEvent): Promise<void> {
    // In a real implementation, send to analytics service
    try {
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // });
    } catch (err) {
      console.error('Failed to send analytics event:', err);
    }
  }

  private static async sendPerformanceMetric(metric: PerformanceMetric): Promise<void> {
    // In a real implementation, send to performance monitoring service
    try {
      // await fetch('/api/performance', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metric)
      // });
    } catch (err) {
      console.error('Failed to send performance metric:', err);
    }
  }
}