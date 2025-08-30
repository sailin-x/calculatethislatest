import { PricePerSquareFootInputs, PricePerSquareFootOutputs, PricePerSquareFootAnalysis, PricePerSquareFootMetrics } from './types';

export function calculatePricePerSquareFoot(inputs: PricePerSquareFootInputs): PricePerSquareFootOutputs {
  // Calculate core price per square foot metrics
  const pricePerSquareFoot = inputs.propertyPrice / inputs.propertySize;
  const listPricePerSquareFoot = inputs.listPrice / inputs.propertySize;
  const salePricePerSquareFoot = inputs.salePrice > 0 ? inputs.salePrice / inputs.propertySize : 0;
  const appraisalPricePerSquareFoot = inputs.appraisalValue / inputs.propertySize;
  const assessedPricePerSquareFoot = inputs.assessedValue / inputs.propertySize;

  // Calculate comparable analysis
  const comparablePrices = inputs.comparableProperties.map(prop => prop.salePrice / prop.size);
  const averageComparablePrice = comparablePrices.reduce((sum, price) => sum + price, 0) / comparablePrices.length;
  const medianComparablePrice = calculateMedian(comparablePrices);
  const comparablePriceRange = {
    min: Math.min(...comparablePrices),
    max: Math.max(...comparablePrices),
    range: Math.max(...comparablePrices) - Math.min(...comparablePrices)
  };

  // Calculate price position and percentile
  const pricePosition = calculatePricePosition(pricePerSquareFoot, comparablePrices);
  const pricePercentile = calculatePercentile(pricePerSquareFoot, comparablePrices);

  // Calculate market analysis
  const marketAveragePrice = averageComparablePrice * (1 + inputs.marketGrowthRate / 100);
  const marketMedianPrice = medianComparablePrice * (1 + inputs.marketGrowthRate / 100);
  const marketPriceRange = {
    min: comparablePriceRange.min * (1 + inputs.marketGrowthRate / 100),
    max: comparablePriceRange.max * (1 + inputs.marketGrowthRate / 100),
    range: comparablePriceRange.range * (1 + inputs.marketGrowthRate / 100)
  };

  // Calculate estimated value
  const estimatedValue = pricePerSquareFoot * inputs.propertySize;
  const valueRange = calculateValueRange(estimatedValue, comparablePrices, inputs.propertySize);

  // Calculate over/under priced analysis
  const overUnderPriced = pricePerSquareFoot - averageComparablePrice;
  const overUnderPricedPercentage = (overUnderPriced / averageComparablePrice) * 100;

  // Calculate risk score
  const riskScore = calculateRiskScore(inputs, pricePerSquareFoot, averageComparablePrice);

  // Calculate performance metrics
  const pricePerformance = calculatePricePerformance(pricePerSquareFoot, averageComparablePrice);
  const marketPerformance = calculateMarketPerformance(inputs.marketGrowthRate);
  const relativePerformance = pricePerformance - marketPerformance;

  // Calculate price volatility
  const priceVolatility = calculatePriceVolatility(comparablePrices);

  // Calculate market and valuation risk
  const marketRisk = calculateMarketRisk(inputs);
  const valuationRisk = calculateValuationRisk(pricePerSquareFoot, comparablePrices);

  // Generate analysis
  const analysis = generateAnalysis(inputs, pricePerSquareFoot, averageComparablePrice, overUnderPricedPercentage, riskScore);

  // Generate trend analysis
  const priceTrend = generatePriceTrend(inputs, pricePerSquareFoot);

  // Generate sensitivity matrix
  const sensitivityMatrix = generateSensitivityMatrix(inputs, pricePerSquareFoot);

  // Generate scenarios
  const scenarios = generateScenarios(inputs, pricePerSquareFoot);

  // Generate comparison analysis
  const comparisonAnalysis = generateComparisonAnalysis(inputs, pricePerSquareFoot, averageComparablePrice);

  // Generate benchmark analysis
  const benchmarkAnalysis = generateBenchmarkAnalysis(inputs, pricePerSquareFoot);

  return {
    // Core Metrics
    pricePerSquareFoot,
    averageComparablePrice,
    medianComparablePrice,
    estimatedValue,
    overUnderPricedPercentage,
    pricePosition,
    riskScore,
    pricePerformance,
    
    // Analysis
    analysis,
    
    // Additional Metrics
    listPricePerSquareFoot,
    salePricePerSquareFoot,
    appraisalPricePerSquareFoot,
    assessedPricePerSquareFoot,
    comparablePriceRange,
    pricePercentile,
    marketAveragePrice,
    marketMedianPrice,
    marketPriceRange,
    valueRange,
    overUnderPriced,
    priceTrend,
    sensitivityMatrix,
    scenarios,
    comparisonAnalysis,
    priceVolatility,
    marketRisk,
    valuationRisk,
    marketPerformance,
    relativePerformance,
    benchmarkAnalysis
  };
}

function calculateMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function calculatePricePosition(price: number, comparablePrices: number[]): string {
  const sorted = [...comparablePrices].sort((a, b) => a - b);
  const position = sorted.findIndex(p => p >= price);
  const percentile = ((position + 1) / sorted.length) * 100;
  
  if (percentile <= 25) return 'Below Market';
  if (percentile <= 50) return 'Below Average';
  if (percentile <= 75) return 'Above Average';
  return 'Above Market';
}

function calculatePercentile(value: number, values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const position = sorted.findIndex(v => v >= value);
  return ((position + 1) / sorted.length) * 100;
}

function calculateValueRange(estimatedValue: number, comparablePrices: number[], propertySize: number): any {
  const avgPrice = comparablePrices.reduce((sum, price) => sum + price, 0) / comparablePrices.length;
  const stdDev = Math.sqrt(comparablePrices.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / comparablePrices.length);
  
  return {
    low: (avgPrice - stdDev) * propertySize,
    high: (avgPrice + stdDev) * propertySize,
    confidence: 68 // 1 standard deviation = 68% confidence
  };
}

function calculateRiskScore(inputs: PricePerSquareFootInputs, pricePerSquareFoot: number, averageComparablePrice: number): number {
  let riskScore = 50; // Base risk score

  // Price deviation risk
  const priceDeviation = Math.abs(pricePerSquareFoot - averageComparablePrice) / averageComparablePrice;
  riskScore += priceDeviation * 20;

  // Market condition risk
  switch (inputs.marketCondition) {
    case 'declining': riskScore += 20; break;
    case 'stable': riskScore += 0; break;
    case 'growing': riskScore -= 10; break;
    case 'hot': riskScore -= 20; break;
  }

  // Days on market risk
  if (inputs.daysOnMarket > 90) riskScore += 15;
  else if (inputs.daysOnMarket > 60) riskScore += 10;
  else if (inputs.daysOnMarket > 30) riskScore += 5;

  // Property condition risk
  switch (inputs.propertyCondition) {
    case 'excellent': riskScore -= 10; break;
    case 'good': riskScore -= 5; break;
    case 'average': riskScore += 0; break;
    case 'poor': riskScore += 15; break;
    case 'needs_repair': riskScore += 25; break;
  }

  // Location risk
  if (inputs.crimeRate === 'high') riskScore += 15;
  else if (inputs.crimeRate === 'medium') riskScore += 8;

  // School rating risk
  if (inputs.schoolRating < 6) riskScore += 10;
  else if (inputs.schoolRating < 7) riskScore += 5;

  return Math.max(0, Math.min(100, riskScore));
}

function calculatePricePerformance(price: number, averageComparablePrice: number): number {
  return ((price - averageComparablePrice) / averageComparablePrice) * 100;
}

function calculateMarketPerformance(marketGrowthRate: number): number {
  return marketGrowthRate;
}

function calculatePriceVolatility(comparablePrices: number[]): number {
  const avgPrice = comparablePrices.reduce((sum, price) => sum + price, 0) / comparablePrices.length;
  const variance = comparablePrices.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / comparablePrices.length;
  return Math.sqrt(variance) / avgPrice * 100; // Coefficient of variation
}

function calculateMarketRisk(inputs: PricePerSquareFootInputs): number {
  let risk = 50;

  // Market condition risk
  switch (inputs.marketCondition) {
    case 'declining': risk += 30; break;
    case 'stable': risk += 0; break;
    case 'growing': risk -= 15; break;
    case 'hot': risk -= 25; break;
  }

  // Market growth rate risk
  if (inputs.marketGrowthRate < 0) risk += 20;
  else if (inputs.marketGrowthRate > 10) risk += 10;

  return Math.max(0, Math.min(100, risk));
}

function calculateValuationRisk(price: number, comparablePrices: number[]): number {
  const avgPrice = comparablePrices.reduce((sum, p) => sum + p, 0) / comparablePrices.length;
  const deviation = Math.abs(price - avgPrice) / avgPrice;
  return Math.min(100, deviation * 100);
}

