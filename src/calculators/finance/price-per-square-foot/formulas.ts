import { PricePerSquareFootInputs, PricePerSquareFootMetrics, PricePerSquareFootAnalysis } from './types';

export function calculatePricePerSquareFoot(inputs: PricePerSquareFootInputs): number {
  return inputs.propertySize > 0 ? inputs.propertyPrice / inputs.propertySize : 0;
}

export function calculateListPricePerSquareFoot(inputs: PricePerSquareFootInputs): number {
  return inputs.propertySize > 0 ? inputs.listPrice / inputs.propertySize : 0;
}

export function calculateSalePricePerSquareFoot(inputs: PricePerSquareFootInputs): number {
  return inputs.propertySize > 0 ? inputs.salePrice / inputs.propertySize : 0;
}

export function calculateAppraisalPricePerSquareFoot(inputs: PricePerSquareFootInputs): number {
  return inputs.propertySize > 0 ? inputs.appraisalValue / inputs.propertySize : 0;
}

export function calculateAssessedPricePerSquareFoot(inputs: PricePerSquareFootInputs): number {
  return inputs.propertySize > 0 ? inputs.assessedValue / inputs.propertySize : 0;
}

export function calculateAverageComparablePrice(inputs: PricePerSquareFootInputs): number {
  if (inputs.comparableProperties.length === 0) return 0;

  const total = inputs.comparableProperties.reduce((sum, comp) => {
    const adjustedPrice = comp.salePrice + comp.adjustments;
    return sum + (comp.size > 0 ? adjustedPrice / comp.size : 0);
  }, 0);

  return total / inputs.comparableProperties.length;
}

export function calculateMedianComparablePrice(inputs: PricePerSquareFootInputs): number {
  if (inputs.comparableProperties.length === 0) return 0;

  const prices = inputs.comparableProperties
    .map(comp => comp.size > 0 ? (comp.salePrice + comp.adjustments) / comp.size : 0)
    .sort((a, b) => a - b);

  const mid = Math.floor(prices.length / 2);
  return prices.length % 2 === 0 ? (prices[mid - 1] + prices[mid]) / 2 : prices[mid];
}

export function calculateComparablePriceRange(inputs: PricePerSquareFootInputs): {
  min: number;
  max: number;
  range: number;
} {
  if (inputs.comparableProperties.length === 0) {
    return { min: 0, max: 0, range: 0 };
  }

  const prices = inputs.comparableProperties
    .map(comp => comp.size > 0 ? (comp.salePrice + comp.adjustments) / comp.size : 0);

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return { min, max, range: max - min };
}

export function calculatePricePosition(inputs: PricePerSquareFootInputs): number {
  const propertyPrice = calculatePricePerSquareFoot(inputs);
  const averageComparable = calculateAverageComparablePrice(inputs);

  return averageComparable > 0 ? (propertyPrice / averageComparable) * 100 : 0;
}

export function calculatePricePercentile(inputs: PricePerSquareFootInputs): number {
  const propertyPrice = calculatePricePerSquareFoot(inputs);
  const prices = inputs.comparableProperties
    .map(comp => comp.size > 0 ? (comp.salePrice + comp.adjustments) / comp.size : 0)
    .sort((a, b) => a - b);

  let count = 0;
  for (const price of prices) {
    if (propertyPrice >= price) count++;
  }

  return prices.length > 0 ? (count / prices.length) * 100 : 0;
}

export function calculateMarketAveragePrice(inputs: PricePerSquareFootInputs): number {
  // Simplified market average - in real implementation would use market data
  return calculateAverageComparablePrice(inputs) * 1.05; // 5% premium for market
}

export function calculateMarketMedianPrice(inputs: PricePerSquareFootInputs): number {
  return calculateMedianComparablePrice(inputs) * 1.03; // 3% premium for market
}

export function calculateMarketPriceRange(inputs: PricePerSquareFootInputs): {
  min: number;
  max: number;
  range: number;
} {
  const comparableRange = calculateComparablePriceRange(inputs);
  return {
    min: comparableRange.min * 0.95,
    max: comparableRange.max * 1.1,
    range: (comparableRange.max * 1.1) - (comparableRange.min * 0.95)
  };
}

