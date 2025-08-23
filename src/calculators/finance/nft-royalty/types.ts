export interface NFTRoyaltyInputs {
  // Collection Configuration
  collectionSize: number;
  mintPrice: number;
  royaltyPercentage: number;
  
  // Market Data
  averageResalePrice: number;
  monthlyTrades: number;
  floorPrice?: number;
  
  // Marketplace Configuration
  marketplace: 'opensea' | 'blur' | 'looksrare' | 'x2y2' | 'foundation' | 'superrare' | 'rarible' | 'magic-eden' | 'custom';
  customMarketplaceFee?: number;
  
  // Collection Type & Market Factors
  collectionType: 'pfp' | 'art' | 'gaming' | 'utility' | 'music' | 'photography' | 'generative' | 'metaverse' | 'collectibles' | 'custom';
  priceAppreciation?: number;
  
  // Advanced Options
  tradingVolumeGrowth?: number;
  activePeriod?: number;
  
  // Revenue Streams
  includePrimarySales?: boolean;
  includeSecondarySales?: boolean;
  includeUtilityRevenue?: boolean;
  utilityRevenue?: number;
}

export interface NFTRoyaltyOutputs {
  // Basic Royalty Metrics
  royaltyPerSale: number;
  monthlyRoyalties: number;
  yearlyRoyalties: number;
  
  // Long-term Projections
  totalLifetimeRoyalties: number;
  breakEvenMonths: number;
  
  // Marketplace Analysis
  marketplaceComparison: MarketplaceComparison[];
  optimalMarketplace: string;
  
  // Growth Scenarios
  conservativeGrowth: number;
  moderateGrowth: number;
  optimisticGrowth: number;
  
  // Revenue Breakdown
  primarySales: number;
  secondarySales: number;
  totalRevenue: number;
  
  // Performance Metrics
  roi: number;
  efficiencyRating: string;
  riskLevel: string;
  report: string;
}

export interface MarketplaceComparison {
  marketplace: string;
  fee: number;
  netRoyalty: number;
  annualProjection: number;
  marketShare: number;
}

export interface NFTRoyaltyMetrics {
  // Basic Royalty Metrics
  royaltyPerSale: number;
  monthlyRoyalties: number;
  yearlyRoyalties: number;
  
  // Long-term Projections
  totalLifetimeRoyalties: number;
  breakEvenMonths: number;
  
  // Marketplace Analysis
  marketplaceComparison: MarketplaceComparison[];
  optimalMarketplace: string;
  
  // Growth Scenarios
  conservativeGrowth: number;
  moderateGrowth: number;
  optimisticGrowth: number;
  
  // Revenue Breakdown
  primarySales: number;
  secondarySales: number;
  totalRevenue: number;
  
  // Performance Metrics
  roi: number;
  efficiencyRating: string;
  riskLevel: string;
  
  // Internal calculations
  typeMultiplier: number;
  appreciationFactor: number;
  volumeGrowthFactor: number;
  marketplaceFee: number;
  netRoyaltyRate: number;
  tradingVolumeProjection: number;
  utilityRevenueProjection: number;
  totalDevelopmentCosts: number;
  riskScore: number;
  efficiencyScore: number;
  marketVolatility: number;
  competitionFactor: number;
}