function generateAnalysis(
  inputs: PricePerSquareFootInputs,
  pricePerSquareFoot: number,
  averageComparablePrice: number,
  overUnderPricedPercentage: number,
  riskScore: number
): PricePerSquareFootAnalysis {
  // Determine price rating
  let priceRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (Math.abs(overUnderPricedPercentage) <= 5) priceRating = 'Excellent';
  else if (Math.abs(overUnderPricedPercentage) <= 10) priceRating = 'Good';
  else if (Math.abs(overUnderPricedPercentage) <= 20) priceRating = 'Average';
  else if (Math.abs(overUnderPricedPercentage) <= 30) priceRating = 'Poor';
  else priceRating = 'Very Poor';

  // Determine value rating
  let valueRating: 'High Value' | 'Good Value' | 'Fair Value' | 'Low Value' | 'Overpriced';
  if (overUnderPricedPercentage < -10) valueRating = 'High Value';
  else if (overUnderPricedPercentage < -5) valueRating = 'Good Value';
  else if (overUnderPricedPercentage < 5) valueRating = 'Fair Value';
  else if (overUnderPricedPercentage < 15) valueRating = 'Low Value';
  else valueRating = 'Overpriced';

  // Determine recommendation
  let recommendation: 'Buy' | 'Consider' | 'Negotiate' | 'Avoid' | 'Requires Review';
  if (overUnderPricedPercentage < -10 && riskScore < 40) recommendation = 'Buy';
  else if (overUnderPricedPercentage < -5 && riskScore < 60) recommendation = 'Consider';
  else if (overUnderPricedPercentage > 10) recommendation = 'Negotiate';
  else if (overUnderPricedPercentage > 20 || riskScore > 80) recommendation = 'Avoid';
  else recommendation = 'Requires Review';

  // Generate key insights
  const keyStrengths = generateKeyStrengths(inputs, pricePerSquareFoot, averageComparablePrice);
  const keyWeaknesses = generateKeyWeaknesses(inputs, pricePerSquareFoot, averageComparablePrice);
  const valueFactors = generateValueFactors(inputs, pricePerSquareFoot, averageComparablePrice);
  const opportunities = generateOpportunities(inputs, pricePerSquareFoot, averageComparablePrice);

  // Generate detailed analysis
  const priceSummary = generatePriceSummary(pricePerSquareFoot, averageComparablePrice, overUnderPricedPercentage);
  const comparableAnalysis = generateComparableAnalysis(inputs.comparableProperties, pricePerSquareFoot);
  const marketAnalysis = generateMarketAnalysis(inputs, pricePerSquareFoot);
  const valueSummary = generateValueSummary(pricePerSquareFoot, averageComparablePrice, overUnderPricedPercentage);
  const valuationAnalysis = generateValuationAnalysis(inputs, pricePerSquareFoot);
  const pricePosition = generatePricePositionAnalysis(pricePerSquareFoot, averageComparablePrice);
  const marketSummary = generateMarketSummary(inputs);
  const trendAnalysis = generateTrendAnalysis(inputs, pricePerSquareFoot);
  const competitiveAnalysis = generateCompetitiveAnalysis(inputs, pricePerSquareFoot);
  const locationSummary = generateLocationSummary(inputs);
  const neighborhoodAnalysis = generateNeighborhoodAnalysis(inputs);
  const amenityAnalysis = generateAmenityAnalysis(inputs);
  const riskAssessment = generateRiskAssessment(riskScore, inputs);
  const priceRisk = generatePriceRisk(overUnderPricedPercentage);
  const marketRisk = generateMarketRiskAnalysis(inputs);
  const locationRisk = generateLocationRisk(inputs);
  const performanceSummary = generatePerformanceSummary(pricePerSquareFoot, averageComparablePrice);
  const trendPerformance = generateTrendPerformance(inputs.marketGrowthRate);
  const relativePerformance = generateRelativePerformance(pricePerSquareFoot, averageComparablePrice, inputs.marketGrowthRate);

  // Generate recommendations
  const pricingRecommendations = generatePricingRecommendations(overUnderPricedPercentage, pricePerSquareFoot, averageComparablePrice);
  const negotiationSuggestions = generateNegotiationSuggestions(overUnderPricedPercentage, inputs);
  const optimizationStrategies = generateOptimizationStrategies(inputs, pricePerSquareFoot);

  // Generate implementation plan
  const implementationPlan = generateImplementationPlan(recommendation, overUnderPricedPercentage);
  const nextSteps = generateNextSteps(recommendation, inputs);
  const timeline = generateTimeline(inputs, recommendation);

  // Generate monitoring plan
  const monitoringPlan = generateMonitoringPlan(inputs);
  const keyMetrics = generateKeyMetrics(pricePerSquareFoot, averageComparablePrice);
  const reviewSchedule = generateReviewSchedule(inputs);

  // Generate risk management
  const riskManagement = generateRiskManagement(riskScore, inputs);
  const mitigationStrategies = generateMitigationStrategies(riskScore, inputs);
  const contingencyPlans = generateContingencyPlans(riskScore, inputs);

  // Generate performance benchmarks
  const performanceBenchmarks = generatePerformanceBenchmarks(pricePerSquareFoot, averageComparablePrice, inputs);

  // Generate decision support
  const decisionRecommendation = generateDecisionRecommendation(recommendation, overUnderPricedPercentage, riskScore);
  const presentationPoints = generatePresentationPoints(pricePerSquareFoot, averageComparablePrice, overUnderPricedPercentage);
  const decisionFactors = generateDecisionFactors(inputs, pricePerSquareFoot, averageComparablePrice);

  return {
    priceRating,
    valueRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    valueFactors,
    opportunities,
    priceSummary,
    comparableAnalysis,
    marketAnalysis,
    valueSummary,
    valuationAnalysis,
    pricePosition,
    marketSummary,
    trendAnalysis,
    competitiveAnalysis,
    locationSummary,
    neighborhoodAnalysis,
    amenityAnalysis,
    riskAssessment,
    priceRisk,
    marketRisk,
    locationRisk,
    performanceSummary,
    trendPerformance,
    relativePerformance,
    pricingRecommendations,
    negotiationSuggestions,
    optimizationStrategies,
    implementationPlan,
    nextSteps,
    timeline,
    monitoringPlan,
    keyMetrics,
    reviewSchedule,
    riskManagement,
    mitigationStrategies,
    contingencyPlans,
    performanceBenchmarks,
    decisionRecommendation,
    presentationPoints,
    decisionFactors
  };
}