export function calculateMarketPosition(inputs: PricePerSquareFootInputs): string {
  const propertyPrice = calculatePricePerSquareFoot(inputs);
  const marketAverage = calculateMarketAveragePrice(inputs);

  if (propertyPrice > marketAverage * 1.1) return 'Above Market';
  if (propertyPrice > marketAverage * 0.9) return 'At Market';
  return 'Below Market';
}

export function calculateEstimatedValue(inputs: PricePerSquareFootInputs): number {
  const averageComparable = calculateAverageComparablePrice(inputs);
  return averageComparable * inputs.propertySize;
}

export function calculateValueRange(inputs: PricePerSquareFootInputs): {
  low: number;
  high: number;
  confidence: number;
} {
  const estimatedValue = calculateEstimatedValue(inputs);
  const range = calculateComparablePriceRange(inputs);

  return {
    low: Math.max(0, estimatedValue - (range.range * inputs.propertySize * 0.5)),
    high: estimatedValue + (range.range * inputs.propertySize * 0.5),
    confidence: Math.max(0, 100 - (inputs.comparableProperties.length < 3 ? 20 : 0))
  };
}

export function calculateOverUnderPriced(inputs: PricePerSquareFootInputs): number {
  const propertyPrice = inputs.propertyPrice;
  const estimatedValue = calculateEstimatedValue(inputs);

  return propertyPrice - estimatedValue;
}

export function calculateOverUnderPricedPercentage(inputs: PricePerSquareFootInputs): number {
  const estimatedValue = calculateEstimatedValue(inputs);
  const difference = calculateOverUnderPriced(inputs);

  return estimatedValue > 0 ? (difference / estimatedValue) * 100 : 0;
}

export function calculatePriceTrend(inputs: PricePerSquareFootInputs): Array<{
  period: string;
  averagePrice: number;
  medianPrice: number;
  change: number;
  changePercentage: number;
}> {
  const trend = [];
  const basePrice = calculateAverageComparablePrice(inputs);

  for (let i = 1; i <= inputs.analysisPeriod; i++) {
    const periodPrice = basePrice * Math.pow(1 + inputs.propertyAppreciationRate / 100, i);
    const previousPrice = i > 1 ? trend[i - 2].averagePrice : basePrice;
    const change = periodPrice - previousPrice;
    const changePercentage = previousPrice > 0 ? (change / previousPrice) * 100 : 0;

    trend.push({
      period: `Year ${i}`,
      averagePrice: periodPrice,
      medianPrice: periodPrice * 0.98, // Slight discount for median
      change,
      changePercentage
    });
  }

  return trend;
}

export function calculateSensitivityMatrix(inputs: PricePerSquareFootInputs): Array<{
  variable: string;
  values: number[];
  impacts: number[];
}> {
  const matrix = [];

  // Size sensitivity
  const sizeValues = [inputs.propertySize * 0.9, inputs.propertySize, inputs.propertySize * 1.1];
  const sizeImpacts = sizeValues.map(size => {
    const testInputs = { ...inputs, propertySize: size };
    return calculatePricePerSquareFoot(testInputs) - calculatePricePerSquareFoot(inputs);
  });

  matrix.push({
    variable: 'Property Size',
    values: sizeValues,
    impacts: sizeImpacts
  });

  // Comparable adjustments sensitivity
  const adjustmentValues = [-5000, 0, 5000];
  const adjustmentImpacts = adjustmentValues.map(adjustment => {
    const testComps = inputs.comparableProperties.map(comp => ({ ...comp, adjustments: adjustment }));
    const testInputs = { ...inputs, comparableProperties: testComps };
    return calculateAverageComparablePrice(testInputs) - calculateAverageComparablePrice(inputs);
  });

  matrix.push({
    variable: 'Comparable Adjustments',
    values: adjustmentValues,
    impacts: adjustmentImpacts
  });

  return matrix;
}

