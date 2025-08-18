/**
 * Central data service for managing external data sources and real-world data integration
 * Handles mortgage rates, regional data, legal multipliers, and other dynamic data
 */

export interface DataSource {
  id: string;
  name: string;
  url: string;
  updateFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  lastUpdated: Date;
  version: string;
  isActive: boolean;
}

export interface CachedData<T = any> {
  data: T;
  timestamp: Date;
  version: string;
  expiresAt: Date;
  source: string;
}

export interface DataValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class DataService {
  private cache: Map<string, CachedData> = new Map();
  private dataSources: Map<string, DataSource> = new Map();
  private fallbackData: Map<string, any> = new Map();
  
  constructor() {
    this.initializeDataSources();
    this.loadFallbackData();
  }

  /**
   * Initialize all data sources
   */
  private initializeDataSources(): void {
    const sources: DataSource[] = [
      {
        id: 'mortgage-rates',
        name: 'Current Mortgage Rates',
        url: 'https://api.freddiemac.com/v1/data/PMMS',
        updateFrequency: 'weekly',
        lastUpdated: new Date(),
        version: '1.0',
        isActive: true
      },
      {
        id: 'regional-property-data',
        name: 'Regional Property Tax and Insurance Data',
        url: 'https://api.census.gov/data/2021/acs/acs5',
        updateFrequency: 'quarterly',
        lastUpdated: new Date(),
        version: '1.0',
        isActive: true
      },
      {
        id: 'legal-multipliers',
        name: 'Legal Settlement Multipliers by Jurisdiction',
        url: 'https://api.legal-data.com/v1/multipliers',
        updateFrequency: 'monthly',
        lastUpdated: new Date(),
        version: '1.0',
        isActive: true
      },
      {
        id: 'market-indices',
        name: 'Stock Market Indices and Economic Data',
        url: 'https://api.marketdata.com/v1/indices',
        updateFrequency: 'daily',
        lastUpdated: new Date(),
        version: '1.0',
        isActive: true
      },
      {
        id: 'construction-costs',
        name: 'Construction Material Costs by Region',
        url: 'https://api.construction-data.com/v1/costs',
        updateFrequency: 'monthly',
        lastUpdated: new Date(),
        version: '1.0',
        isActive: true
      }
    ];

    sources.forEach(source => {
      this.dataSources.set(source.id, source);
    });
  }

  /**
   * Load fallback data for when external sources are unavailable
   */
  private loadFallbackData(): void {
    // Mortgage rates fallback data
    this.fallbackData.set('mortgage-rates', {
      conventional30: 7.25,
      conventional15: 6.75,
      fha30: 7.00,
      va30: 6.95,
      jumbo30: 7.45,
      lastUpdated: new Date('2024-01-01')
    });

    // Regional property data fallback
    this.fallbackData.set('regional-property-data', {
      propertyTaxRates: {
        'CA': 0.0075,
        'TX': 0.0181,
        'FL': 0.0098,
        'NY': 0.0124,
        'default': 0.0110
      },
      insuranceRates: {
        'CA': 0.0035,
        'TX': 0.0045,
        'FL': 0.0065,
        'NY': 0.0040,
        'default': 0.0040
      }
    });

    // Legal multipliers fallback
    this.fallbackData.set('legal-multipliers', {
      personalInjury: {
        'CA': { minor: 2.5, moderate: 4.0, severe: 6.5 },
        'TX': { minor: 2.0, moderate: 3.5, severe: 5.5 },
        'FL': { minor: 2.2, moderate: 3.8, severe: 6.0 },
        'NY': { minor: 2.8, moderate: 4.5, severe: 7.0 },
        'default': { minor: 2.3, moderate: 3.8, severe: 6.0 }
      }
    });

    // Market indices fallback
    this.fallbackData.set('market-indices', {
      sp500: 4500,
      nasdaq: 14000,
      dow: 35000,
      vix: 18.5,
      tenYearTreasury: 4.25,
      inflationRate: 3.2
    });

    // Construction costs fallback
    this.fallbackData.set('construction-costs', {
      concrete: {
        'CA': 120,
        'TX': 95,
        'FL': 105,
        'NY': 135,
        'default': 110
      },
      steel: {
        'CA': 850,
        'TX': 780,
        'FL': 820,
        'NY': 920,
        'default': 825
      },
      lumber: {
        'CA': 650,
        'TX': 580,
        'FL': 620,
        'NY': 720,
        'default': 625
      }
    });
  }