function generateKeyStrengths(inputs: PricePerSquareFootInputs, price: number, avgPrice: number): string[] {
  const strengths: string[] = [];
  
  if (price < avgPrice * 0.9) strengths.push('Priced below market average');
  if (inputs.propertyCondition === 'excellent') strengths.push('Excellent property condition');
  if (inputs.schoolRating >= 8) strengths.push('High-rated school district');
  if (inputs.crimeRate === 'low') strengths.push('Low crime area');
  if (inputs.walkScore >= 80) strengths.push('High walkability score');
  if (inputs.transitScore >= 80) strengths.push('Excellent transit access');
  if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') strengths.push('Strong market growth');
  if (inputs.propertyAge < 10) strengths.push('Relatively new property');
  
  return strengths.length > 0 ? strengths : ['Competitive pricing in current market'];
}

function generateKeyWeaknesses(inputs: PricePerSquareFootInputs, price: number, avgPrice: number): string[] {
  const weaknesses: string[] = [];
  
  if (price > avgPrice * 1.1) weaknesses.push('Priced above market average');
  if (inputs.propertyCondition === 'poor' || inputs.propertyCondition === 'needs_repair') weaknesses.push('Property needs significant repairs');
  if (inputs.schoolRating < 6) weaknesses.push('Lower-rated school district');
  if (inputs.crimeRate === 'high') weaknesses.push('Higher crime area');
  if (inputs.walkScore < 50) weaknesses.push('Low walkability');
  if (inputs.transitScore < 50) weaknesses.push('Limited transit access');
  if (inputs.marketCondition === 'declining') weaknesses.push('Declining market conditions');
  if (inputs.propertyAge > 30) weaknesses.push('Older property requiring maintenance');
  
  return weaknesses.length > 0 ? weaknesses : ['No significant weaknesses identified'];
}

function generateValueFactors(inputs: PricePerSquareFootInputs, price: number, avgPrice: number): string[] {
  const factors: string[] = [];
  
  if (inputs.propertySize > 2000) factors.push('Large property size');
  if (inputs.numberOfBedrooms >= 4) factors.push('Multiple bedrooms');
  if (inputs.numberOfBathrooms >= 2.5) factors.push('Multiple bathrooms');
  if (inputs.lotSize > 5000) factors.push('Large lot size');
  if (inputs.garageSpaces >= 2) factors.push('Multiple garage spaces');
  if (inputs.amenities.some(a => a.included && a.value > 10000)) factors.push('High-value amenities included');
  if (inputs.marketGrowthRate > 5) factors.push('Strong market appreciation potential');
  
  return factors.length > 0 ? factors : ['Standard property features'];
}

function generateOpportunities(inputs: PricePerSquareFootInputs, price: number, avgPrice: number): string[] {
  const opportunities: string[] = [];
  
  if (inputs.propertyCondition === 'needs_repair') opportunities.push('Renovation potential for value increase');
  if (inputs.amenities.some(a => !a.included && a.value > 10000)) opportunities.push('Potential to add high-value amenities');
  if (inputs.marketGrowthRate > 5) opportunities.push('Market appreciation potential');
  if (inputs.propertyAge > 20) opportunities.push('Potential for modernization upgrades');
  if (inputs.lotSize > 8000) opportunities.push('Potential for expansion or subdivision');
  
  return opportunities.length > 0 ? opportunities : ['Standard market opportunities'];
}

function generatePriceSummary(price: number, avgPrice: number, overUnderPricedPercentage: number): string {
  if (overUnderPricedPercentage < -10) {
    return `The property is priced ${Math.abs(overUnderPricedPercentage).toFixed(1)}% below market average, representing excellent value.`;
  } else if (overUnderPricedPercentage < -5) {
    return `The property is priced ${Math.abs(overUnderPricedPercentage).toFixed(1)}% below market average, offering good value.`;
  } else if (overUnderPricedPercentage < 5) {
    return `The property is priced within ${Math.abs(overUnderPricedPercentage).toFixed(1)}% of market average, indicating fair market value.`;
  } else if (overUnderPricedPercentage < 15) {
    return `The property is priced ${overUnderPricedPercentage.toFixed(1)}% above market average, suggesting premium pricing.`;
  } else {
    return `The property is priced ${overUnderPricedPercentage.toFixed(1)}% above market average, indicating potential overpricing.`;
  }
}

function generateComparableAnalysis(comparableProperties: any[], price: number): string {
  const avgComparablePrice = comparableProperties.reduce((sum, prop) => sum + (prop.salePrice / prop.size), 0) / comparableProperties.length;
  const priceDiff = ((price - avgComparablePrice) / avgComparablePrice) * 100;
  
  return `Analysis of ${comparableProperties.length} comparable properties shows the subject property is ${priceDiff > 0 ? 'priced' : 'valued'} ${Math.abs(priceDiff).toFixed(1)}% ${priceDiff > 0 ? 'above' : 'below'} the average comparable price per square foot.`;
}

