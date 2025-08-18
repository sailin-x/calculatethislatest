export interface PerformanceMetrics {
  calculationTime: number;
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
  loadTime: number;
  interactionTime: number;
}

export interface OptimizationConfig {
  enableMemoization: boolean;
  enableLazyLoading: boolean;
  enableCodeSplitting: boolean;
  enableServiceWorker: boolean;
  cacheStrategy: 'aggressive' | 'conservative' | 'minimal';
  performanceThresholds: {
    calculationTime: number; // ms
    renderTime: number; // ms
    memoryUsage: number; // MB
    loadTime: number; // ms
  };
}

export class PerformanceOptimizationService {
  private static metrics: PerformanceMetrics[] = [];
  private static config: OptimizationConfig = {
    enableMemoization: true,
    enableLazyLoading: true,
    enableCodeSplitting: true,
    enableServiceWorker: true,
    cacheStrategy: 'conservative',
    performanceThresholds: {
      calculationTime: 100, // 100ms
      renderTime: 16, // 16ms (60fps)
      memoryUsage: 50, // 50MB
      loadTime: 3000 // 3 seconds
    }
  };

  // Performance Monitoring
  static startPerformanceTimer(label: string): () => number {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      const endMemory = this.getMemoryUsage();
      
      this.recordMetric({
        label,
        duration,
        memoryDelta: endMemory - startMemory,
        timestamp: Date.now()
      });

      return duration;
    };
  }

  static measureCalculationPerformance<T>(
    calculationFn: () => T,
    calculatorId: string
  ): { result: T; metrics: { duration: number; memoryUsage: number } } {
    const timer = this.startPerformanceTimer(`calculation_${calculatorId}`);
    const startMemory = this.getMemoryUsage();
    
    const result = calculationFn();
    
    const duration = timer();
    const endMemory = this.getMemoryUsage();

    const metrics = {
      duration,
      memoryUsage: endMemory - startMemory
    };

    // Check if performance is within thresholds
    if (duration > this.config.performanceThresholds.calculationTime) {
      console.warn(`Slow calculation detected: ${calculatorId} took ${duration}ms`);
      this.suggestOptimizations(calculatorId, metrics);
    }

    return { result, metrics };
  }

  static measureRenderPerformance(componentName: string, renderFn: () => void): number {
    const timer = this.startPerformanceTimer(`render_${componentName}`);
    
    renderFn();
    
    const duration = timer();

    if (duration > this.config.performanceThresholds.renderTime) {
      console.warn(`Slow render detected: ${componentName} took ${duration}ms`);
    }

    return duration;
  }

  // Memory Management
  static getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
    }
    return 0;
  }

  static monitorMemoryLeaks(): void {
    if ('memory' in performance) {
      const checkMemory = () => {
        const usage = this.getMemoryUsage();
        if (usage > this.config.performanceThresholds.memoryUsage) {
          console.warn(`High memory usage detected: ${usage.toFixed(2)}MB`);
          this.triggerGarbageCollection();
        }
      };

      setInterval(checkMemory, 30000); // Check every 30 seconds
    }
  }

  private static triggerGarbageCollection(): void {
    // Force garbage collection if available (Chrome DevTools)
    if ('gc' in window) {
      (window as any).gc();
    }
  }

  // Caching and Memoization
  static createMemoizedFunction<T extends (...args: any[]) => any>(
    fn: T,
    keyGenerator?: (...args: Parameters<T>) => string
  ): T {
    const cache = new Map<string, ReturnType<T>>();
    const maxCacheSize = 100;

    return ((...args: Parameters<T>): ReturnType<T> => {
      const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
      
      if (cache.has(key)) {
        return cache.get(key)!;
      }

      const result = fn(...args);
      
      // Implement LRU cache
      if (cache.size >= maxCacheSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      
      cache.set(key, result);
      return result;
    }) as T;
  }

  static createCalculatorCache(calculatorId: string): {
    get: (inputs: any) => any;
    set: (inputs: any, result: any) => void;
    clear: () => void;
  } {
    const cacheKey = `calculator_cache_${calculatorId}`;
    const cache = new Map<string, { result: any; timestamp: number }>();
    const cacheTimeout = 5 * 60 * 1000; // 5 minutes

    return {
      get: (inputs: any) => {
        const key = JSON.stringify(inputs);
        const cached = cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < cacheTimeout) {
          return cached.result;
        }
        
        if (cached) {
          cache.delete(key);
        }
        
        return null;
      },
      
      set: (inputs: any, result: any) => {
        const key = JSON.stringify(inputs);
        cache.set(key, { result, timestamp: Date.now() });
        
        // Clean up old entries
        if (cache.size > 50) {
          const oldestKey = cache.keys().next().value;
          cache.delete(oldestKey);
        }
      },
      
      clear: () => {
        cache.clear();
      }
    };
  }

  // Bundle Optimization
  static async loadCalculatorModule(calculatorId: string): Promise<any> {
    try {
      // Dynamic import with error handling
      const module = await import(`../calculators/${calculatorId}`);
      return module.default || module;
    } catch (error) {
      console.error(`Failed to load calculator module: ${calculatorId}`, error);
      throw new Error(`Calculator ${calculatorId} not found`);
    }
  }

  static preloadCriticalCalculators(calculatorIds: string[]): void {
    calculatorIds.forEach(id => {
      // Preload with low priority
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          this.loadCalculatorModule(id).catch(() => {
            // Silently fail for preloading
          });
        });
      }
    });
  }

  // Image and Asset Optimization
  static optimizeImage(
    imageUrl: string,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'webp' | 'jpeg' | 'png';
    } = {}
  ): string {
    // In a real implementation, this would integrate with an image optimization service
    const params = new URLSearchParams();
    
    if (options.width) params.set('w', options.width.toString());
    if (options.height) params.set('h', options.height.toString());
    if (options.quality) params.set('q', options.quality.toString());
    if (options.format) params.set('f', options.format);
    
    return `${imageUrl}?${params.toString()}`;
  }

  static lazyLoadImages(): void {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Network Optimization
  static enableResourceHints(): void {
    const head = document.head;
    
    // DNS prefetch for external resources
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = '//fonts.googleapis.com';
    head.appendChild(dnsPrefetch);
    
    // Preconnect to critical origins
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://api.example.com';
    head.appendChild(preconnect);
  }

  static enableServiceWorker(): void {
    if ('serviceWorker' in navigator && this.config.enableServiceWorker) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }

  // Performance Analytics
  static getPerformanceReport(): {
    averageCalculationTime: number;
    averageRenderTime: number;
    memoryUsage: number;
    slowCalculators: string[];
    recommendations: string[];
  } {
    const calculationMetrics = this.metrics.filter(m => m.label.startsWith('calculation_'));
    const renderMetrics = this.metrics.filter(m => m.label.startsWith('render_'));
    
    const avgCalculationTime = calculationMetrics.length > 0
      ? calculationMetrics.reduce((sum, m) => sum + m.duration, 0) / calculationMetrics.length
      : 0;
    
    const avgRenderTime = renderMetrics.length > 0
      ? renderMetrics.reduce((sum, m) => sum + m.duration, 0) / renderMetrics.length
      : 0;
    
    const slowCalculators = calculationMetrics
      .filter(m => m.duration > this.config.performanceThresholds.calculationTime)
      .map(m => m.label.replace('calculation_', ''));
    
    const recommendations = this.generateRecommendations({
      avgCalculationTime,
      avgRenderTime,
      slowCalculators
    });

    return {
      averageCalculationTime: avgCalculationTime,
      averageRenderTime: avgRenderTime,
      memoryUsage: this.getMemoryUsage(),
      slowCalculators: [...new Set(slowCalculators)],
      recommendations
    };
  }

  private static recordMetric(metric: {
    label: string;
    duration: number;
    memoryDelta: number;
    timestamp: number;
  }): void {
    this.metrics.push({
      calculationTime: metric.label.startsWith('calculation_') ? metric.duration : 0,
      renderTime: metric.label.startsWith('render_') ? metric.duration : 0,
      memoryUsage: metric.memoryDelta,
      bundleSize: 0, // Would be measured separately
      loadTime: 0, // Would be measured separately
      interactionTime: metric.duration
    });

    // Keep only recent metrics (last 100)
    if (this.metrics.length > 100) {
      this.metrics.shift();
    }
  }

  private static suggestOptimizations(
    calculatorId: string,
    metrics: { duration: number; memoryUsage: number }
  ): void {
    const suggestions = [];
    
    if (metrics.duration > 200) {
      suggestions.push('Consider breaking down complex calculations into smaller steps');
      suggestions.push('Implement result caching for expensive operations');
    }
    
    if (metrics.memoryUsage > 10) {
      suggestions.push('Review memory usage and clean up unused variables');
      suggestions.push('Consider using more efficient data structures');
    }
    
    console.group(`Performance Suggestions for ${calculatorId}`);
    suggestions.forEach(suggestion => console.log(`• ${suggestion}`));
    console.groupEnd();
  }

  private static generateRecommendations(data: {
    avgCalculationTime: number;
    avgRenderTime: number;
    slowCalculators: string[];
  }): string[] {
    const recommendations = [];
    
    if (data.avgCalculationTime > this.config.performanceThresholds.calculationTime) {
      recommendations.push('Consider optimizing calculation algorithms');
      recommendations.push('Implement result caching for frequently used calculations');
    }
    
    if (data.avgRenderTime > this.config.performanceThresholds.renderTime) {
      recommendations.push('Optimize React component rendering with memoization');
      recommendations.push('Consider virtualizing large lists');
    }
    
    if (data.slowCalculators.length > 0) {
      recommendations.push(`Focus optimization efforts on: ${data.slowCalculators.join(', ')}`);
    }
    
    if (this.getMemoryUsage() > this.config.performanceThresholds.memoryUsage) {
      recommendations.push('Monitor and reduce memory usage');
      recommendations.push('Implement proper cleanup in useEffect hooks');
    }
    
    return recommendations;
  }

  // Configuration
  static updateConfig(newConfig: Partial<OptimizationConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  static getConfig(): OptimizationConfig {
    return { ...this.config };
  }
}