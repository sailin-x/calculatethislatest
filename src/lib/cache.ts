/**
 * Advanced caching and memoization utilities for performance optimization
 */

interface CacheEntry<T> {
  value: T;
  timestamp: number;
  hits: number;
  lastAccessed: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries
  strategy?: 'lru' | 'lfu' | 'fifo'; // Cache eviction strategy
}

/**
 * Generic cache implementation with multiple eviction strategies
 */
export class Cache<T = any> {
  private cache = new Map<string, CacheEntry<T>>();
  private options: Required<CacheOptions>;

  constructor(options: CacheOptions = {}) {
    this.options = {
      ttl: options.ttl || 5 * 60 * 1000, // 5 minutes default
      maxSize: options.maxSize || 1000,
      strategy: options.strategy || 'lru'
    };
  }

  /**
   * Get a value from cache
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.options.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    // Update access statistics
    entry.hits++;
    entry.lastAccessed = Date.now();

    return entry.value;
  }

  /**
   * Set a value in cache
   */
  set(key: string, value: T): void {
    // Evict entries if cache is full
    if (this.cache.size >= this.options.maxSize) {
      this.evict();
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      hits: 0,
      lastAccessed: Date.now()
    });
  }

  /**
   * Check if key exists in cache
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    // Check expiration
    if (Date.now() - entry.timestamp > this.options.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Delete a key from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
    totalHits: number;
    totalMisses: number;
  } {
    let totalHits = 0;
    let totalAccesses = 0;

    for (const entry of this.cache.values()) {
      totalHits += entry.hits;
      totalAccesses += entry.hits + 1; // +1 for the current access
    }

    return {
      size: this.cache.size,
      maxSize: this.options.maxSize,
      hitRate: totalAccesses > 0 ? totalHits / totalAccesses : 0,
      totalHits,
      totalMisses: totalAccesses - totalHits
    };
  }

  /**
   * Evict entries based on strategy
   */
  private evict(): void {
    if (this.cache.size === 0) return;

    let keyToEvict: string | undefined;

    switch (this.options.strategy) {
      case 'lru':
        // Least Recently Used
        let oldestAccess = Date.now();
        for (const [key, entry] of this.cache.entries()) {
          if (entry.lastAccessed < oldestAccess) {
            oldestAccess = entry.lastAccessed;
            keyToEvict = key;
          }
        }
        break;

      case 'lfu':
        // Least Frequently Used
        let leastHits = Infinity;
        for (const [key, entry] of this.cache.entries()) {
          if (entry.hits < leastHits) {
            leastHits = entry.hits;
            keyToEvict = key;
          }
        }
        break;

      case 'fifo':
        // First In, First Out
        keyToEvict = this.cache.keys().next().value;
        break;
    }

    if (keyToEvict) {
      this.cache.delete(keyToEvict);
    }
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.options.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

/**
 * Memoization decorator for functions
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: CacheOptions = {}
): T {
  const cache = new Cache(options);

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    let result = cache.get(key);
    if (result !== undefined) {
      return result;
    }

    result = fn(...args);
    cache.set(key, result);

    return result;
  }) as T;
}

/**
 * Memoization with custom key generator
 */
export function memoizeWithKey<T extends (...args: any[]) => any>(
  fn: T,
  keyGenerator: (...args: Parameters<T>) => string,
  options: CacheOptions = {}
): T {
  const cache = new Cache(options);

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyGenerator(...args);

    let result = cache.get(key);
    if (result !== undefined) {
      return result;
    }

    result = fn(...args);
    cache.set(key, result);

    return result;
  }) as T;
}

/**
 * Specialized cache for calculation results
 */
export class CalculationCache {
  private cache = new Cache<any>({
    ttl: 10 * 60 * 1000, // 10 minutes
    maxSize: 500,
    strategy: 'lru'
  });

  /**
   * Generate cache key for mortgage calculations
   */
  private getMortgageKey(
    principal: number,
    rate: number,
    term: number,
    extraParams?: Record<string, any>
  ): string {
    return `mortgage:${principal}:${rate}:${term}:${JSON.stringify(extraParams || {})}`;
  }

  /**
   * Get cached mortgage payment
   */
  getMortgagePayment(
    principal: number,
    rate: number,
    term: number
  ): number | undefined {
    const key = this.getMortgageKey(principal, rate, term);
    return this.cache.get(key);
  }

  /**
   * Set cached mortgage payment
   */
  setMortgagePayment(
    principal: number,
    rate: number,
    term: number,
    payment: number
  ): void {
    const key = this.getMortgageKey(principal, rate, term);
    this.cache.set(key, payment);
  }

  /**
   * Get cached amortization schedule
   */
  getAmortizationSchedule(
    principal: number,
    rate: number,
    term: number,
    extraPayment?: number
  ): any[] | undefined {
    const key = this.getMortgageKey(principal, rate, term, { extraPayment });
    return this.cache.get(key);
  }

  /**
   * Set cached amortization schedule
   */
  setAmortizationSchedule(
    principal: number,
    rate: number,
    term: number,
    schedule: any[],
    extraPayment?: number
  ): void {
    const key = this.getMortgageKey(principal, rate, term, { extraPayment });
    this.cache.set(key, schedule);
  }

  /**
   * Clear all cached calculations
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache performance statistics
   */
  getStats() {
    return this.cache.getStats();
  }
}

/**
 * Global calculation cache instance
 */
export const calculationCache = new CalculationCache();

/**
 * Performance monitoring for cached operations
 */
export class CacheMonitor {
  private static instance: CacheMonitor;
  private metrics = new Map<string, {
    hits: number;
    misses: number;
    avgResponseTime: number;
    lastUsed: number;
  }>();

  static getInstance(): CacheMonitor {
    if (!CacheMonitor.instance) {
      CacheMonitor.instance = new CacheMonitor();
    }
    return CacheMonitor.instance;
  }

  /**
   * Record cache operation
   */
  record(operation: string, hit: boolean, responseTime: number): void {
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, {
        hits: 0,
        misses: 0,
        avgResponseTime: 0,
        lastUsed: Date.now()
      });
    }

    const metric = this.metrics.get(operation)!;

    if (hit) {
      metric.hits++;
    } else {
      metric.misses++;
    }

    // Update rolling average response time
    const totalRequests = metric.hits + metric.misses;
    metric.avgResponseTime = (metric.avgResponseTime * (totalRequests - 1) + responseTime) / totalRequests;
    metric.lastUsed = Date.now();
  }

  /**
   * Get performance metrics
   */
  getMetrics(): Record<string, any> {
    const result: Record<string, any> = {};

    for (const [operation, metric] of this.metrics.entries()) {
      const total = metric.hits + metric.misses;
      result[operation] = {
        hitRate: total > 0 ? metric.hits / total : 0,
        totalRequests: total,
        avgResponseTime: metric.avgResponseTime,
        lastUsed: new Date(metric.lastUsed).toISOString()
      };
    }

    return result;
  }

  /**
   * Reset metrics
   */
  reset(): void {
    this.metrics.clear();
  }
}

/**
 * Timed cache operation wrapper
 */
export function withCacheTiming<T>(
  operation: string,
  fn: () => T
): T {
  const startTime = performance.now();
  const monitor = CacheMonitor.getInstance();

  try {
    const result = fn();
    const responseTime = performance.now() - startTime;
    monitor.record(operation, true, responseTime);
    return result;
  } catch (error) {
    const responseTime = performance.now() - startTime;
    monitor.record(operation, false, responseTime);
    throw error;
  }
}