function generateMarketAnalysis(inputs: PricePerSquareFootInputs, price: number): string {
  const marketGrowth = inputs.marketGrowthRate;
  const marketCondition = inputs.marketCondition;
  
  return `The ${marketCondition} market is experiencing ${marketGrowth > 0 ? 'growth' : 'decline'} of ${Math.abs(marketGrowth).toFixed(1)}% annually, which ${marketGrowth > 0 ? 'supports' : 'may pressure'} current pricing levels.`;
}

function generateValueSummary(price: number, avgPrice: number, overUnderPricedPercentage: number): string {
  if (overUnderPricedPercentage < -10) {
    return 'The property represents exceptional value compared to market comparables.';
  } else if (overUnderPricedPercentage < -5) {
    return 'The property offers good value relative to market comparables.';
  } else if (overUnderPricedPercentage < 5) {
    return 'The property is fairly valued relative to market comparables.';
  } else if (overUnderPricedPercentage < 15) {
    return 'The property may be overvalued relative to market comparables.';
  } else {
    return 'The property appears significantly overvalued relative to market comparables.';
  }
}

function generateValuationAnalysis(inputs: PricePerSquareFootInputs, price: number): string {
  const appraisalPrice = inputs.appraisalValue / inputs.propertySize;
  const assessedPrice = inputs.assessedValue / inputs.propertySize;
  
  return `The property's price per square foot of $${price.toFixed(2)} compares to an appraisal value of $${appraisalPrice.toFixed(2)} and assessed value of $${assessedPrice.toFixed(2)} per square foot.`;
}

function generatePricePositionAnalysis(price: number, avgPrice: number): string {
  const position = price > avgPrice ? 'above' : 'below';
  const percentage = Math.abs((price - avgPrice) / avgPrice) * 100;
  
  return `The property is positioned ${position} the market average by ${percentage.toFixed(1)}%.`;
}

function generateMarketSummary(inputs: PricePerSquareFootInputs): string {
  return `The ${inputs.marketLocation} market is currently ${inputs.marketCondition} with ${inputs.marketGrowthRate > 0 ? 'positive' : 'negative'} growth of ${Math.abs(inputs.marketGrowthRate).toFixed(1)}% annually.`;
}

function generateTrendAnalysis(inputs: PricePerSquareFootInputs, price: number): string {
  const growthRate = inputs.marketGrowthRate;
  
  if (growthRate > 5) {
    return 'Strong market growth trends suggest potential for price appreciation.';
  } else if (growthRate > 2) {
    return 'Moderate market growth provides stability for current pricing.';
  } else if (growthRate > -2) {
    return 'Stable market conditions support current pricing levels.';
  } else {
    return 'Declining market conditions may pressure pricing downward.';
  }
}

function generateCompetitiveAnalysis(inputs: PricePerSquareFootInputs, price: number): string {
  const daysOnMarket = inputs.daysOnMarket;
  
  if (daysOnMarket < 30) {
    return 'Fast market absorption indicates strong demand and competitive pricing.';
  } else if (daysOnMarket < 60) {
    return 'Moderate market absorption suggests balanced supply and demand.';
  } else {
    return 'Extended market time may indicate pricing or market challenges.';
  }
}

function generateLocationSummary(inputs: PricePerSquareFootInputs): string {
  return `Located in ${inputs.marketLocation} with a ${inputs.schoolRating}/10 school rating and ${inputs.crimeRate} crime rate.`;
}

function generateNeighborhoodAnalysis(inputs: PricePerSquareFootInputs): string {
  const walkScore = inputs.walkScore;
  const transitScore = inputs.transitScore;
  const bikeScore = inputs.bikeScore;
  
  return `The neighborhood offers walkability score of ${walkScore}, transit score of ${transitScore}, and bike score of ${bikeScore}, indicating ${walkScore >= 80 ? 'excellent' : walkScore >= 60 ? 'good' : 'limited'} accessibility.`;
}

function generateAmenityAnalysis(inputs: PricePerSquareFootInputs): string {
  const includedAmenities = inputs.amenities.filter(a => a.included);
  const totalValue = includedAmenities.reduce((sum, a) => sum + a.value, 0);
  
  return `The property includes ${includedAmenities.length} amenities with a total value of $${totalValue.toLocaleString()}.`;
}

function generateRiskAssessment(riskScore: number, inputs: PricePerSquareFootInputs): string {
  if (riskScore < 30) {
    return 'Low risk investment with stable market conditions and competitive pricing.';
  } else if (riskScore < 60) {
    return 'Moderate risk investment with some market and pricing considerations.';
  } else {
    return 'Higher risk investment requiring careful consideration of market and pricing factors.';
  }
}

function generatePriceRisk(overUnderPricedPercentage: number): string {
  if (Math.abs(overUnderPricedPercentage) < 10) {
    return 'Low price risk with pricing aligned with market comparables.';
  } else if (Math.abs(overUnderPricedPercentage) < 20) {
    return 'Moderate price risk with some deviation from market comparables.';
  } else {
    return 'High price risk with significant deviation from market comparables.';
  }
}

