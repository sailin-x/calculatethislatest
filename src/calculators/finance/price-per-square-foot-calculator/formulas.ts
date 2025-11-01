import { PricePerSquareFootInputs, PricePerSquareFootOutputs } from './types';

// Calculate basic price per square foot metrics
export function calculateBasicPricePerSqFt(inputs: PricePerSquareFootInputs): {
  pricePerTotalSqFt: number;
  pricePerLivingSqFt: number;
  pricePerLotSqFt: number;
} {
  const pricePerTotalSqFt = inputs.totalSquareFootage > 0 ? inputs.propertyPrice / inputs.totalSquareFootage : 0;
  const pricePerLivingSqFt = inputs.livingAreaSquareFootage > 0 ? inputs.propertyPrice / inputs.livingAreaSquareFootage : 0;
  const pricePerLotSqFt = inputs.includeLotSize && inputs.lotSizeSquareFootage > 0 ?
    inputs.propertyPrice / inputs.lotSizeSquareFootage : 0;

  return {
    pricePerTotalSqFt,
    pricePerLivingSqFt,
    pricePerLotSqFt
  };
}

// Calculate market comparison
export function calculateMarketComparison(inputs: PricePerSquareFootInputs): {
  marketComparison: PricePerSquareFootOutputs['marketComparison'];
  marketAdjustment: number;
  marketPercentile: number;
} {
  const basic = calculateBasicPricePerSqFt(inputs);
  const pricePerSqFt = inputs.livingAreaSquareFootage > 0 ? basic.pricePerLivingSqFt : basic.pricePerTotalSqFt;

  let marketAdjustment = 0;
  let marketComparison: PricePerSquareFootOutputs['marketComparison'] = 'At Market';

  if (inputs.averagePricePerSqFt > 0) {
    marketAdjustment = ((pricePerSqFt - inputs.averagePricePerSqFt) / inputs.averagePricePerSqFt) * 100;

    if (marketAdjustment < -10) {
      marketComparison = 'Below Market';
    } else if (marketAdjustment > 10) {
      marketComparison = 'Above Market';
    }
  }

  // Calculate percentile (simplified)
  let marketPercentile = 50; // default
  if (inputs.medianPricePerSqFt > 0 && inputs.averagePricePerSqFt > 0) {
    const range = inputs.pricePerSqFtRangeHigh - inputs.pricePerSqFtRangeLow;
    if (range > 0) {
      marketPercentile = ((pricePerSqFt - inputs.pricePerSqFtRangeLow) / range) * 100;
      marketPercentile = Math.max(0, Math.min(100, marketPercentile));
    }
  }

  return {
    marketComparison,
    marketAdjustment,
    marketPercentile
  };
}

// Calculate comparable analysis
export function calculateComparableAnalysis(inputs: PricePerSquareFootInputs): {
  averageComparablePricePerSqFt: number;
  comparableAdjustment: number;
  comparableScore: number;
} {
  if (!inputs.comparisonProperties || inputs.comparisonProperties.length === 0) {
    return {
      averageComparablePricePerSqFt: 0,
      comparableAdjustment: 0,
      comparableScore: 50
    };
  }

  // Calculate average price per sq ft from comparables
  const totalPricePerSqFt = inputs.comparisonProperties.reduce((sum, comp) => {
    return sum + (comp.squareFootage > 0 ? comp.price / comp.squareFootage : 0);
  }, 0);

  const averageComparablePricePerSqFt = totalPricePerSqFt / inputs.comparisonProperties.length;

  // Calculate adjustment
  const basic = calculateBasicPricePerSqFt(inputs);
  const subjectPricePerSqFt = inputs.livingAreaSquareFootage > 0 ? basic.pricePerLivingSqFt : basic.pricePerTotalSqFt;
  const comparableAdjustment = averageComparablePricePerSqFt > 0 ?
    ((subjectPricePerSqFt - averageComparablePricePerSqFt) / averageComparablePricePerSqFt) * 100 : 0;

  // Calculate comparable score based on various factors
  let score = 50; // base score

  // Adjust for market comparison
  const marketComp = calculateMarketComparison(inputs);
  if (marketComp.marketComparison === 'At Market') score += 10;
  else if (marketComp.marketComparison === 'Above Market') score += 5;
  else score -= 5;

  // Adjust for number of comparables
  if (inputs.comparisonProperties.length >= 3) score += 10;
  else if (inputs.comparisonProperties.length >= 1) score += 5;

  // Adjust for recency (simplified - assume all are recent)
  score += 5;

  // Adjust for distance (simplified - assume all are close)
  score += 5;

  score = Math.max(0, Math.min(100, score));

  return {
    averageComparablePricePerSqFt,
    comparableAdjustment,
    comparableScore: score
  };
}

