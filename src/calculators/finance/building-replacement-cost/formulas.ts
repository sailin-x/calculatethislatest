interface ReplacementCostMetrics {
  baseCost: number;
  totalCost: number;
  costPerSqFt: number;
  materialsCost: number;
  laborCost: number;
  overheadCost: number;
  inflationAdjustment: number;
  regionalFactor: number;
  qualityMultiplier: number;
  timeframe: string;
}

interface InsuranceCoverage {
  recommendedCoverage: number;
  minimumCoverage: number;
  bufferAmount: number;
  coverageFactors: string[];
}

interface CostBreakdown {
  summary: string;
  categories: Array<{
    category: string;
    cost: number;
    percentage: number;
  }>;
}

/**
 * Calculate building replacement cost
 */
export function calculateReplacementCost(inputs: Record<string, any>): ReplacementCostMetrics {
  const {
    buildingType,
    constructionQuality,
    totalSquareFootage,
    numberOfStories,
    yearBuilt,
    location,
    foundationType,
    roofType,
    exteriorMaterial,
    heatingSystem,
    coolingSystem,
    kitchenQuality = 'standard',
    bathroomCount = 2,
    bedroomCount = 3,
    garageSpaces = 0,
    specialFeatures = [],
    inflationRate = 3.0,
    demolitionCost = 0,
    sitePreparation = 0
  } = inputs;

  // Get base construction rate
  const baseRate = getBaseConstructionRate(buildingType, constructionQuality);
  
  // Apply quality multiplier
  const qualityMultiplier = getQualityMultiplier(constructionQuality);
  
  // Apply regional factor
  const regionalFactor = getRegionalFactor(location);
  
  // Calculate base cost
  const baseCost = totalSquareFootage * baseRate * qualityMultiplier * regionalFactor;
  
  // Apply inflation adjustment
  const currentYear = new Date().getFullYear();
  const yearsSinceBuilt = currentYear - yearBuilt;
  const inflationAdjustment = baseCost * Math.pow(1 + (inflationRate / 100), yearsSinceBuilt) - baseCost;
  
  // Calculate additional costs
  const foundationCost = calculateFoundationCost(foundationType, totalSquareFootage);
  const roofCost = calculateRoofCost(roofType, totalSquareFootage);
  const exteriorCost = calculateExteriorCost(exteriorMaterial, totalSquareFootage);
  const hvacCost = calculateHVACCost(heatingSystem, coolingSystem, totalSquareFootage);
  const kitchenCost = calculateKitchenCost(kitchenQuality, totalSquareFootage);
  const bathroomCost = calculateBathroomCost(bathroomCount);
  const garageCost = calculateGarageCost(garageSpaces);
  const specialFeaturesCost = calculateSpecialFeaturesCost(specialFeatures, totalSquareFootage);
  
  // Calculate total cost
  const totalCost = baseCost + inflationAdjustment + foundationCost + roofCost + 
    exteriorCost + hvacCost + kitchenCost + bathroomCost + garageCost + 
    specialFeaturesCost + demolitionCost + sitePreparation;
  
  // Calculate cost per square foot
  const costPerSqFt = totalCost / totalSquareFootage;
  
  // Calculate cost breakdown
  const materialsCost = totalCost * 0.5; // 50% materials
  const laborCost = totalCost * 0.4; // 40% labor
  const overheadCost = totalCost * 0.1; // 10% overhead
  
  // Calculate timeframe
  const timeframe = calculateTimeframe(totalSquareFootage, buildingType, constructionQuality);
  
  return {
    baseCost,
    totalCost,
    costPerSqFt,
    materialsCost,
    laborCost,
    overheadCost,
    inflationAdjustment,
    regionalFactor,
    qualityMultiplier,
    timeframe
  };
}

/**
 * Get base construction rate per square foot
 */
function getBaseConstructionRate(buildingType: string, quality: string): number {
  const baseRates: Record<string, Record<string, number>> = {
    'single-family': {
      'economy': 80,
      'standard': 120,
      'custom': 180,
      'luxury': 250,
      'premium': 350
    },
    'multi-family': {
      'economy': 90,
      'standard': 140,
      'custom': 200,
      'luxury': 280,
      'premium': 400
    },
    'commercial': {
      'economy': 100,
      'standard': 160,
      'custom': 220,
      'luxury': 300,
      'premium': 450
    },
    'industrial': {
      'economy': 70,
      'standard': 110,
      'custom': 160,
      'luxury': 220,
      'premium': 320
    },
    'office': {
      'economy': 110,
      'standard': 170,
      'custom': 240,
      'luxury': 320,
      'premium': 480
    },
    'retail': {
      'economy': 95,
      'standard': 150,
      'custom': 210,
      'luxury': 290,
      'premium': 420
    },
    'warehouse': {
      'economy': 60,
      'standard': 90,
      'custom': 130,
      'luxury': 180,
      'premium': 260
    },
    'restaurant': {
      'economy': 120,
      'standard': 190,
      'custom': 270,
      'luxury': 360,
      'premium': 520
    },
    'hotel': {
      'economy': 130,
      'standard': 200,
      'custom': 280,
      'luxury': 380,
      'premium': 550
    },
    'apartment': {
      'economy': 85,
      'standard': 130,
      'custom': 190,
      'luxury': 260,
      'premium': 380
    }
  };
  
  return baseRates[buildingType]?.[quality] || 120;
}