function generateMarketRiskAnalysis(inputs: PricePerSquareFootInputs): string {
  switch (inputs.marketCondition) {
    case 'declining': return 'High market risk due to declining market conditions.';
    case 'stable': return 'Low market risk with stable market conditions.';
    case 'growing': return 'Low market risk with positive market growth.';
    case 'hot': return 'Moderate market risk due to potential market correction.';
    default: return 'Standard market risk assessment.';
  }
}

function generateLocationRisk(inputs: PricePerSquareFootInputs): string {
  let riskFactors = [];
  
  if (inputs.crimeRate === 'high') riskFactors.push('high crime rate');
  if (inputs.schoolRating < 6) riskFactors.push('lower school ratings');
  if (inputs.walkScore < 50) riskFactors.push('low walkability');
  
  if (riskFactors.length === 0) {
    return 'Low location risk with favorable neighborhood characteristics.';
  } else {
    return `Moderate location risk due to ${riskFactors.join(', ')}.`;
  }
}

function generatePerformanceSummary(price: number, avgPrice: number): string {
  const performance = ((price - avgPrice) / avgPrice) * 100;
  
  if (performance > 10) {
    return 'Strong performance relative to market comparables.';
  } else if (performance > -10) {
    return 'Average performance relative to market comparables.';
  } else {
    return 'Below average performance relative to market comparables.';
  }
}

function generateTrendPerformance(marketGrowthRate: number): string {
  if (marketGrowthRate > 5) {
    return 'Strong market trend performance with positive growth.';
  } else if (marketGrowthRate > 0) {
    return 'Positive market trend performance.';
  } else {
    return 'Negative market trend performance.';
  }
}

function generateRelativePerformance(price: number, avgPrice: number, marketGrowthRate: number): string {
  const pricePerformance = ((price - avgPrice) / avgPrice) * 100;
  const relative = pricePerformance - marketGrowthRate;
  
  if (relative > 5) {
    return 'Outperforming market growth trends.';
  } else if (relative > -5) {
    return 'Performing in line with market growth trends.';
  } else {
    return 'Underperforming market growth trends.';
  }
}

function generatePricingRecommendations(overUnderPricedPercentage: number, price: number, avgPrice: number): string[] {
  const recommendations: string[] = [];
  
  if (overUnderPricedPercentage > 15) {
    recommendations.push('Consider reducing asking price by 10-15%');
    recommendations.push('Highlight unique property features to justify premium');
    recommendations.push('Monitor market conditions for pricing adjustments');
  } else if (overUnderPricedPercentage > 5) {
    recommendations.push('Consider minor price adjustments if market conditions warrant');
    recommendations.push('Emphasize property advantages in marketing materials');
  } else if (overUnderPricedPercentage < -10) {
    recommendations.push('Current pricing represents excellent value');
    recommendations.push('Consider maintaining price to attract multiple offers');
  } else {
    recommendations.push('Pricing appears competitive with market');
    recommendations.push('Monitor comparable sales for pricing validation');
  }
  
  return recommendations;
}

function generateNegotiationSuggestions(overUnderPricedPercentage: number, inputs: PricePerSquareFootInputs): string[] {
  const suggestions: string[] = [];
  
  if (overUnderPricedPercentage > 10) {
    suggestions.push('Negotiate for price reduction of 5-10%');
    suggestions.push('Request seller concessions for closing costs');
    suggestions.push('Consider requesting property improvements');
  } else if (overUnderPricedPercentage < -5) {
    suggestions.push('Be prepared for competitive bidding');
    suggestions.push('Consider offering above asking price');
    suggestions.push('Minimize contingencies to strengthen offer');
  } else {
    suggestions.push('Standard negotiation approach recommended');
    suggestions.push('Focus on terms rather than significant price changes');
  }
  
  return suggestions;
}

function generateOptimizationStrategies(inputs: PricePerSquareFootInputs, price: number): string[] {
  const strategies: string[] = [];
  
  if (inputs.propertyCondition === 'needs_repair') {
    strategies.push('Consider renovation to increase property value');
    strategies.push('Factor repair costs into purchase price');
  }
  
  if (inputs.amenities.some(a => !a.included && a.value > 10000)) {
    strategies.push('Evaluate adding high-value amenities');
    strategies.push('Calculate ROI for amenity improvements');
  }
  
  if (inputs.marketGrowthRate > 5) {
    strategies.push('Leverage market growth for future appreciation');
    strategies.push('Consider longer-term investment horizon');
  }
  
  return strategies.length > 0 ? strategies : ['Standard optimization strategies apply'];
}

function generateImplementationPlan(recommendation: string, overUnderPricedPercentage: number): string {
  switch (recommendation) {
    case 'Buy': return 'Proceed with purchase due to excellent value and low risk.';
    case 'Consider': return 'Evaluate purchase with attention to market conditions and timing.';
    case 'Negotiate': return 'Engage in price negotiations to achieve better value.';
    case 'Avoid': return 'Consider alternative properties or wait for better market conditions.';
    case 'Requires Review': return 'Conduct additional analysis before making decision.';
    default: return 'Standard implementation approach recommended.';
  }
}

