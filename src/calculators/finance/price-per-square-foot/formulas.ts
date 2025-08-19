export interface PricePerSquareFootInputs {
  propertyPrice: number;
  totalSquareFootage: number;
  propertyType: 'single_family' | 'townhouse' | 'condo' | 'multi_family' | 'commercial' | 'land';
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  lotSize?: number;
  condition?: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_work';
  location?: 'urban' | 'suburban' | 'rural' | 'waterfront' | 'mountain';
  marketAverage?: number;
  comparableProperties?: number;
  features?: string[];
  adjustmentFactors?: number;
  calculationType: 'basic' | 'adjusted' | 'comparison' | 'investment';
  includeLand?: 'yes' | 'no';
}

export interface PricePerSquareFootOutputs {
  basicPricePerSqFt: number;
  adjustedPricePerSqFt: number;
  marketComparison: number;
  valueRating: string;
  featureAdjustments: number;
  conditionAdjustment: number;
  locationAdjustment: number;
  totalAdjustments: number;
  adjustedPropertyValue: number;
  priceRange: string;
  investmentMetrics: string;
  recommendations: string;
}

// Feature value adjustments (in dollars)
const FEATURE_VALUES: Record<string, number> = {
  pool: 25000,
  garage: 15000,
  basement: 20000,
  fireplace: 8000,
  hardwood_floors: 12000,
  granite_countertops: 15000,
  stainless_steel_appliances: 8000,
  central_air: 10000,
  deck_patio: 12000,
  garden: 8000,
  view: 20000,
  gated_community: 15000
};

// Condition adjustments (percentage of property value)
const CONDITION_ADJUSTMENTS: Record<string, number> = {
  excellent: 0.10, // +10%
  good: 0, // No adjustment
  fair: -0.05, // -5%
  poor: -0.15, // -15%
  needs_work: -0.25 // -25%
};

// Location adjustments (percentage of property value)
const LOCATION_ADJUSTMENTS: Record<string, number> = {
  urban: 0.10, // +10%
  suburban: 0, // No adjustment
  rural: -0.05, // -5%
  waterfront: 0.20, // +20%
  mountain: 0.15 // +15%
};

/**
 * Calculate price per square foot with adjustments and market comparison
 */
export function calculatePricePerSquareFoot(inputs: PricePerSquareFootInputs): PricePerSquareFootOutputs {
  const {
    propertyPrice,
    totalSquareFootage,
    propertyType,
    bedrooms = 0,
    bathrooms = 0,
    yearBuilt,
    lotSize = 0,
    condition = 'good',
    location = 'suburban',
    marketAverage,
    comparableProperties = 0,
    features = [],
    adjustmentFactors = 0,
    calculationType,
    includeLand = 'yes'
  } = inputs;

  // Basic price per square foot calculation
  const basicPricePerSqFt = propertyPrice / totalSquareFootage;

  // Calculate feature adjustments
  const featureAdjustments = calculateFeatureAdjustments(features, propertyType);

  // Calculate condition adjustment
  const conditionAdjustment = propertyPrice * CONDITION_ADJUSTMENTS[condition];

  // Calculate location adjustment
  const locationAdjustment = propertyPrice * LOCATION_ADJUSTMENTS[location];

  // Calculate additional adjustment factors
  const additionalAdjustment = propertyPrice * (adjustmentFactors / 100);

  // Total adjustments
  const totalAdjustments = featureAdjustments + conditionAdjustment + locationAdjustment + additionalAdjustment;

  // Adjusted property value
  const adjustedPropertyValue = propertyPrice + totalAdjustments;

  // Adjusted price per square foot
  const adjustedPricePerSqFt = adjustedPropertyValue / totalSquareFootage;

  // Market comparison
  const marketComparison = marketAverage ? ((adjustedPricePerSqFt - marketAverage) / marketAverage) * 100 : 0;

  // Value rating
  const valueRating = determineValueRating(marketComparison, condition, propertyType);

  // Price range
  const priceRange = calculatePriceRange(adjustedPropertyValue, comparableProperties);

  // Investment metrics
  const investmentMetrics = generateInvestmentMetrics(basicPricePerSqFt, adjustedPricePerSqFt, marketComparison, valueRating, propertyType);

  // Recommendations
  const recommendations = generateRecommendations(marketComparison, valueRating, condition, features, propertyType);

  return {
    basicPricePerSqFt,
    adjustedPricePerSqFt,
    marketComparison,
    valueRating,
    featureAdjustments,
    conditionAdjustment,
    locationAdjustment,
    totalAdjustments,
    adjustedPropertyValue,
    priceRange,
    investmentMetrics,
    recommendations
  };
}

/**
 * Calculate feature adjustments based on property features
 */
function calculateFeatureAdjustments(features: string[], propertyType: string): number {
  let totalAdjustment = 0;
  
  features.forEach(feature => {
    if (FEATURE_VALUES[feature]) {
      // Adjust feature values based on property type
      let multiplier = 1;
      
      switch (propertyType) {
        case 'condo':
          multiplier = 0.8; // Condos typically have lower feature values
          break;
        case 'multi_family':
          multiplier = 0.7; // Multi-family properties have lower feature values
          break;
        case 'commercial':
          multiplier = 0.6; // Commercial properties have different feature values
          break;
        case 'land':
          multiplier = 0; // Land doesn't have building features
          break;
        default:
          multiplier = 1; // Single family and townhouse use full values
      }
      
      totalAdjustment += FEATURE_VALUES[feature] * multiplier;
    }
  });
  
  return totalAdjustment;
}