/**
 * Get quality multiplier
 */
function getQualityMultiplier(quality: string): number {
  const multipliers: Record<string, number> = {
    'economy': 0.8,
    'standard': 1.0,
    'custom': 1.3,
    'luxury': 1.6,
    'premium': 2.0
  };
  
  return multipliers[quality] || 1.0;
}

/**
 * Get regional cost factor
 */
function getRegionalFactor(location: string): number {
  const factors: Record<string, number> = {
    'northeast': 1.3,
    'west-coast': 1.4,
    'midwest': 1.0,
    'south': 0.9,
    'southwest': 0.95,
    'mountain': 1.1,
    'rural': 0.8
  };
  
  return factors[location] || 1.0;
}

/**
 * Calculate foundation cost
 */
function calculateFoundationCost(foundationType: string, squareFootage: number): number {
  const rates: Record<string, number> = {
    'slab': 8,
    'crawlspace': 12,
    'basement': 20,
    'pier-beam': 15
  };
  
  return (rates[foundationType] || 12) * squareFootage;
}

/**
 * Calculate roof cost
 */
function calculateRoofCost(roofType: string, squareFootage: number): number {
  const rates: Record<string, number> = {
    'asphalt-shingle': 6,
    'metal': 12,
    'tile': 18,
    'slate': 25,
    'flat': 8
  };
  
  return (rates[roofType] || 6) * squareFootage;
}

/**
 * Calculate exterior material cost
 */
function calculateExteriorCost(material: string, squareFootage: number): number {
  const rates: Record<string, number> = {
    'vinyl-siding': 4,
    'brick': 12,
    'stone': 20,
    'stucco': 8,
    'wood-siding': 10,
    'fiber-cement': 8
  };
  
  return (rates[material] || 4) * squareFootage;
}

/**
 * Calculate HVAC cost
 */
function calculateHVACCost(heating: string, cooling: string, squareFootage: number): number {
  let cost = 0;
  
  // Heating system costs
  const heatingRates: Record<string, number> = {
    'forced-air': 8,
    'heat-pump': 12,
    'radiant': 15,
    'boiler': 10,
    'baseboard': 6
  };
  
  cost += (heatingRates[heating] || 8) * squareFootage;
  
  // Cooling system costs
  const coolingRates: Record<string, number> = {
    'central-ac': 6,
    'heat-pump': 0, // Already included in heating
    'window-units': 2,
    'mini-split': 8,
    'none': 0
  };
  
  cost += (coolingRates[cooling] || 0) * squareFootage;
  
  return cost;
}

/**
 * Calculate kitchen cost
 */
function calculateKitchenCost(quality: string, squareFootage: number): number {
  const rates: Record<string, number> = {
    'basic': 15,
    'standard': 25,
    'upgraded': 40,
    'luxury': 60
  };
  
  // Kitchen typically represents 10-15% of total square footage
  const kitchenArea = squareFootage * 0.12;
  return (rates[quality] || 25) * kitchenArea;
}

/**
 * Calculate bathroom cost
 */
function calculateBathroomCost(bathroomCount: number): number {
  const costPerBathroom = 8000; // Average cost per bathroom
  return bathroomCount * costPerBathroom;
}

/**
 * Calculate garage cost
 */
function calculateGarageCost(garageSpaces: number): number {
  const costPerSpace = 12000; // Average cost per garage space
  return garageSpaces * costPerSpace;
}

/**
 * Calculate special features cost
 */
function calculateSpecialFeaturesCost(features: string[], squareFootage: number): number {
  const featureCosts: Record<string, number> = {
    'fireplace': 5000,
    'pool': 35000,
    'deck': 8000,
    'elevator': 25000,
    'security-system': 3000,
    'smart-home': 15000,
    'solar-panels': 20000,
    'finished-basement': squareFootage * 0.3 * 40, // 30% of square footage at $40/sqft
    'custom-cabinets': 12000,
    'granite-countertops': 8000
  };
  
  return features.reduce((total, feature) => {
    return total + (featureCosts[feature] || 0);
  }, 0);
}