function generateNextSteps(recommendation: string, inputs: PricePerSquareFootInputs): string[] {
  const steps: string[] = [];
  
  switch (recommendation) {
    case 'Buy':
      steps.push('Schedule property inspection');
      steps.push('Secure financing pre-approval');
      steps.push('Submit competitive offer');
      break;
    case 'Consider':
      steps.push('Conduct thorough market research');
      steps.push('Compare with additional properties');
      steps.push('Evaluate timing considerations');
      break;
    case 'Negotiate':
      steps.push('Prepare negotiation strategy');
      steps.push('Identify comparable sales data');
      steps.push('Set maximum offer price');
      break;
    case 'Avoid':
      steps.push('Continue property search');
      steps.push('Monitor market conditions');
      steps.push('Reassess in 3-6 months');
      break;
    case 'Requires Review':
      steps.push('Gather additional market data');
      steps.push('Consult with real estate professional');
      steps.push('Conduct detailed property analysis');
      break;
  }
  
  return steps;
}

function generateTimeline(inputs: PricePerSquareFootInputs, recommendation: string): string {
  switch (recommendation) {
    case 'Buy': return 'Immediate action recommended within 1-2 weeks.';
    case 'Consider': return 'Decision timeline of 2-4 weeks recommended.';
    case 'Negotiate': return 'Negotiation period of 1-3 weeks expected.';
    case 'Avoid': return 'Revisit in 3-6 months based on market changes.';
    case 'Requires Review': return 'Additional analysis period of 1-2 weeks needed.';
    default: return 'Standard timeline applies.';
  }
}

function generateMonitoringPlan(inputs: PricePerSquareFootInputs): string {
  return `Monitor ${inputs.marketLocation} market conditions, comparable sales, and property-specific factors monthly.`;
}

function generateKeyMetrics(price: number, avgPrice: number): string[] {
  return [
    'Price per square foot vs. market average',
    'Days on market trends',
    'Comparable sales activity',
    'Market appreciation rates',
    'Property condition changes'
  ];
}

function generateReviewSchedule(inputs: PricePerSquareFootInputs): string {
  return 'Monthly review of market conditions and quarterly comprehensive analysis recommended.';
}

function generateRiskManagement(riskScore: number, inputs: PricePerSquareFootInputs): string {
  if (riskScore < 40) {
    return 'Low risk profile requires standard monitoring and management.';
  } else if (riskScore < 70) {
    return 'Moderate risk profile requires enhanced monitoring and contingency planning.';
  } else {
    return 'High risk profile requires comprehensive risk management strategies.';
  }
}

function generateMitigationStrategies(riskScore: number, inputs: PricePerSquareFootInputs): string[] {
  const strategies: string[] = [];
  
  if (riskScore > 60) {
    strategies.push('Diversify investment portfolio');
    strategies.push('Maintain adequate cash reserves');
    strategies.push('Consider insurance coverage');
  }
  
  if (inputs.marketCondition === 'declining') {
    strategies.push('Monitor market indicators closely');
    strategies.push('Prepare for potential value adjustments');
  }
  
  if (inputs.propertyCondition === 'needs_repair') {
    strategies.push('Budget for necessary repairs');
    strategies.push('Obtain professional inspections');
  }
  
  return strategies.length > 0 ? strategies : ['Standard risk mitigation practices apply'];
}

function generateContingencyPlans(riskScore: number, inputs: PricePerSquareFootInputs): string[] {
  const plans: string[] = [];
  
  if (riskScore > 70) {
    plans.push('Exit strategy for market downturn');
    plans.push('Alternative investment options');
    plans.push('Emergency fund maintenance');
  }
  
  if (inputs.marketCondition === 'declining') {
    plans.push('Hold strategy for market recovery');
    plans.push('Rental income as backup plan');
  }
  
  return plans.length > 0 ? plans : ['Standard contingency planning recommended'];
}

function generatePerformanceBenchmarks(price: number, avgPrice: number, inputs: PricePerSquareFootInputs): any[] {
  return [
    {
      metric: 'Price per Square Foot',
      target: avgPrice,
      benchmark: price,
      industry: 'Real Estate'
    },
    {
      metric: 'Market Growth Rate',
      target: 3.0,
      benchmark: inputs.marketGrowthRate,
      industry: 'Real Estate'
    },
    {
      metric: 'Days on Market',
      target: 45,
      benchmark: inputs.daysOnMarket,
      industry: 'Real Estate'
    }
  ];
}

function generateDecisionRecommendation(recommendation: string, overUnderPricedPercentage: number, riskScore: number): string {
  return `Based on the analysis, we recommend ${recommendation.toLowerCase()} this property. The ${Math.abs(overUnderPricedPercentage).toFixed(1)}% ${overUnderPricedPercentage > 0 ? 'premium' : 'discount'} pricing and ${riskScore}/100 risk score support this recommendation.`;
}

function generatePresentationPoints(price: number, avgPrice: number, overUnderPricedPercentage: number): string[] {
  return [
    `Property priced at $${price.toFixed(2)} per square foot`,
    `${overUnderPricedPercentage > 0 ? 'Above' : 'Below'} market average by ${Math.abs(overUnderPricedPercentage).toFixed(1)}%`,
    'Comprehensive comparable analysis completed',
    'Market condition assessment included',
    'Risk evaluation performed'
  ];
}