export function calculateScenarios(inputs: PricePerSquareFootInputs): Array<{
  scenario: string;
  probability: number;
  pricePerSquareFoot: number;
  totalValue: number;
}> {
  const scenarios = [];

  // Base case
  scenarios.push({
    scenario: 'Base Case',
    probability: 0.4,
    pricePerSquareFoot: calculatePricePerSquareFoot(inputs),
    totalValue: inputs.propertyPrice
  });

  // Market appreciation scenario
  const appreciationInputs = {
    ...inputs,
    propertyAppreciationRate: inputs.propertyAppreciationRate + 2
  };
  scenarios.push({
    scenario: 'Market Appreciation',
    probability: 0.3,
    pricePerSquareFoot: calculatePricePerSquareFoot(appreciationInputs),
    totalValue: calculateEstimatedValue(appreciationInputs)
  });

  // Market decline scenario
  const declineInputs = {
    ...inputs,
    propertyAppreciationRate: Math.max(0, inputs.propertyAppreciationRate - 2)
  };
  scenarios.push({
    scenario: 'Market Decline',
    probability: 0.2,
    pricePerSquareFoot: calculatePricePerSquareFoot(declineInputs),
    totalValue: calculateEstimatedValue(declineInputs)
  });

  // Luxury market scenario
  const luxuryInputs = {
    ...inputs,
    propertyPrice: inputs.propertyPrice * 1.2
  };
  scenarios.push({
    scenario: 'Luxury Market',
    probability: 0.1,
    pricePerSquareFoot: calculatePricePerSquareFoot(luxuryInputs),
    totalValue: luxuryInputs.propertyPrice
  });

  return scenarios;
}

export function calculateComparisonAnalysis(inputs: PricePerSquareFootInputs): Array<{
  metric: string;
  property: number;
  comparable: number;
  difference: number;
  percentage: number;
}> {
  const analysis = [];
  const propertyPrice = calculatePricePerSquareFoot(inputs);
  const comparablePrice = calculateAverageComparablePrice(inputs);

  // Price per square foot
  const priceDifference = propertyPrice - comparablePrice;
  const pricePercentage = comparablePrice > 0 ? (priceDifference / comparablePrice) * 100 : 0;

  analysis.push({
    metric: 'Price per Sq Ft',
    property: propertyPrice,
    comparable: comparablePrice,
    difference: priceDifference,
    percentage: pricePercentage
  });

  // Size comparison
  const avgSize = inputs.comparableProperties.reduce((sum, comp) => sum + comp.size, 0) / inputs.comparableProperties.length;
  const sizeDifference = inputs.propertySize - avgSize;
  const sizePercentage = avgSize > 0 ? (sizeDifference / avgSize) * 100 : 0;

  analysis.push({
    metric: 'Property Size',
    property: inputs.propertySize,
    comparable: avgSize,
    difference: sizeDifference,
    percentage: sizePercentage
  });

  // Age comparison
  const avgAge = inputs.comparableProperties.reduce((sum, comp) => sum + comp.age, 0) / inputs.comparableProperties.length;
  const ageDifference = inputs.propertyAge - avgAge;
  const agePercentage = avgAge > 0 ? (ageDifference / avgAge) * 100 : 0;

  analysis.push({
    metric: 'Property Age',
    property: inputs.propertyAge,
    comparable: avgAge,
    difference: ageDifference,
    percentage: agePercentage
  });

  return analysis;
}

export function calculateRiskScore(inputs: PricePerSquareFootInputs): number {
  let score = 0;

  // Market risk
  if (inputs.marketCondition === 'declining') score += 30;
  else if (inputs.marketCondition === 'hot') score += 10;

  // Comparable quality risk
  if (inputs.comparableProperties.length < 3) score += 25;
  else if (inputs.comparableProperties.length < 5) score += 10;

  // Property condition risk
  if (inputs.propertyCondition === 'poor') score += 20;
  else if (inputs.propertyCondition === 'needs_repair') score += 15;

  // Location risk
  if (inputs.crimeRate === 'high') score += 15;
  else if (inputs.walkScore < 50) score += 10;

  // Market timing risk
  if (inputs.daysOnMarket > 90) score += 15;
  else if (inputs.daysOnMarket > 30) score += 8;

  return Math.min(100, score);
}