/**
 * Calculate construction timeframe
 */
function calculateTimeframe(squareFootage: number, buildingType: string, quality: string): string {
  let baseTime = squareFootage / 1000; // Base time in months
  
  // Adjust for building type
  const typeMultipliers: Record<string, number> = {
    'single-family': 1.0,
    'multi-family': 1.2,
    'commercial': 1.3,
    'industrial': 1.1,
    'office': 1.4,
    'retail': 1.2,
    'warehouse': 0.8,
    'restaurant': 1.3,
    'hotel': 1.5,
    'apartment': 1.2
  };
  
  baseTime *= typeMultipliers[buildingType] || 1.0;
  
  // Adjust for quality
  const qualityMultipliers: Record<string, number> = {
    'economy': 0.8,
    'standard': 1.0,
    'custom': 1.3,
    'luxury': 1.6,
    'premium': 2.0
  };
  
  baseTime *= qualityMultipliers[quality] || 1.0;
  
  const months = Math.max(3, Math.round(baseTime));
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
  } else {
    return `${months} month${months > 1 ? 's' : ''}`;
  }
}

/**
 * Calculate insurance coverage recommendations
 */
export function calculateInsuranceCoverage(replacementCost: ReplacementCostMetrics): InsuranceCoverage {
  const recommendedCoverage = replacementCost.totalCost * 1.1; // 10% buffer
  const minimumCoverage = replacementCost.totalCost * 0.9; // 90% of replacement cost
  const bufferAmount = recommendedCoverage - replacementCost.totalCost;
  
  const coverageFactors = [
    '10% buffer for contingencies and cost overruns',
    'Covers demolition and debris removal',
    'Includes building code upgrades',
    'Accounts for material price fluctuations',
    'Provides coverage for temporary housing if needed'
  ];
  
  return {
    recommendedCoverage,
    minimumCoverage,
    bufferAmount,
    coverageFactors
  };
}

/**
 * Generate detailed cost breakdown
 */
export function generateCostBreakdown(inputs: Record<string, any>, replacementCost: ReplacementCostMetrics): CostBreakdown {
  const categories = [
    {
      category: 'Materials',
      cost: replacementCost.materialsCost,
      percentage: (replacementCost.materialsCost / replacementCost.totalCost) * 100
    },
    {
      category: 'Labor',
      cost: replacementCost.laborCost,
      percentage: (replacementCost.laborCost / replacementCost.totalCost) * 100
    },
    {
      category: 'Overhead & Profit',
      cost: replacementCost.overheadCost,
      percentage: (replacementCost.overheadCost / replacementCost.totalCost) * 100
    }
  ];
  
  const summary = `Total replacement cost: $${replacementCost.totalCost.toLocaleString()}. Breakdown: ${replacementCost.materialsCost.toLocaleString()} materials (${((replacementCost.materialsCost / replacementCost.totalCost) * 100).toFixed(1)}%), ${replacementCost.laborCost.toLocaleString()} labor (${((replacementCost.laborCost / replacementCost.totalCost) * 100).toFixed(1)}%), ${replacementCost.overheadCost.toLocaleString()} overhead (${((replacementCost.overheadCost / replacementCost.totalCost) * 100).toFixed(1)}%). Cost per square foot: $${replacementCost.costPerSqFt.toFixed(2)}.`;
  
  return {
    summary,
    categories
  };
}

/**
 * Calculate cost comparison with market values
 */
export function calculateMarketComparison(
  replacementCost: number,
  marketValue: number,
  landValue: number
): {
  buildingValue: number;
  replacementToMarketRatio: number;
  landToBuildingRatio: number;
  assessment: string;
} {
  const buildingValue = marketValue - landValue;
  const replacementToMarketRatio = (replacementCost / buildingValue) * 100;
  const landToBuildingRatio = (landValue / buildingValue) * 100;
  
  let assessment = '';
  if (replacementToMarketRatio > 120) {
    assessment = 'Replacement cost significantly higher than market value - may indicate over-insurance or unique construction';
  } else if (replacementToMarketRatio > 100) {
    assessment = 'Replacement cost higher than market value - typical for newer or custom construction';
  } else if (replacementToMarketRatio > 80) {
    assessment = 'Replacement cost in line with market value - appropriate coverage level';
  } else {
    assessment = 'Replacement cost lower than market value - may need coverage review';
  }
  
  return {
    buildingValue,
    replacementToMarketRatio,
    landToBuildingRatio,
    assessment
  };
}
