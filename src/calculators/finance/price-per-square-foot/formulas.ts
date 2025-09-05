import { PricePerSquareFootInputs, PricePerSquareFootMetrics } from './types';

export function calculatePricePerSquareFoot(inputs: PricePerSquareFootInputs): PricePerSquareFootMetrics {
  // Calculate price per square foot metrics
  const pricePerSquareFoot = calculatePricePerSquareFootValue(inputs);
  const listPricePerSquareFoot = inputs.listPrice / inputs.propertySize;
  const salePricePerSquareFoot = inputs.salePrice / inputs.propertySize;
  const appraisalPricePerSquareFoot = inputs.appraisalValue / inputs.propertySize;
  const assessedPricePerSquareFoot = inputs.assessedValue / inputs.propertySize;

  // Calculate comparable analysis
  const averageComparablePrice = calculateAverageComparablePrice(inputs);
  const medianComparablePrice = calculateMedianComparablePrice(inputs);
  const comparablePriceRange = calculateComparablePriceRange(inputs);
  const pricePosition = calculatePricePosition(pricePerSquareFoot, averageComparablePrice);
  const pricePercentile = calculatePricePercentile(pricePerSquareFoot, inputs.comparableProperties);

  // Calculate market analysis
  const marketAveragePrice = calculateMarketAveragePrice(inputs);
  const marketMedianPrice = calculateMarketMedianPrice(inputs);
  const marketPriceRange = calculateMarketPriceRange(inputs);
  const marketPosition = calculateMarketPosition(pricePerSquareFoot, marketAveragePrice);

  // Calculate value analysis
  const estimatedValue = calculateEstimatedValue(inputs, averageComparablePrice);
  const valueRange = calculateValueRange(inputs, estimatedValue);
  const overUnderPriced = pricePerSquareFoot - averageComparablePrice;
  const overUnderPricedPercentage = (overUnderPriced / averageComparablePrice) * 100;

  // Generate analysis components
  const priceTrend = generatePriceTrend(inputs);
  const sensitivityMatrix = generateSensitivityMatrix(inputs);
  const scenarios = generateScenarios(inputs);
  const comparisonAnalysis = generateComparisonAnalysis(inputs, pricePerSquareFoot);
  const benchmarkAnalysis = generateBenchmarkAnalysis(inputs, pricePerSquareFoot);

  // Calculate risk analysis
  const riskScore = calculateRiskScore(inputs);
  const priceVolatility = calculatePriceVolatility(inputs);
  const marketRisk = calculateMarketRisk(inputs);
  const valuationRisk = calculateValuationRisk(inputs);

  // Calculate performance metrics
  const pricePerformance = calculatePricePerformance(inputs);
  const marketPerformance = calculateMarketPerformance(inputs);
  const relativePerformance = calculateRelativePerformance(pricePerformance, marketPerformance);

  return {
    // Price Per Square Foot Analysis
    pricePerSquareFoot,
    listPricePerSquareFoot,
    salePricePerSquareFoot,
    appraisalPricePerSquareFoot,
    assessedPricePerSquareFoot,
    
    // Comparable Analysis
    averageComparablePrice,
    medianComparablePrice,
    comparablePriceRange,
    pricePosition,
    pricePercentile,
    
    // Market Analysis
    marketAveragePrice,
    marketMedianPrice,
    marketPriceRange,
    marketPosition,
    
    // Value Analysis
    estimatedValue,
    valueRange,
    overUnderPriced,
    overUnderPricedPercentage,
    
    // Trend Analysis
    priceTrend,
    
    // Analysis Components
    sensitivityMatrix,
    scenarios,
    comparisonAnalysis,
    benchmarkAnalysis,
    
    // Risk Analysis
    riskScore,
    priceVolatility,
    marketRisk,
    valuationRisk,
    
    // Performance Metrics
    pricePerformance,
    marketPerformance,
    relativePerformance
  };
}