export function calculatePriceVolatility(inputs: PricePerSquareFootInputs): number {
  const prices = inputs.comparableProperties
    .map(comp => comp.size > 0 ? (comp.salePrice + comp.adjustments) / comp.size : 0);

  if (prices.length < 2) return 0;

  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

  return Math.sqrt(variance);
}

export function calculateMarketRisk(inputs: PricePerSquareFootInputs): number {
  let risk = 20; // Base market risk

  if (inputs.marketCondition === 'hot') risk += 15;
  else if (inputs.marketCondition === 'declining') risk += 25;

  if (inputs.marketGrowthRate < 1) risk += 10;
  else if (inputs.marketGrowthRate > 5) risk += 5;

  return Math.min(100, risk);
}

export function calculateValuationRisk(inputs: PricePerSquareFootInputs): number {
  let risk = 15; // Base valuation risk

  if (inputs.comparableProperties.length < 3) risk += 25;
  else if (inputs.comparableProperties.length < 5) risk += 10;

  if (inputs.propertyAge > 30) risk += 10;
  else if (inputs.propertyAge > 20) risk += 5;

  return Math.min(100, risk);
}

export function calculatePricePerformance(inputs: PricePerSquareFootInputs): number {
  const propertyPrice = calculatePricePerSquareFoot(inputs);
  const marketAverage = calculateMarketAveragePrice(inputs);

  return marketAverage > 0 ? (propertyPrice / marketAverage) * 100 : 0;
}

export function calculateMarketPerformance(inputs: PricePerSquareFootInputs): number {
  return inputs.marketGrowthRate;
}

export function calculateRelativePerformance(inputs: PricePerSquareFootInputs): number {
  return calculatePricePerformance(inputs) - calculateMarketPerformance(inputs);
}

export function calculateBenchmarkAnalysis(inputs: PricePerSquareFootInputs): Array<{
  metric: string;
  property: number;
  benchmark: number;
  difference: number;
  percentile: number;
}> {
  const analysis = [];
  const propertyPrice = calculatePricePerSquareFoot(inputs);
  const marketAverage = calculateMarketAveragePrice(inputs);

  // Price per square foot benchmark
  const priceDifference = propertyPrice - marketAverage;
  const pricePercentile = propertyPrice > marketAverage ? 75 : propertyPrice > marketAverage * 0.9 ? 60 : 40;

  analysis.push({
    metric: 'Price per Sq Ft',
    property: propertyPrice,
    benchmark: marketAverage,
    difference: priceDifference,
    percentile: pricePercentile
  });

  // Size benchmark
  const avgSize = inputs.comparableProperties.reduce((sum, comp) => sum + comp.size, 0) / inputs.comparableProperties.length;
  const sizeDifference = inputs.propertySize - avgSize;
  const sizePercentile = inputs.propertySize > avgSize ? 75 : inputs.propertySize > avgSize * 0.9 ? 60 : 40;

  analysis.push({
    metric: 'Property Size',
    property: inputs.propertySize,
    benchmark: avgSize,
    difference: sizeDifference,
    percentile: sizePercentile
  });

  return analysis;
}