// Calculate property metrics
export function calculatePropertyMetrics(inputs: PricePerSquareFootInputs): {
  pricePerBedroom: number;
  pricePerBathroom: number;
  pricePerGarageSpace: number;
} {
  const pricePerBedroom = inputs.bedrooms > 0 ? inputs.propertyPrice / inputs.bedrooms : 0;
  const pricePerBathroom = inputs.bathrooms > 0 ? inputs.propertyPrice / inputs.bathrooms : 0;
  const pricePerGarageSpace = inputs.garageSpaces > 0 ? inputs.propertyPrice / inputs.garageSpaces : 0;

  return {
    pricePerBedroom,
    pricePerBathroom,
    pricePerGarageSpace
  };
}

// Calculate cost analysis
export function calculateCostAnalysis(inputs: PricePerSquareFootInputs): {
  annualCostPerSqFt: number;
  totalMonthlyCostPerSqFt: number;
} {
  const totalAnnualCosts = inputs.annualPropertyTaxes + inputs.homeownersInsurance + (inputs.hoaFees * 12);
  const totalSqFt = inputs.livingAreaSquareFootage > 0 ? inputs.livingAreaSquareFootage : inputs.totalSquareFootage;

  const annualCostPerSqFt = totalSqFt > 0 ? totalAnnualCosts / totalSqFt : 0;
  const totalMonthlyCostPerSqFt = annualCostPerSqFt / 12;

  return {
    annualCostPerSqFt,
    totalMonthlyCostPerSqFt
  };
}

// Calculate quality adjustments
export function calculateQualityAdjustments(inputs: PricePerSquareFootInputs): {
  conditionAdjustment: number;
  qualityAdjustment: number;
  locationAdjustment: number;
} {
  // Condition adjustment
  let conditionAdjustment = 0;
  switch (inputs.propertyCondition) {
    case 'Poor': conditionAdjustment = -15; break;
    case 'Fair': conditionAdjustment = -5; break;
    case 'Good': conditionAdjustment = 0; break;
    case 'Excellent': conditionAdjustment = 5; break;
    case 'New': conditionAdjustment = 10; break;
  }

  // Quality adjustment (kitchen + bathroom average)
  let kitchenAdj = 0, bathroomAdj = 0;
  switch (inputs.kitchenQuality) {
    case 'Basic': kitchenAdj = -5; break;
    case 'Standard': kitchenAdj = 0; break;
    case 'Upgraded': kitchenAdj = 8; break;
    case 'Luxury': kitchenAdj = 15; break;
  }
  switch (inputs.bathroomQuality) {
    case 'Basic': bathroomAdj = -5; break;
    case 'Standard': bathroomAdj = 0; break;
    case 'Upgraded': bathroomAdj = 8; break;
    case 'Luxury': bathroomAdj = 15; break;
  }
  const qualityAdjustment = (kitchenAdj + bathroomAdj) / 2;

  // Location adjustment (simplified - would need market data)
  const locationAdjustment = 0; // Placeholder

  return {
    conditionAdjustment,
    qualityAdjustment,
    locationAdjustment
  };
}

// Calculate size analysis
export function calculateSizeAnalysis(inputs: PricePerSquareFootInputs): {
  sizeCategory: PricePerSquareFootOutputs['sizeCategory'];
  sizeAdjustment: number;
} {
  const livingArea = inputs.livingAreaSquareFootage || inputs.totalSquareFootage;

  let sizeCategory: PricePerSquareFootOutputs['sizeCategory'];
  let sizeAdjustment = 0;

  if (livingArea < 1000) {
    sizeCategory = 'Small';
    sizeAdjustment = -5;
  } else if (livingArea < 2000) {
    sizeCategory = 'Medium';
    sizeAdjustment = 0;
  } else if (livingArea < 3000) {
    sizeCategory = 'Large';
    sizeAdjustment = 3;
  } else {
    sizeCategory = 'Extra Large';
    sizeAdjustment = 5;
  }

  return {
    sizeCategory,
    sizeAdjustment
  };
}