function calculatePricePerSquareFootValue(inputs: PricePerSquareFootInputs): number {
  // Use the most relevant price (sale price if available, otherwise list price)
  const price = inputs.salePrice > 0 ? inputs.salePrice : inputs.listPrice;
  return price / inputs.propertySize;
}

function calculateAverageComparablePrice(inputs: PricePerSquareFootInputs): number {
  if (inputs.comparableProperties.length === 0) {
    return inputs.propertyPrice / inputs.propertySize;
  }
  
  const totalPrice = inputs.comparableProperties.reduce((sum, comp) => {
    return sum + (comp.salePrice / comp.size);
  }, 0);
  
  return totalPrice / inputs.comparableProperties.length;
}

function calculateMedianComparablePrice(inputs: PricePerSquareFootInputs): number {
  if (inputs.comparableProperties.length === 0) {
    return inputs.propertyPrice / inputs.propertySize;
  }
  
  const pricesPerSqFt = inputs.comparableProperties.map(comp => comp.salePrice / comp.size);
  pricesPerSqFt.sort((a, b) => a - b);
  
  const mid = Math.floor(pricesPerSqFt.length / 2);
  return pricesPerSqFt.length % 2 === 0 
    ? (pricesPerSqFt[mid - 1] + pricesPerSqFt[mid]) / 2
    : pricesPerSqFt[mid];
}

function calculateComparablePriceRange(inputs: PricePerSquareFootInputs): { min: number; max: number; range: number } {
  if (inputs.comparableProperties.length === 0) {
    const pricePerSqFt = inputs.propertyPrice / inputs.propertySize;
    return { min: pricePerSqFt, max: pricePerSqFt, range: 0 };
  }
  
  const pricesPerSqFt = inputs.comparableProperties.map(comp => comp.salePrice / comp.size);
  const min = Math.min(...pricesPerSqFt);
  const max = Math.max(...pricesPerSqFt);
  const range = max - min;
  
  return { min, max, range };
}

function calculatePricePosition(pricePerSqFt: number, averagePrice: number): number {
  return pricePerSqFt - averagePrice;
}

function calculatePricePercentile(pricePerSqFt: number, comparables: any[]): number {
  if (comparables.length === 0) return 50;
  
  const pricesPerSqFt = comparables.map(comp => comp.salePrice / comp.size);
  pricesPerSqFt.push(pricePerSqFt);
  pricesPerSqFt.sort((a, b) => a - b);
  
  const index = pricesPerSqFt.indexOf(pricePerSqFt);
  return (index / (pricesPerSqFt.length - 1)) * 100;
}

function calculateMarketAveragePrice(inputs: PricePerSquareFootInputs): number {
  // Use comparable properties as market proxy
  if (inputs.comparableProperties.length === 0) {
    return inputs.propertyPrice / inputs.propertySize;
  }
  
  return calculateAverageComparablePrice(inputs);
}

function calculateMarketMedianPrice(inputs: PricePerSquareFootInputs): number {
  // Use comparable properties as market proxy
  if (inputs.comparableProperties.length === 0) {
    return inputs.propertyPrice / inputs.propertySize;
  }
  
  return calculateMedianComparablePrice(inputs);
}

function calculateMarketPriceRange(inputs: PricePerSquareFootInputs): { min: number; max: number; range: number } {
  // Use comparable properties as market proxy
  return calculateComparablePriceRange(inputs);
}

function calculateMarketPosition(pricePerSqFt: number, marketAverage: number): string {
  const difference = ((pricePerSqFt - marketAverage) / marketAverage) * 100;
  
  if (difference > 20) return 'Significantly Above Market';
  if (difference > 10) return 'Above Market';
  if (difference > -10) return 'At Market';
  if (difference > -20) return 'Below Market';
  return 'Significantly Below Market';
}

