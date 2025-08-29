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
  appraisalValue: number;
  assessedValue: number;
  
  // Comparable Properties
  comparableProperties: Array<{
    address: string;
    salePrice: number;
    size: number;
    age: number;
    bedrooms: number;
    bathrooms: number;
    saleDate: string;
    condition: string;
    location: string;
    adjustments: number;
  }>;
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  daysOnMarket: number;
  
  // Property Features
  propertyCondition: 'excellent' | 'good' | 'average' | 'poor' | 'needs_repair';
  propertyStyle: 'modern' | 'traditional' | 'contemporary' | 'colonial' | 'ranch' | 'other';
  lotSize: number;
  garageSpaces: number;
  parkingSpaces: number;
  
  // Amenities and Features
  amenities: Array<{
    amenity: string;
    value: number;
    included: boolean;
  }>;
  
  // Location Factors
  schoolDistrict: string;
  schoolRating: number;
  crimeRate: 'low' | 'medium' | 'high';
  walkScore: number;
  transitScore: number;
  bikeScore: number;
  
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
  appraisalPricePerSquareFoot: number;
  assessedPricePerSquareFoot: number;
  
  // Comparable Analysis
  averageComparablePrice: number;
  medianComparablePrice: number;
  comparablePriceRange: {
    min: number;
    max: number;
    range: number;
  };
  pricePosition: number;
  pricePercentile: number;
  
  // Market Analysis
  marketAveragePrice: number;
  marketMedianPrice: number;
  marketPriceRange: {
    min: number;
    max: number;
    range: number;
  };
  marketPosition: string;
  
  // Value Analysis
  estimatedValue: number;
  valueRange: {
    low: number;
    high: number;
    confidence: number;
  };
  overUnderPriced: number;
  overUnderPricedPercentage: number;
  
  // Trend Analysis
  priceTrend: Array<{
    period: string;
    averagePrice: number;
    medianPrice: number;
    change: number;
    changePercentage: number;
  }>;
  
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
    pricePerSquareFoot: number;
    totalValue: number;
  }>;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    metric: string;
    property: number;
    comparable: number;
    difference: number;
    percentage: number;
  }>;
  
  // Risk Analysis
  riskScore: number;
  priceVolatility: number;
  marketRisk: number;
  valuationRisk: number;
  
  // Performance Metrics
  pricePerformance: number;
  marketPerformance: number;
  relativePerformance: number;
  
  // Benchmark Analysis
  benchmarkAnalysis: Array<{
    metric: string;
    property: number;
    benchmark: number;
    difference: number;
    percentile: number;
  }>;
}

export interface PricePerSquareFootAnalysis {
  // Executive Summary
  priceRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  valueRating: 'High Value' | 'Good Value' | 'Fair Value' | 'Low Value' | 'Overpriced';
  recommendation: 'Buy' | 'Consider' | 'Negotiate' | 'Avoid' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  valueFactors: string[];
  opportunities: string[];
  
  // Price Analysis
  priceSummary: string;
  comparableAnalysis: string;
  marketAnalysis: string;
  
  // Value Analysis
  valueSummary: string;
  valuationAnalysis: string;
  pricePosition: string;
  
  // Market Analysis
  marketSummary: string;
  trendAnalysis: string;
  competitiveAnalysis: string;
  
  // Location Analysis
  locationSummary: string;
  neighborhoodAnalysis: string;
  amenityAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  priceRisk: string;
  marketRisk: string;
  locationRisk: string;
  
  // Performance Analysis
  performanceSummary: string;
  trendPerformance: string;
  relativePerformance: string;
  
  // Recommendations
  pricingRecommendations: string[];
  negotiationSuggestions: string[];
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
  averageComparablePrice: number;
  medianComparablePrice: number;
  estimatedValue: number;
  overUnderPricedPercentage: number;
  pricePosition: string;
  riskScore: number;
  pricePerformance: number;
  
  // Analysis
  analysis: PricePerSquareFootAnalysis;
  
  // Additional Metrics
  listPricePerSquareFoot: number;
  salePricePerSquareFoot: number;
  appraisalPricePerSquareFoot: number;
  assessedPricePerSquareFoot: number;
  comparablePriceRange: any;
  pricePercentile: number;
  marketAveragePrice: number;
  marketMedianPrice: number;
  marketPriceRange: any;
  valueRange: any;
  overUnderPriced: number;
  priceTrend: any[];
  sensitivityMatrix: any[];
  scenarios: any[];
  comparisonAnalysis: any[];
  priceVolatility: number;
  marketRisk: number;
  valuationRisk: number;
  marketPerformance: number;
  relativePerformance: number;
  benchmarkAnalysis: any[];
}