function generateDecisionFactors(inputs: PricePerSquareFootInputs, price: number, avgPrice: number): string[] {
  return [
    'Price per square foot analysis',
    'Comparable property evaluation',
    'Market condition assessment',
    'Property condition evaluation',
    'Location and neighborhood factors',
    'Risk assessment and mitigation'
  ];
}

function generatePriceTrend(inputs: PricePerSquareFootInputs, currentPrice: number): any[] {
  const trends = [];
  const periods = ['3 months ago', '6 months ago', '1 year ago', '2 years ago'];
  
  for (let i = 0; i < periods.length; i++) {
    const monthsAgo = (i + 1) * 3;
    const historicalPrice = currentPrice / Math.pow(1 + inputs.marketGrowthRate / 100, monthsAgo / 12);
    const change = currentPrice - historicalPrice;
    const changePercentage = (change / historicalPrice) * 100;
    
    trends.push({
      period: periods[i],
      averagePrice: historicalPrice,
      medianPrice: historicalPrice * 0.98,
      change: change,
      changePercentage: changePercentage
    });
  }
  
  return trends;
}

function generateSensitivityMatrix(inputs: PricePerSquareFootInputs, basePrice: number): any[] {
  const variables = ['Market Growth Rate', 'Property Condition', 'Days on Market', 'School Rating'];
  const matrix = [];
  
  for (const variable of variables) {
    const values = [-10, -5, 0, 5, 10];
    const impacts = values.map(value => {
      let impact = 0;
      switch (variable) {
        case 'Market Growth Rate':
          impact = basePrice * (value / 100);
          break;
        case 'Property Condition':
          impact = basePrice * (value / 100);
          break;
        case 'Days on Market':
          impact = basePrice * (value / 100);
          break;
        case 'School Rating':
          impact = basePrice * (value / 100);
          break;
      }
      return impact;
    });
    
    matrix.push({
      variable,
      values,
      impacts
    });
  }
  
  return matrix;
}

function generateScenarios(inputs: PricePerSquareFootInputs, basePrice: number): any[] {
  return [
    {
      scenario: 'Optimistic',
      probability: 25,
      pricePerSquareFoot: basePrice * 1.15,
      totalValue: basePrice * 1.15 * inputs.propertySize
    },
    {
      scenario: 'Base Case',
      probability: 50,
      pricePerSquareFoot: basePrice,
      totalValue: basePrice * inputs.propertySize
    },
    {
      scenario: 'Pessimistic',
      probability: 25,
      pricePerSquareFoot: basePrice * 0.85,
      totalValue: basePrice * 0.85 * inputs.propertySize
    }
  ];
}

function generateComparisonAnalysis(inputs: PricePerSquareFootInputs, price: number, avgPrice: number): any[] {
  return [
    {
      metric: 'Price per Square Foot',
      property: price,
      comparable: avgPrice,
      difference: price - avgPrice,
      percentage: ((price - avgPrice) / avgPrice) * 100
    },
    {
      metric: 'Property Size',
      property: inputs.propertySize,
      comparable: inputs.comparableProperties.reduce((sum, prop) => sum + prop.size, 0) / inputs.comparableProperties.length,
      difference: inputs.propertySize - (inputs.comparableProperties.reduce((sum, prop) => sum + prop.size, 0) / inputs.comparableProperties.length),
      percentage: ((inputs.propertySize - (inputs.comparableProperties.reduce((sum, prop) => sum + prop.size, 0) / inputs.comparableProperties.length)) / (inputs.comparableProperties.reduce((sum, prop) => sum + prop.size, 0) / inputs.comparableProperties.length)) * 100
    },
    {
      metric: 'Property Age',
      property: inputs.propertyAge,
      comparable: inputs.comparableProperties.reduce((sum, prop) => sum + prop.age, 0) / inputs.comparableProperties.length,
      difference: inputs.propertyAge - (inputs.comparableProperties.reduce((sum, prop) => sum + prop.age, 0) / inputs.comparableProperties.length),
      percentage: ((inputs.propertyAge - (inputs.comparableProperties.reduce((sum, prop) => sum + prop.age, 0) / inputs.comparableProperties.length)) / (inputs.comparableProperties.reduce((sum, prop) => sum + prop.age, 0) / inputs.comparableProperties.length)) * 100
    }
  ];
}

function generateBenchmarkAnalysis(inputs: PricePerSquareFootInputs, price: number): any[] {
  return [
    {
      metric: 'Price per Square Foot',
      property: price,
      benchmark: 200, // Example benchmark
      difference: price - 200,
      percentile: 75 // Example percentile
    },
    {
      metric: 'Market Growth Rate',
      property: inputs.marketGrowthRate,
      benchmark: 3.0,
      difference: inputs.marketGrowthRate - 3.0,
      percentile: 80
    },
    {
      metric: 'Days on Market',
      property: inputs.daysOnMarket,
      benchmark: 45,
      difference: inputs.daysOnMarket - 45,
      percentile: 60
    }
  ];
}