function calculateEstimatedValue(inputs: PricePerSquareFootInputs, averageComparablePrice: number): number {
  // Use average comparable price as base, adjusted for property features
  let estimatedValue = averageComparablePrice * inputs.propertySize;
  
  // Adjust for property condition
  switch (inputs.propertyCondition) {
    case 'excellent': estimatedValue *= 1.1; break;
    case 'good': estimatedValue *= 1.05; break;
    case 'average': estimatedValue *= 1.0; break;
    case 'poor': estimatedValue *= 0.9; break;
    case 'needs_repair': estimatedValue *= 0.8; break;
  }
  
  // Adjust for amenities
  const amenityValue = inputs.amenities.reduce((sum, amenity) => sum + amenity.value, 0);
  estimatedValue += amenityValue;
  
  return estimatedValue;
}

function calculateValueRange(inputs: PricePerSquareFootInputs, estimatedValue: number): { low: number; high: number; confidence: number } {
  const confidence = 0.85; // 85% confidence
  const margin = estimatedValue * 0.1; // 10% margin
  
  return {
    low: estimatedValue - margin,
    high: estimatedValue + margin,
    confidence
  };
}

function generatePriceTrend(inputs: PricePerSquareFootInputs): any[] {
  // Generate trend data based on market growth rate
  const trend: any[] = [];
  const periods = ['Q1', 'Q2', 'Q3', 'Q4'];
  const basePrice = inputs.propertyPrice / inputs.propertySize;
  
  for (let i = 0; i < 4; i++) {
    const change = inputs.marketGrowthRate * (i + 1) / 4;
    const price = basePrice * (1 + change);
    
    trend.push({
      period: periods[i],
      averagePrice: price,
      medianPrice: price * 0.98,
      change: change * basePrice,
      changePercentage: change * 100
    });
  }
  
  return trend;
}

function generateSensitivityMatrix(inputs: PricePerSquareFootInputs): any[] {
  const basePrice = inputs.propertyPrice / inputs.propertySize;
  
  return [
    {
      variable: 'Property Size',
      values: [inputs.propertySize * 0.9, inputs.propertySize, inputs.propertySize * 1.1],
      impacts: [
        basePrice * 1.1,
        basePrice,
        basePrice * 0.9
      ]
    },
    {
      variable: 'Property Condition',
      values: [0.8, 1.0, 1.2],
      impacts: [
        basePrice * 0.8,
        basePrice,
        basePrice * 1.2
      ]
    },
    {
      variable: 'Market Growth Rate',
      values: [inputs.marketGrowthRate * 0.5, inputs.marketGrowthRate, inputs.marketGrowthRate * 1.5],
      impacts: [
        basePrice * 0.95,
        basePrice,
        basePrice * 1.05
      ]
    }
  ];
}

function generateScenarios(inputs: PricePerSquareFootInputs): any[] {
  const basePrice = inputs.propertyPrice / inputs.propertySize;
  const baseValue = basePrice * inputs.propertySize;
  
  return [
    {
      scenario: 'Conservative',
      probability: 0.3,
      pricePerSquareFoot: basePrice * 0.9,
      totalValue: baseValue * 0.9
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      pricePerSquareFoot: basePrice,
      totalValue: baseValue
    },
    {
      scenario: 'Optimistic',
      probability: 0.2,
      pricePerSquareFoot: basePrice * 1.1,
      totalValue: baseValue * 1.1
    }
  ];
}

function generateComparisonAnalysis(inputs: PricePerSquareFootInputs, pricePerSqFt: number): any[] {
  const averageComparable = calculateAverageComparablePrice(inputs);
  const medianComparable = calculateMedianComparablePrice(inputs);
  const marketAverage = calculateMarketAveragePrice(inputs);
  
  return [
    {
      metric: 'Price Per Square Foot',
      property: pricePerSqFt,
      comparable: averageComparable,
      difference: pricePerSqFt - averageComparable,
      percentage: ((pricePerSqFt - averageComparable) / averageComparable) * 100
    },
    {
      metric: 'Median Comparison',
      property: pricePerSqFt,
      comparable: medianComparable,
      difference: pricePerSqFt - medianComparable,
      percentage: ((pricePerSqFt - medianComparable) / medianComparable) * 100
    },
    {
      metric: 'Market Average',
      property: pricePerSqFt,
      comparable: marketAverage,
      difference: pricePerSqFt - marketAverage,
      percentage: ((pricePerSqFt - marketAverage) / marketAverage) * 100
    }
  ];
}