// Calculate age analysis
export function calculateAgeAnalysis(inputs: PricePerSquareFootInputs): {
  propertyAge: number;
  ageAdjustment: number;
} {
  const currentYear = new Date().getFullYear();
  const propertyAge = currentYear - inputs.yearBuilt;

  let ageAdjustment = 0;
  if (propertyAge < 5) ageAdjustment = 10;
  else if (propertyAge < 10) ageAdjustment = 5;
  else if (propertyAge < 20) ageAdjustment = 0;
  else if (propertyAge < 30) ageAdjustment = -5;
  else if (propertyAge < 50) ageAdjustment = -10;
  else ageAdjustment = -15;

  return {
    propertyAge,
    ageAdjustment
  };
}

// Calculate feature adjustments
export function calculateFeatureAdjustments(inputs: PricePerSquareFootInputs): {
  bedroomAdjustment: number;
  bathroomAdjustment: number;
  garageAdjustment: number;
} {
  // Simplified adjustments per feature
  const bedroomAdjustment = 3; // percentage per bedroom
  const bathroomAdjustment = 5; // percentage per bathroom
  const garageAdjustment = 2; // percentage per garage space

  return {
    bedroomAdjustment,
    bathroomAdjustment,
    garageAdjustment
  };
}

// Calculate market timing
export function calculateMarketTiming(inputs: PricePerSquareFootInputs): {
  marketTimingScore: number;
  optimalSellingTime: string;
} {
  let marketTimingScore = 50;

  // Adjust based on market trend
  switch (inputs.marketTrend) {
    case 'Buyers': marketTimingScore += 20; break;
    case 'Sellers': marketTimingScore -= 10; break;
    case 'Balanced': marketTimingScore += 0; break;
  }

  // Adjust based on days on market
  if (inputs.daysOnMarket < 30) marketTimingScore += 15;
  else if (inputs.daysOnMarket > 90) marketTimingScore -= 15;

  marketTimingScore = Math.max(0, Math.min(100, marketTimingScore));

  // Determine optimal selling time
  let optimalSellingTime = 'Spring';
  if (inputs.marketTrend === 'Sellers') {
    optimalSellingTime = 'Now - Seller\'s Market';
  } else if (inputs.marketTrend === 'Buyers') {
    optimalSellingTime = 'Wait for better market conditions';
  }

  return {
    marketTimingScore,
    optimalSellingTime
  };
}

// Calculate risk assessment
export function calculateRiskAssessment(inputs: PricePerSquareFootInputs): {
  marketVolatility: PricePerSquareFootOutputs['marketVolatility'];
  pricingRisk: PricePerSquareFootOutputs['pricingRisk'];
  marketRisk: PricePerSquareFootOutputs['marketRisk'];
} {
  // Market volatility based on market conditions
  let marketVolatility: PricePerSquareFootOutputs['marketVolatility'] = 'Medium';
  if (inputs.comparableSalesCount < 5) marketVolatility = 'High';
  else if (inputs.comparableSalesCount > 20) marketVolatility = 'Low';

  // Pricing risk based on market comparison
  const marketComp = calculateMarketComparison(inputs);
  let pricingRisk: PricePerSquareFootOutputs['pricingRisk'] = 'Medium';
  if (Math.abs(marketComp.marketAdjustment) > 20) pricingRisk = 'High';
  else if (Math.abs(marketComp.marketAdjustment) < 5) pricingRisk = 'Low';

  // Market risk based on days on market and trend
  let marketRisk: PricePerSquareFootOutputs['marketRisk'] = 'Medium';
  if (inputs.daysOnMarket > 120) marketRisk = 'High';
  else if (inputs.daysOnMarket < 30 && inputs.marketTrend === 'Sellers') marketRisk = 'Low';

  return {
    marketVolatility,
    pricingRisk,
    marketRisk
  };
}