  /**
   * Get data from cache or fetch from source
   */
  async getData<T>(sourceId: string, forceRefresh: boolean = false): Promise<T> {
    const cacheKey = sourceId;
    const cachedData = this.cache.get(cacheKey);
    
    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && cachedData && cachedData.expiresAt > new Date()) {
      return cachedData.data as T;
    }

    try {
      // Attempt to fetch fresh data
      const freshData = await this.fetchFromSource<T>(sourceId);
      
      // Cache the fresh data
      this.cacheData(cacheKey, freshData, sourceId);
      
      return freshData;
    } catch (error) {
      console.warn(`Failed to fetch data from ${sourceId}, using fallback:`, error);
      
      // Return cached data if available, even if expired
      if (cachedData) {
        return cachedData.data as T;
      }
      
      // Return fallback data as last resort
      const fallback = this.fallbackData.get(sourceId);
      if (fallback) {
        return fallback as T;
      }
      
      throw new Error(`No data available for source: ${sourceId}`);
    }
  }

  /**
   * Fetch data from external source
   */
  private async fetchFromSource<T>(sourceId: string): Promise<T> {
    const source = this.dataSources.get(sourceId);
    if (!source || !source.isActive) {
      throw new Error(`Data source not found or inactive: ${sourceId}`);
    }

    // In a real implementation, this would make actual HTTP requests
    // For now, we'll simulate the API calls and return mock data
    return this.simulateApiCall<T>(sourceId);
  }

  /**
   * Simulate API calls for different data sources
   */
  private async simulateApiCall<T>(sourceId: string): Promise<T> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    
    // Simulate occasional failures
    if (Math.random() < 0.1) {
      throw new Error(`Simulated API failure for ${sourceId}`);
    }

    // Return simulated fresh data based on source type
    switch (sourceId) {
      case 'mortgage-rates':
        return {
          conventional30: 7.25 + (Math.random() - 0.5) * 0.5,
          conventional15: 6.75 + (Math.random() - 0.5) * 0.5,
          fha30: 7.00 + (Math.random() - 0.5) * 0.4,
          va30: 6.95 + (Math.random() - 0.5) * 0.4,
          jumbo30: 7.45 + (Math.random() - 0.5) * 0.6,
          lastUpdated: new Date()
        } as T;

      case 'regional-property-data':
        return {
          propertyTaxRates: {
            'CA': 0.0075 + (Math.random() - 0.5) * 0.001,
            'TX': 0.0181 + (Math.random() - 0.5) * 0.002,
            'FL': 0.0098 + (Math.random() - 0.5) * 0.001,
            'NY': 0.0124 + (Math.random() - 0.5) * 0.001,
            'default': 0.0110 + (Math.random() - 0.5) * 0.001
          },
          insuranceRates: {
            'CA': 0.0035 + (Math.random() - 0.5) * 0.0005,
            'TX': 0.0045 + (Math.random() - 0.5) * 0.0005,
            'FL': 0.0065 + (Math.random() - 0.5) * 0.001,
            'NY': 0.0040 + (Math.random() - 0.5) * 0.0005,
            'default': 0.0040 + (Math.random() - 0.5) * 0.0005
          }
        } as T;

      case 'market-indices':
        return {
          sp500: 4500 + (Math.random() - 0.5) * 200,
          nasdaq: 14000 + (Math.random() - 0.5) * 800,
          dow: 35000 + (Math.random() - 0.5) * 1500,
          vix: 18.5 + (Math.random() - 0.5) * 5,
          tenYearTreasury: 4.25 + (Math.random() - 0.5) * 0.5,
          inflationRate: 3.2 + (Math.random() - 0.5) * 0.8
        } as T;

      default:
        throw new Error(`Unknown data source: ${sourceId}`);
    }
  }

  /**
   * Cache data with expiration
   */
  private cacheData(key: string, data: any, sourceId: string): void {
    const source = this.dataSources.get(sourceId);
    if (!source) return;

    const expirationHours = this.getExpirationHours(source.updateFrequency);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expirationHours);

    const cachedData: CachedData = {
      data,
      timestamp: new Date(),
      version: source.version,
      expiresAt,
      source: sourceId
    };

    this.cache.set(key, cachedData);
  }

  /**
   * Get cache expiration hours based on update frequency
   */
  private getExpirationHours(frequency: string): number {
    switch (frequency) {
      case 'daily': return 24;
      case 'weekly': return 168; // 7 days
      case 'monthly': return 720; // 30 days
      case 'quarterly': return 2160; // 90 days
      default: return 24;
    }
  }

  /**
   * Validate data integrity
   */
  validateData(sourceId: string, data: any): DataValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    switch (sourceId) {
      case 'mortgage-rates':
        if (!data.conventional30 || data.conventional30 < 1 || data.conventional30 > 20) {
          errors.push('Invalid conventional 30-year rate');
        }
        if (!data.conventional15 || data.conventional15 < 1 || data.conventional15 > 20) {
          errors.push('Invalid conventional 15-year rate');
        }
        if (data.conventional15 > data.conventional30) {
          warnings.push('15-year rate higher than 30-year rate (unusual)');
        }
        break;

      case 'regional-property-data':
        if (!data.propertyTaxRates || typeof data.propertyTaxRates !== 'object') {
          errors.push('Missing or invalid property tax rates');
        }
        if (!data.insuranceRates || typeof data.insuranceRates !== 'object') {
          errors.push('Missing or invalid insurance rates');
        }
        break;

      case 'legal-multipliers':
        if (!data.personalInjury || typeof data.personalInjury !== 'object') {
          errors.push('Missing or invalid personal injury multipliers');
        }
        break;
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Get specific regional data
   */
  async getRegionalData(dataType: string, region: string): Promise<number> {
    try {
      const data = await this.getData('regional-property-data');
      const regionalData = data[dataType];
      
      if (regionalData && regionalData[region] !== undefined) {
        return regionalData[region];
      }
      
      // Return default if region not found
      return regionalData?.default || 0;
    } catch (error) {
      console.warn(`Failed to get regional data for ${dataType} in ${region}:`, error);
      return 0;
    }
  }

  /**
   * Get current mortgage rates
   */
  async getMortgageRates(): Promise<{
    conventional30: number;
    conventional15: number;
    fha30: number;
    va30: number;
    jumbo30: number;
    lastUpdated: Date;
  }> {
    return this.getData('mortgage-rates');
  }

  /**
   * Get legal multipliers for jurisdiction
   */
  async getLegalMultipliers(jurisdiction: string, injuryType: string = 'personalInjury'): Promise<{
    minor: number;
    moderate: number;
    severe: number;
  }> {
    try {
      const data = await this.getData('legal-multipliers');
      const multipliers = data[injuryType];
      
      if (multipliers && multipliers[jurisdiction]) {
        return multipliers[jurisdiction];
      }
      
      return multipliers?.default || { minor: 2.3, moderate: 3.8, severe: 6.0 };
    } catch (error) {
      console.warn(`Failed to get legal multipliers for ${jurisdiction}:`, error);
      return { minor: 2.3, moderate: 3.8, severe: 6.0 };
    }
  }

  /**
   * Get market data
   */
  async getMarketData(): Promise<{
    sp500: number;
    nasdaq: number;
    dow: number;
    vix: number;
    tenYearTreasury: number;
    inflationRate: number;
  }> {
    return this.getData('market-indices');
  }

  /**
   * Force refresh all data sources
   */
  async refreshAllData(): Promise<void> {
    const refreshPromises = Array.from(this.dataSources.keys()).map(sourceId =>
      this.getData(sourceId, true).catch(error => 
        console.warn(`Failed to refresh ${sourceId}:`, error)
      )
    );

    await Promise.allSettled(refreshPromises);
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    totalEntries: number;
    expiredEntries: number;
    hitRate: number;
    lastUpdated: Date | null;
  } {
    const now = new Date();
    let expiredCount = 0;
    let lastUpdated: Date | null = null;

    for (const [, cachedData] of this.cache) {
      if (cachedData.expiresAt < now) {
        expiredCount++;
      }
      if (!lastUpdated || cachedData.timestamp > lastUpdated) {
        lastUpdated = cachedData.timestamp;
      }
    }

    return {
      totalEntries: this.cache.size,
      expiredEntries: expiredCount,
      hitRate: this.cache.size > 0 ? (this.cache.size - expiredCount) / this.cache.size : 0,
      lastUpdated
    };
  }

  /**
   * Clear expired cache entries
   */
  clearExpiredCache(): number {
    const now = new Date();
    let clearedCount = 0;

    for (const [key, cachedData] of this.cache) {
      if (cachedData.expiresAt < now) {
        this.cache.delete(key);
        clearedCount++;
      }
    }

    return clearedCount;
  }
}

// Export singleton instance
export const dataService = new DataService();