function generateBenchmarkAnalysis(inputs: PricePerSquareFootInputs, pricePerSqFt: number): any[] {
  const averageComparable = calculateAverageComparablePrice(inputs);
  const marketAverage = calculateMarketAveragePrice(inputs);
  
  return [
    {
      metric: 'Price Per Square Foot',
      property: pricePerSqFt,
      benchmark: averageComparable,
      difference: pricePerSqFt - averageComparable,
      percentile: calculatePricePercentile(pricePerSqFt, inputs.comparableProperties)
    },
    {
      metric: 'Market Position',
      property: pricePerSqFt,
      benchmark: marketAverage,
      difference: pricePerSqFt - marketAverage,
      percentile: calculatePricePercentile(pricePerSqFt, inputs.comparableProperties)
    }
  ];
}

function calculateRiskScore(inputs: PricePerSquareFootInputs): number {
  let riskScore = 0;
  
  // Market risk
  switch (inputs.marketCondition) {
    case 'declining': riskScore += 0.3; break;
    case 'stable': riskScore += 0.1; break;
    case 'growing': riskScore += 0.05; break;
    case 'hot': riskScore += 0.02; break;
  }
  
  // Property condition risk
  switch (inputs.propertyCondition) {
    case 'excellent': riskScore += 0.05; break;
    case 'good': riskScore += 0.1; break;
    case 'average': riskScore += 0.2; break;
    case 'poor': riskScore += 0.3; break;
    case 'needs_repair': riskScore += 0.4; break;
  }
  
  // Location risk
  switch (inputs.crimeRate) {
    case 'low': riskScore += 0.05; break;
    case 'medium': riskScore += 0.15; break;
    case 'high': riskScore += 0.3; break;
  }
  
  // Days on market risk
  if (inputs.daysOnMarket > 90) riskScore += 0.2;
  else if (inputs.daysOnMarket > 60) riskScore += 0.1;
  
  return Math.min(1, riskScore);
}

function calculatePriceVolatility(inputs: PricePerSquareFootInputs): number {
  // Calculate volatility based on comparable price range
  const priceRange = calculateComparablePriceRange(inputs);
  const averagePrice = calculateAverageComparablePrice(inputs);
  
  return priceRange.range / averagePrice;
}

function calculateMarketRisk(inputs: PricePerSquareFootInputs): number {
  let marketRisk = 0;
  
  // Market condition risk
  switch (inputs.marketCondition) {
    case 'declining': marketRisk += 0.4; break;
    case 'stable': marketRisk += 0.1; break;
    case 'growing': marketRisk += 0.05; break;
    case 'hot': marketRisk += 0.02; break;
  }
  
  // Market growth rate risk
  if (inputs.marketGrowthRate < 0) marketRisk += 0.3;
  else if (inputs.marketGrowthRate > 0.1) marketRisk += 0.1;
  
  return Math.min(1, marketRisk);
}

function calculateValuationRisk(inputs: PricePerSquareFootInputs): number {
  let valuationRisk = 0;
  
  // Comparable data quality risk
  if (inputs.comparableProperties.length < 3) valuationRisk += 0.3;
  else if (inputs.comparableProperties.length < 5) valuationRisk += 0.1;
  
  // Property condition risk
  switch (inputs.propertyCondition) {
    case 'poor': valuationRisk += 0.2; break;
    case 'needs_repair': valuationRisk += 0.3; break;
  }
  
  return Math.min(1, valuationRisk);
}

function calculatePricePerformance(inputs: PricePerSquareFootInputs): number {
  // Calculate performance based on market growth rate
  return inputs.marketGrowthRate;
}

function calculateMarketPerformance(inputs: PricePerSquareFootInputs): number {
  // Market performance is the market growth rate
  return inputs.marketGrowthRate;
}

function calculateRelativePerformance(pricePerformance: number, marketPerformance: number): number {
  return pricePerformance - marketPerformance;
}