// Generate recommendations
export function generateRecommendations(inputs: PricePerSquareFootInputs): {
  pricingStrategy: PricePerSquareFootOutputs['pricingStrategy'];
  marketingRecommendations: string[];
  negotiationTips: string[];
} {
  const marketComp = calculateMarketComparison(inputs);
  const marketTiming = calculateMarketTiming(inputs);

  let pricingStrategy: PricePerSquareFootOutputs['pricingStrategy'] = 'Competitive';
  if (marketComp.marketComparison === 'Above Market' && marketTiming.marketTimingScore > 70) {
    pricingStrategy = 'Aggressive';
  } else if (marketComp.marketComparison === 'Below Market') {
    pricingStrategy = 'Conservative';
  }

  const marketingRecommendations = [];
  if (inputs.propertyCondition === 'Excellent' || inputs.propertyCondition === 'New') {
    marketingRecommendations.push('Highlight property condition and modern features');
  }
  if (inputs.marketTrend === 'Buyers') {
    marketingRecommendations.push('Offer seller concessions to attract buyers');
  }
  if (inputs.comparableSalesCount < 10) {
    marketingRecommendations.push('Consider professional photography and staging');
  }

  const negotiationTips = [];
  if (inputs.marketTrend === 'Sellers') {
    negotiationTips.push('Have some flexibility for repairs and closing costs');
  }
  if (marketComp.marketComparison === 'Above Market') {
    negotiationTips.push('Be prepared to justify price with comps and features');
  }

  return {
    pricingStrategy,
    marketingRecommendations,
    negotiationTips
  };
}