/**
 * Determine value rating based on market comparison and other factors
 */
function determineValueRating(marketComparison: number, condition: string, propertyType: string): string {
  if (marketComparison > 20) {
    return 'Premium Value';
  } else if (marketComparison > 10) {
    return 'Above Market';
  } else if (marketComparison > -5) {
    return 'Good Value';
  } else if (marketComparison > -15) {
    return 'Fair Value';
  } else {
    return 'Below Market';
  }
}

/**
 * Calculate estimated price range
 */
function calculatePriceRange(adjustedValue: number, comparableProperties: number): string {
  const variance = comparableProperties > 0 ? Math.max(0.05, 0.15 - (comparableProperties * 0.002)) : 0.10;
  const minPrice = adjustedValue * (1 - variance);
  const maxPrice = adjustedValue * (1 + variance);
  
  return `$${Math.round(minPrice / 1000)}k - $${Math.round(maxPrice / 1000)}k`;
}

/**
 * Generate investment metrics
 */
function generateInvestmentMetrics(
  basicPricePerSqFt: number,
  adjustedPricePerSqFt: number,
  marketComparison: number,
  valueRating: string,
  propertyType: string
): string {
  let metrics = `**Investment Analysis:**\n`;
  metrics += `- Price per sq ft: $${basicPricePerSqFt.toFixed(2)}\n`;
  
  if (adjustedPricePerSqFt !== basicPricePerSqFt) {
    metrics += `- Adjusted price per sq ft: $${adjustedPricePerSqFt.toFixed(2)}\n`;
  }
  
  metrics += `- Market comparison: ${marketComparison.toFixed(2)}% ${marketComparison >= 0 ? 'above' : 'below'} average\n`;
  metrics += `- Value rating: ${valueRating}\n`;
  
  if (propertyType === 'multi_family' || propertyType === 'commercial') {
    metrics += `- Investment property type\n`;
    metrics += `- Potential for rental income\n`;
  }
  
  return metrics;
}

/**
 * Generate recommendations based on analysis
 */
function generateRecommendations(
  marketComparison: number,
  valueRating: string,
  condition: string,
  features: string[],
  propertyType: string
): string {
  let recommendations = `**Recommendations:**\n`;
  
  if (marketComparison > 15) {
    recommendations += `- Property is priced above market\n`;
    recommendations += `- Consider negotiating or waiting for better timing\n`;
  } else if (marketComparison < -10) {
    recommendations += `- Property is priced below market\n`;
    recommendations += `- Good opportunity for value appreciation\n`;
  } else {
    recommendations += `- Property is priced competitively\n`;
    recommendations += `- Good features for the price point\n`;
  }
  
  if (condition === 'needs_work' || condition === 'poor') {
    recommendations += `- Consider renovation to improve value\n`;
    recommendations += `- Factor in improvement costs\n`;
  }
  
  if (features.length > 5) {
    recommendations += `- Property has premium features\n`;
    recommendations += `- Features justify higher price point\n`;
  }
  
  if (propertyType === 'multi_family' || propertyType === 'commercial') {
    recommendations += `- Monitor market trends for optimal timing\n`;
    recommendations += `- Consider rental potential analysis\n`;
  }
  
  return recommendations;
}

/**
 * Calculate years between two dates
 */
export function calculateYearsBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
}

/**
 * Calculate months between two dates
 */
export function calculateMonthsBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

/**
 * Generate analysis of price per square foot calculation
 */
export function generateAnalysis(
  inputs: PricePerSquareFootInputs,
  outputs: PricePerSquareFootOutputs
): string {
  const {
    propertyPrice,
    totalSquareFootage,
    propertyType,
    condition,
    location,
    marketAverage
  } = inputs;

  const {
    basicPricePerSqFt,
    adjustedPricePerSqFt,
    marketComparison,
    valueRating,
    totalAdjustments
  } = outputs;

  let analysis = `## Price Per Square Foot Analysis for ${propertyType.replace('_', ' ').toUpperCase()}\n\n`;
  
  analysis += `**Property Price:** $${propertyPrice.toLocaleString()}\n`;
  analysis += `**Square Footage:** ${totalSquareFootage.toLocaleString()} sq ft\n`;
  analysis += `**Basic Price per Sq Ft:** $${basicPricePerSqFt.toFixed(2)}\n\n`;

  if (adjustedPricePerSqFt !== basicPricePerSqFt) {
    analysis += `**Adjusted Price per Sq Ft:** $${adjustedPricePerSqFt.toFixed(2)}\n`;
    analysis += `**Total Adjustments:** $${totalAdjustments.toLocaleString()}\n\n`;
  }

  if (marketAverage) {
    analysis += `**Market Average:** $${marketAverage}/sq ft\n`;
    analysis += `**Market Comparison:** ${marketComparison.toFixed(2)}% ${marketComparison >= 0 ? 'above' : 'below'} average\n`;
  }

  analysis += `**Value Rating:** ${valueRating}\n`;
  analysis += `**Condition:** ${condition?.charAt(0).toUpperCase() + condition?.slice(1)}\n`;
  analysis += `**Location:** ${location?.charAt(0).toUpperCase() + location?.slice(1)}\n\n`;

  return analysis;
}