export function generatePricePerSquareFootAnalysis(inputs: PricePerSquareFootInputs, metrics: PricePerSquareFootMetrics): PricePerSquareFootAnalysis {
  const overUnderPercentage = calculateOverUnderPricedPercentage(inputs);
  const riskScore = calculateRiskScore(inputs);

  let priceRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (Math.abs(overUnderPercentage) < 5) priceRating = 'Excellent';
  else if (Math.abs(overUnderPercentage) < 10) priceRating = 'Good';
  else if (Math.abs(overUnderPercentage) < 15) priceRating = 'Average';
  else if (Math.abs(overUnderPercentage) < 20) priceRating = 'Poor';
  else priceRating = 'Very Poor';

  let valueRating: 'High Value' | 'Good Value' | 'Fair Value' | 'Low Value' | 'Overpriced';
  if (overUnderPercentage < -10) valueRating = 'High Value';
  else if (overUnderPercentage < -5) valueRating = 'Good Value';
  else if (overUnderPercentage < 5) valueRating = 'Fair Value';
  else if (overUnderPercentage < 10) valueRating = 'Low Value';
  else valueRating = 'Overpriced';

  const recommendation = overUnderPercentage < -5 ? 'Buy' :
                        overUnderPercentage < 5 ? 'Consider' :
                        overUnderPercentage < 10 ? 'Negotiate' : 'Avoid';

  return {
    priceRating,
    valueRating,
    recommendation,
    keyStrengths: [
      `Price per sq ft: $${metrics.pricePerSquareFoot.toFixed(2)}`,
      `Market position: ${metrics.marketPosition}`,
      `Comparable properties: ${inputs.comparableProperties.length}`
    ],
    keyWeaknesses: [
      `Over/under priced: ${overUnderPercentage.toFixed(1)}%`,
      `Risk score: ${riskScore}`,
      `Days on market: ${inputs.daysOnMarket}`
    ],
    valueFactors: [
      'Comparable sales analysis',
      'Market condition assessment',
      'Property condition evaluation',
      'Location desirability'
    ],
    opportunities: [
      'Market timing optimization',
      'Negotiation leverage',
      'Value-add potential',
      'Appreciation opportunity'
    ],
    priceSummary: `Price per square foot analysis shows ${priceRating.toLowerCase()} pricing with ${valueRating.toLowerCase()} and ${recommendation.toLowerCase()} recommendation.`,
    comparableAnalysis: `Comparable analysis indicates ${metrics.pricePosition.toFixed(1)}% position relative to ${inputs.comparableProperties.length} comparable properties.`,
    marketAnalysis: `Market analysis shows ${inputs.marketCondition} conditions with ${inputs.marketGrowthRate}% growth rate in ${inputs.marketLocation}.`,
    valueSummary: `Value analysis indicates ${overUnderPercentage > 0 ? 'overpriced' : 'underpriced'} by ${Math.abs(overUnderPercentage).toFixed(1)}% with estimated value of $${metrics.estimatedValue.toLocaleString()}.`,
    valuationAnalysis: `Valuation analysis shows value range from $${metrics.valueRange.low.toLocaleString()} to $${metrics.valueRange.high.toLocaleString()} with ${metrics.valueRange.confidence}% confidence.`,
    pricePosition: `Price position analysis indicates ${metrics.pricePercentile.toFixed(1)} percentile ranking among comparable properties.`,
    marketSummary: `Market summary shows ${metrics.marketPosition} positioning with average price of $${metrics.marketAveragePrice.toFixed(2)} per square foot.`,
    trendAnalysis: `Trend analysis indicates ${inputs.propertyAppreciationRate}% annual appreciation over ${inputs.analysisPeriod} year period.`,
    competitiveAnalysis: `Competitive analysis shows ${inputs.comparableProperties.length} comparable properties with price range of $${metrics.comparablePriceRange.min.toFixed(2)} to $${metrics.comparablePriceRange.max.toFixed(2)}.`,
    locationSummary: `Location analysis indicates ${inputs.walkScore} walk score, ${inputs.schoolRating}/10 school rating, and ${inputs.crimeRate} crime rate.`,
    neighborhoodAnalysis: `Neighborhood analysis shows ${inputs.schoolDistrict} school district with ${inputs.transitScore} transit score.`,
    amenityAnalysis: `Amenity analysis indicates ${inputs.amenities.filter(a => a.included).length} included amenities with total value of $${inputs.amenities.reduce((sum, a) => sum + (a.included ? a.value : 0), 0).toLocaleString()}.`,
    riskAssessment: `Overall risk assessment of ${riskScore} with ${metrics.priceVolatility.toFixed(2)} price volatility and ${metrics.marketRisk} market risk.`,
    priceRisk: `Price risk assessment based on ${overUnderPercentage.toFixed(1)}% over/under pricing and ${metrics.priceVolatility.toFixed(2)} market volatility.`,
    marketRisk: `Market risk assessment for ${inputs.marketLocation} with ${inputs.marketCondition} conditions and ${inputs.marketGrowthRate}% growth rate.`,
    locationRisk: `Location risk assessment based on ${inputs.crimeRate} crime rate and ${inputs.walkScore} walk score.`,
    performanceSummary: `Performance summary shows ${metrics.pricePerformance.toFixed(1)}% price performance and ${metrics.relativePerformance.toFixed(1)}% relative performance.`,
    trendPerformance: `Trend performance indicates ${inputs.propertyAppreciationRate}% annual appreciation with ${inputs.marketGrowthRate}% market growth.`,
    relativePerformance: `Relative performance shows ${metrics.relativePerformance.toFixed(1)}% differential from market average.`,
    pricingRecommendations: [
      overUnderPercentage > 5 ? 'Consider price reduction to improve market position' : 'Current pricing appears appropriate for market',
      inputs.daysOnMarket > 30 ? 'Consider pricing adjustment for faster sale' : 'Pricing appears competitive'
    ],
    negotiationSuggestions: [
      'Use comparable analysis for negotiation leverage',
      'Highlight property strengths and amenities',
      'Consider seller concessions for faster close',
      'Evaluate buyer motivation and timeline'
    ],
    optimizationStrategies: [
      'Enhance property presentation and marketing',
      'Consider professional staging',
      'Improve online property listings',
      'Target qualified buyers in market area'
    ],
    implementationPlan: `Implementation plan includes ${recommendation.toLowerCase()} strategy with ${inputs.analysisPeriod} month timeline.`,
    nextSteps: [
      'Review comparable sales data',
      'Assess property condition and presentation',
      'Evaluate market timing and conditions',
      'Consult with real estate professional'
    ],
    timeline: `${inputs.analysisPeriod} month analysis period with quarterly market reassessment.`,
    monitoringPlan: 'Monthly market condition monitoring and quarterly pricing analysis.',
    keyMetrics: [
      'Price per square foot',
      'Comparable analysis',
      'Market position',
      'Over/under priced percentage'
    ],
    reviewSchedule: 'Monthly pricing review and quarterly comprehensive analysis.',
    riskManagement: `Risk management includes monitoring ${riskScore} risk score and ${metrics.priceVolatility.toFixed(2)} price volatility.`,
    mitigationStrategies: [
      'Diversify marketing channels',
      'Maintain competitive pricing',
      'Monitor market conditions',
      'Prepare negotiation strategy'
    ],
    contingencyPlans: [
      'Price adjustment strategy',
      'Extended marketing plan',
      'Alternative buyer targeting',
      'Market condition response'
    ],
    performanceBenchmarks: [
      {
        metric: 'Price per Sq Ft',
        target: metrics.marketAveragePrice,
        benchmark: metrics.pricePerSquareFoot,
        industry: 'Real Estate'
      },
      {
        metric: 'Market Position',
        target: 100,
        benchmark: metrics.pricePosition,
        industry: 'Real Estate'
      },
      {
        metric: 'Risk Score',
        target: 30,
        benchmark: riskScore,
        industry: 'Real Estate'
      }
    ],
    decisionRecommendation: `${recommendation} with ${priceRating.toLowerCase()} pricing and ${valueRating.toLowerCase()}.`,
    presentationPoints: [
      `Price per sq ft: $${metrics.pricePerSquareFoot.toFixed(2)}`,
      `Market position: ${metrics.marketPosition}`,
      `Over/under priced: ${overUnderPercentage.toFixed(1)}%`,
      `Recommendation: ${recommendation}`
    ],
    decisionFactors: [
      'Comparable sales analysis',
      'Market condition assessment',
      'Property condition evaluation',
      'Location desirability factors',
      'Pricing strategy optimization'
    ]
  };
}