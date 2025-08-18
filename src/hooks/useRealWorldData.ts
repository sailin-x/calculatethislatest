/**
 * React hook for accessing real-world data in calculators
 * Provides easy access to mortgage rates, regional data, and other external data sources
 */

import { useState, useEffect, useCallback } from 'react';
import { dataService } from '../services/DataService';
import { dataVersioningService } from '../services/DataVersioningService';

export interface UseRealWorldDataOptions {
  sourceId: string;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
  fallbackData?: any;
  onError?: (error: Error) => void;
  onSuccess?: (data: any) => void;
}

export interface UseRealWorldDataResult<T = any> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
  isStale: boolean;
  cacheHit: boolean;
}

/**
 * Hook for accessing real-world data with caching and error handling
 */
export function useRealWorldData<T = any>(options: UseRealWorldDataOptions): UseRealWorldDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isStale, setIsStale] = useState<boolean>(false);
  const [cacheHit, setCacheHit] = useState<boolean>(false);

  const fetchData = useCallback(async (forceRefresh: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const startTime = Date.now();
      const result = await dataService.getData<T>(options.sourceId, forceRefresh);
      const fetchTime = Date.now() - startTime;
      
      // Determine if this was a cache hit (fast response time)
      setCacheHit(fetchTime < 100);
      
      setData(result);
      setLastUpdated(new Date());
      setIsStale(false);
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Unknown error');
      setError(errorObj);
      
      // Try to use fallback data
      if (options.fallbackData) {
        setData(options.fallbackData);
        setLastUpdated(new Date());
      }
      
      if (options.onError) {
        options.onError(errorObj);
      }
    } finally {
      setLoading(false);
    }
  }, [options.sourceId, options.fallbackData, options.onSuccess, options.onError]);

  const refresh = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh setup
  useEffect(() => {
    if (!options.autoRefresh || !options.refreshInterval) {
      return;
    }

    const interval = setInterval(() => {
      fetchData();
    }, options.refreshInterval);

    return () => clearInterval(interval);
  }, [options.autoRefresh, options.refreshInterval, fetchData]);

  // Check for stale data
  useEffect(() => {
    if (!lastUpdated) return;

    const checkStale = () => {
      const now = new Date();
      const ageMinutes = (now.getTime() - lastUpdated.getTime()) / (1000 * 60);
      
      // Consider data stale after different intervals based on source type
      const staleThresholds: Record<string, number> = {
        'mortgage-rates': 60 * 24 * 7, // 1 week
        'market-indices': 60 * 24, // 1 day
        'regional-property-data': 60 * 24 * 30 * 3, // 3 months
        'legal-multipliers': 60 * 24 * 30, // 1 month
        'construction-costs': 60 * 24 * 30, // 1 month
      };

      const threshold = staleThresholds[options.sourceId] || 60 * 24; // Default 1 day
      setIsStale(ageMinutes > threshold);
    };

    checkStale();
    const interval = setInterval(checkStale, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [lastUpdated, options.sourceId]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    isStale,
    cacheHit
  };
}

/**
 * Hook specifically for mortgage rates
 */
export function useMortgageRates() {
  return useRealWorldData<{
    conventional30: number;
    conventional15: number;
    fha30: number;
    va30: number;
    jumbo30: number;
    lastUpdated: Date;
  }>({
    sourceId: 'mortgage-rates',
    autoRefresh: true,
    refreshInterval: 60000 * 60 * 6, // Refresh every 6 hours
    fallbackData: {
      conventional30: 7.25,
      conventional15: 6.75,
      fha30: 7.00,
      va30: 6.95,
      jumbo30: 7.45,
      lastUpdated: new Date()
    }
  });
}

/**
 * Hook for regional property data
 */
export function useRegionalData(region?: string) {
  const result = useRealWorldData<{
    propertyTaxRates: Record<string, number>;
    insuranceRates: Record<string, number>;
  }>({
    sourceId: 'regional-property-data',
    autoRefresh: true,
    refreshInterval: 60000 * 60 * 24, // Refresh daily
    fallbackData: {
      propertyTaxRates: { default: 0.0110 },
      insuranceRates: { default: 0.0040 }
    }
  });

  // Helper functions to get specific regional data
  const getPropertyTaxRate = useCallback((state: string = 'default') => {
    return result.data?.propertyTaxRates?.[state] || result.data?.propertyTaxRates?.default || 0.0110;
  }, [result.data]);

  const getInsuranceRate = useCallback((state: string = 'default') => {
    return result.data?.insuranceRates?.[state] || result.data?.insuranceRates?.default || 0.0040;
  }, [result.data]);

  return {
    ...result,
    getPropertyTaxRate,
    getInsuranceRate
  };
}

/**
 * Hook for legal multipliers
 */
export function useLegalMultipliers(jurisdiction?: string) {
  const result = useRealWorldData<{
    personalInjury: Record<string, { minor: number; moderate: number; severe: number }>;
  }>({
    sourceId: 'legal-multipliers',
    autoRefresh: true,
    refreshInterval: 60000 * 60 * 24 * 7, // Refresh weekly
    fallbackData: {
      personalInjury: {
        default: { minor: 2.3, moderate: 3.8, severe: 6.0 }
      }
    }
  });

  const getMultipliers = useCallback((state: string = 'default', injuryType: string = 'personalInjury') => {
    const multipliers = result.data?.[injuryType as keyof typeof result.data];
    return multipliers?.[state] || multipliers?.default || { minor: 2.3, moderate: 3.8, severe: 6.0 };
  }, [result.data]);

  return {
    ...result,
    getMultipliers
  };
}

/**
 * Hook for market data
 */
export function useMarketData() {
  return useRealWorldData<{
    sp500: number;
    nasdaq: number;
    dow: number;
    vix: number;
    tenYearTreasury: number;
    inflationRate: number;
  }>({
    sourceId: 'market-indices',
    autoRefresh: true,
    refreshInterval: 60000 * 15, // Refresh every 15 minutes during market hours
    fallbackData: {
      sp500: 4500,
      nasdaq: 14000,
      dow: 35000,
      vix: 18.5,
      tenYearTreasury: 4.25,
      inflationRate: 3.2
    }
  });
}

/**
 * Hook for construction costs
 */
export function useConstructionCosts() {
  const result = useRealWorldData<{
    concrete: Record<string, number>;
    steel: Record<string, number>;
    lumber: Record<string, number>;
  }>({
    sourceId: 'construction-costs',
    autoRefresh: true,
    refreshInterval: 60000 * 60 * 24, // Refresh daily
    fallbackData: {
      concrete: { default: 110 },
      steel: { default: 825 },
      lumber: { default: 625 }
    }
  });

  const getMaterialCost = useCallback((material: string, region: string = 'default') => {
    const materialData = result.data?.[material as keyof typeof result.data];
    return materialData?.[region] || materialData?.default || 0;
  }, [result.data]);

  return {
    ...result,
    getMaterialCost
  };
}

/**
 * Hook for historical data at a specific timestamp
 */
export function useHistoricalData<T = any>(sourceId: string, timestamp: Date): UseRealWorldDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true);
        setError(null);

        const version = dataVersioningService.getDataAtTimestamp(sourceId, timestamp);
        if (version) {
          setData(version.data as T);
        } else {
          throw new Error(`No historical data found for ${sourceId} at ${timestamp.toISOString()}`);
        }
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error('Unknown error');
        setError(errorObj);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [sourceId, timestamp]);

  return {
    data,
    loading,
    error,
    lastUpdated: timestamp,
    refresh: async () => {}, // No refresh for historical data
    isStale: false, // Historical data is never stale
    cacheHit: true // Historical data is always from cache/storage
  };
}

/**
 * Hook for tracking calculation with data versions
 */
export function useCalculationTracking(calculatorId: string) {
  const trackCalculation = useCallback(async (
    inputs: Record<string, any>,
    outputs: Record<string, any>,
    dataVersions: Record<string, string>
  ) => {
    try {
      const calculationId = dataVersioningService.storeCalculation(
        calculatorId,
        inputs,
        outputs,
        dataVersions
      );
      return calculationId;
    } catch (error) {
      console.error('Failed to track calculation:', error);
      return null;
    }
  }, [calculatorId]);

  const getCalculationHistory = useCallback((limit: number = 50) => {
    return dataVersioningService.getCalculationHistory(calculatorId, limit);
  }, [calculatorId]);

  return {
    trackCalculation,
    getCalculationHistory
  };
}