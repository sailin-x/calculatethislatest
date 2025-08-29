export interface PricePerSquareFootInputs {
  // Property Information
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial' | 'industrial' | 'land' | 'mixed_use';
  propertySize: number;
  propertyAge: number;
  numberOfUnits: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  
  // Price Information
  propertyPrice: number;
  listPrice: number;
  salePrice: number;
  assessedValue: number;
  appraisedValue: number;
  
  // Property Features
  propertyCondition: 'excellent' | 'good' | 'average' | 'poor' | 'needs_repair';
  propertyStyle: 'modern' | 'traditional' | 'contemporary' | 'colonial' | 'ranch' | 'other';
  constructionType: 'wood_frame' | 'brick' | 'stone' | 'concrete' | 'steel_frame' | 'mixed';
  roofType: 'asphalt_shingle' | 'metal' | 'tile' | 'slate' | 'wood_shake' | 'flat';
  roofAge: number;
  
  // Location Information
  marketLocation: string;
  neighborhood: string;
  schoolDistrict: string;
  crimeRate: 'low' | 'medium' | 'high' | 'very_high';
  walkScore: number;
  transitScore: number;
  
  // Amenities and Features
  amenities: Array<{
    amenity: string;
    value: number;
    included: boolean;
  }>;
  upgrades: Array<{
    upgrade: string;
    cost: number;
    value: number;
  }>;
  
  // Comparable Properties
  comparableProperties: Array<{
    address: string;
    salePrice: number;
    size: number;
    pricePerSqFt: number;
    saleDate: string;
    condition: string;
    bedrooms: number;
    bathrooms: number;
    age: number;
    distance: number;
  }>;
  
  // Market Information
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  daysOnMarket: number;
  marketInventory: number;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  propertyAppreciationRate: number;
  discountRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface PricePerSquareFootMetrics {
  // Price Per Square Foot Analysis
  pricePerSquareFoot: number;
  listPricePerSquareFoot: number;
  salePricePerSquareFoot: number;
  assessedPricePerSquareFoot: number;
  appraisedPricePerSquareFoot: number;
  
  // Market Analysis
  marketAveragePricePerSqFt: number;
  marketMedianPricePerSqFt: number;
  marketRange: {
    min: number;
    max: number;
    range: number;
  };
  
  // Comparable Analysis
  comparableAveragePricePerSqFt: number;
  comparableMedianPricePerSqFt: number;
  comparableRange: {
    min: number;
    max: number;
    range: number;
  };
  
  // Valuation Analysis
  estimatedValue: number;
  estimatedValueRange: {
    low: number;
    high: number;
    confidence: number;
  };
  valuePerSquareFoot: number;
  
  // Market Position
  marketPosition: 'above_market' | 'at_market' | 'below_market';
  marketPercentile: number;
  priceDifference: number;
  priceDifferencePercentage: number;
  
  // Trend Analysis
  priceTrend: 'increasing' | 'stable' | 'decreasing';
  trendStrength: number;
  projectedValue: number;
  projectedPricePerSqFt: number;
  
  // Sensitivity Analysis
  sensitivityMatrix: Array<{
    variable: string;
    values: number[];
    impacts: number[];
  }>;
  
  // Scenario Analysis
  scenarios: Array<{
    scenario: string;
    probability: number;
    pricePerSqFt: number;
    totalValue: number;
  }>;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    metric: string;
    property: number;
    market: number;
    comparable: number;
    difference: number;
  }>;
  
  // Risk Analysis
  riskScore: number;
  volatility: number;
  probabilityOfAppreciation: number;
  probabilityOfDepreciation: number;
  
  // Market Analysis
  marketAnalysis: Array<{
    factor: string;
    impact: number;
    risk: string;
    opportunity: string;
  }>;
  
  // Performance Benchmarks
  performanceBenchmarks: Array<{
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }>;
}

export interface PricePerSquareFootAnalysis {
  // Executive Summary
  valuationRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  marketPosition: 'Above Market' | 'At Market' | 'Below Market';
  recommendation: 'Buy' | 'Consider' | 'Negotiate' | 'Avoid' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  valueFactors: string[];
  opportunities: string[];
  
  // Price Analysis
  priceSummary: string;
  pricePerSqFtAnalysis: string;
  valueAnalysis: string;
  
  // Market Analysis
  marketSummary: string;
  comparableAnalysis: string;
  marketPosition: string;
  
  // Valuation Analysis
  valuationSummary: string;
  estimatedValueAnalysis: string;
  confidenceAnalysis: string;
  
  // Trend Analysis
  trendSummary: string;
  marketTrendAnalysis: string;
  projectionAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  marketRisk: string;
  valuationRisk: string;
  timingRisk: string;
  
  // Comparable Analysis
  comparableSummary: string;
  adjustmentAnalysis: string;
  comparisonAnalysis: string;
  
  // Recommendations
  valuationRecommendations: string[];
  pricingSuggestions: string[];
  optimizationStrategies: string[];
  
  // Implementation
  implementationPlan: string;
  nextSteps: string[];
  timeline: string;
  
  // Monitoring
  monitoringPlan: string;
  keyMetrics: string[];
  reviewSchedule: string;
  
  // Risk Management
  riskManagement: string;
  mitigationStrategies: string[];
  contingencyPlans: string[];
  
  // Performance Benchmarks
  performanceBenchmarks: Array<{
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }>;
  
  // Decision Support
  decisionRecommendation: string;
  presentationPoints: string[];
  decisionFactors: string[];
}

export interface PricePerSquareFootOutputs {
  // Core Metrics
  pricePerSquareFoot: number;
  marketAveragePricePerSqFt: number;
  marketPosition: string;
  estimatedValue: number;
  valuePerSquareFoot: number;
  marketPercentile: number;
  priceDifference: number;
  riskScore: number;
  
  // Analysis
  analysis: PricePerSquareFootAnalysis;
  
  // Additional Metrics
  listPricePerSquareFoot: number;
  salePricePerSquareFoot: number;
  assessedPricePerSquareFoot: number;
  appraisedPricePerSquareFoot: number;
  marketMedianPricePerSqFt: number;
  marketRange: any;
  comparableAveragePricePerSqFt: number;
  comparableMedianPricePerSqFt: number;
  comparableRange: any;
  estimatedValueRange: any;
  priceDifferencePercentage: number;
  priceTrend: string;
  trendStrength: number;
  projectedValue: number;
  projectedPricePerSqFt: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  comparisonAnalysis: any[];
  volatility: number;
  probabilityOfAppreciation: number;
  probabilityOfDepreciation: number;
  marketAnalysis: any[];
  performanceBenchmarks: any[];
}