// Main calculation function
export function calculatePricePerSquareFoot(inputs: PricePerSquareFootInputs): PricePerSquareFootOutputs {
  const basic = calculateBasicPricePerSqFt(inputs);
  const marketComp = calculateMarketComparison(inputs);
  const comparableAnalysis = calculateComparableAnalysis(inputs);
  const propertyMetrics = calculatePropertyMetrics(inputs);
  const costAnalysis = calculateCostAnalysis(inputs);
  const qualityAdjustments = calculateQualityAdjustments(inputs);
  const sizeAnalysis = calculateSizeAnalysis(inputs);
  const ageAnalysis = calculateAgeAnalysis(inputs);
  const featureAdjustments = calculateFeatureAdjustments(inputs);
  const marketTiming = calculateMarketTiming(inputs);
  const riskAssessment = calculateRiskAssessment(inputs);
  const recommendations = generateRecommendations(inputs);

  // Calculate estimated fair market value
  const estimatedFairMarketValue = inputs.averagePricePerSqFt *
    (inputs.livingAreaSquareFootage > 0 ? inputs.livingAreaSquareFootage : inputs.totalSquareFootage);

  // Calculate value range
  const valueRangeLow = inputs.pricePerSqFtRangeLow *
    (inputs.livingAreaSquareFootage > 0 ? inputs.livingAreaSquareFootage : inputs.totalSquareFootage);
  const valueRangeHigh = inputs.pricePerSqFtRangeHigh *
    (inputs.livingAreaSquareFootage > 0 ? inputs.livingAreaSquareFootage : inputs.totalSquareFootage);

  // Future projections (simplified)
  const annualAppreciationRate = 3; // Assume 3% annual appreciation
  const projectedValue1Year = inputs.propertyPrice * Math.pow(1 + annualAppreciationRate / 100, 1);
  const projectedValue3Years = inputs.propertyPrice * Math.pow(1 + annualAppreciationRate / 100, 3);
  const projectedValue5Years = inputs.propertyPrice * Math.pow(1 + annualAppreciationRate / 100, 5);

  // Placeholder values for complex calculations
  const rentalYieldPerSqFt = 0; // Would need rental income data
  const capRatePerSqFt = 0; // Would need NOI data
  const seasonalAdjustment = 0; // Would need seasonal data
  const bestSellingMonth = 'May'; // Simplified
  const localEconomicHealth: PricePerSquareFootOutputs['localEconomicHealth'] = 'Moderate';
  const employmentRate = 0; // Would need local data
  const populationGrowth = 0; // Would need local data
  const investmentGrade: PricePerSquareFootOutputs['investmentGrade'] = 'B';
  const rentalDemand: PricePerSquareFootOutputs['rentalDemand'] = 'Medium';
  const appreciationPotential: PricePerSquareFootOutputs['appreciationPotential'] = 'Medium';
  const propertyTaxRate = 0; // Would need local tax data
  const taxAssessmentRatio = 0; // Would need assessment data
  const taxSavingsPotential = 0; // Would need tax data
  const insuranceCostPerSqFt = inputs.homeownersInsurance / (inputs.livingAreaSquareFootage > 0 ? inputs.livingAreaSquareFootage : inputs.totalSquareFootage);
  const floodRisk: PricePerSquareFootOutputs['floodRisk'] = 'Low';
  const estimatedMaintenancePerSqFt = 0.50; // Simplified
  const annualMaintenanceCost = estimatedMaintenancePerSqFt * (inputs.livingAreaSquareFootage > 0 ? inputs.livingAreaSquareFootage : inputs.totalSquareFootage);
  const energyRating: PricePerSquareFootOutputs['energyRating'] = 'C';
  const energyCostPerSqFt = 0; // Would need utility data
  const energySavingsPotential = 0; // Would need efficiency data
  const environmentalRisk: PricePerSquareFootOutputs['environmentalRisk'] = 'Low';
  const naturalHazardRisk: PricePerSquareFootOutputs['naturalHazardRisk'] = 'Low';
  const walkabilityScore = 50; // Would need location data
  const amenityScore = 50; // Would need location data
  const schoolDistrictRating = 5; // Would need school data
  const commuteTime = 0; // Would need location data
  const publicTransportAccess: PricePerSquareFootOutputs['publicTransportAccess'] = 'Good';
  const medianHouseholdIncome = 0; // Would need demographic data
  const averageAge = 0; // Would need demographic data
  const educationLevel: PricePerSquareFootOutputs['educationLevel'] = 'Medium';
  const shortTermOutlook: PricePerSquareFootOutputs['shortTermOutlook'] = 'Stable';
  const longTermOutlook: PricePerSquareFootOutputs['longTermOutlook'] = 'Growing';
  const forecastConfidence: PricePerSquareFootOutputs['forecastConfidence'] = 'Medium';

  // Neighborhood analysis (simplified)
  const neighborhoodAveragePricePerSqFt = inputs.averagePricePerSqFt;
  const neighborhoodMedianPricePerSqFt = inputs.medianPricePerSqFt;
  const neighborhoodPriceRange = {
    low: inputs.pricePerSqFtRangeLow,
    high: inputs.pricePerSqFtRangeHigh
  };

  // Property type analysis (simplified)
  const propertyTypeAveragePricePerSqFt = inputs.averagePricePerSqFt;
  const propertyTypeMedianPricePerSqFt = inputs.medianPricePerSqFt;

  return {
    ...basic,
    ...marketComp,
    estimatedFairMarketValue,
    valueRangeLow,
    valueRangeHigh,
    ...comparableAnalysis,
    ...propertyMetrics,
    ...costAnalysis,
    rentalYieldPerSqFt,
    capRatePerSqFt,
    ...qualityAdjustments,
    ...marketTiming,
    ...riskAssessment,
    ...recommendations,
    projectedValue1Year,
    projectedValue3Years,
    projectedValue5Years,
    annualAppreciationRate,
    neighborhoodAveragePricePerSqFt,
    neighborhoodMedianPricePerSqFt,
    neighborhoodPriceRange,
    propertyTypeAveragePricePerSqFt,
    propertyTypeMedianPricePerSqFt,
    ...sizeAnalysis,
    ...ageAnalysis,
    ...featureAdjustments,
    seasonalAdjustment,
    bestSellingMonth,
    localEconomicHealth,
    employmentRate,
    populationGrowth,
    investmentGrade,
    rentalDemand,
    appreciationPotential,
    propertyTaxRate,
    taxAssessmentRatio,
    taxSavingsPotential,
    insuranceCostPerSqFt,
    floodRisk,
    estimatedMaintenancePerSqFt,
    annualMaintenanceCost,
    energyRating,
    energyCostPerSqFt,
    energySavingsPotential,
    environmentalRisk,
    naturalHazardRisk,
    walkabilityScore,
    amenityScore,
    schoolDistrictRating,
    commuteTime,
    publicTransportAccess,
    medianHouseholdIncome,
    averageAge,
    educationLevel,
    shortTermOutlook,
    longTermOutlook,
    forecastConfidence
  };
}