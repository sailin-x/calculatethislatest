import { ValidationResult } from '../../../types/calculator';

/**
 * Validate building replacement cost calculator inputs
 */
export function validateBuildingReplacementCostInputs(inputs: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = [
    'buildingType', 'constructionQuality', 'totalSquareFootage', 'numberOfStories',
    'yearBuilt', 'location', 'foundationType', 'roofType', 'exteriorMaterial',
    'heatingSystem', 'coolingSystem'
  ];

  for (const field of requiredFields) {
    if (inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Building type validation
  const validBuildingTypes = [
    'single-family', 'multi-family', 'commercial', 'industrial', 'office',
    'retail', 'warehouse', 'restaurant', 'hotel', 'apartment'
  ];
  if (!validBuildingTypes.includes(inputs.buildingType)) {
    errors.push('Invalid building type');
  }

  // Construction quality validation
  const validQualityLevels = ['economy', 'standard', 'custom', 'luxury', 'premium'];
  if (!validQualityLevels.includes(inputs.constructionQuality)) {
    errors.push('Invalid construction quality level');
  }

  // Square footage validation
  if (inputs.totalSquareFootage < 100) {
    errors.push('Total square footage must be at least 100 sq ft');
  } else if (inputs.totalSquareFootage > 1000000) {
    errors.push('Total square footage cannot exceed 1,000,000 sq ft');
  }

  // Number of stories validation
  if (inputs.numberOfStories < 1) {
    errors.push('Number of stories must be at least 1');
  } else if (inputs.numberOfStories > 50) {
    errors.push('Number of stories cannot exceed 50');
  }

  // Year built validation
  if (inputs.yearBuilt < 1900) {
    errors.push('Year built must be 1900 or later');
  } else if (inputs.yearBuilt > 2030) {
    errors.push('Year built cannot be in the future');
  }

  // Location validation
  const validLocations = [
    'northeast', 'west-coast', 'midwest', 'south', 'southwest', 'mountain', 'rural'
  ];
  if (!validLocations.includes(inputs.location)) {
    errors.push('Invalid location');
  }

  // Foundation type validation
  const validFoundationTypes = ['slab', 'crawlspace', 'basement', 'pier-beam'];
  if (!validFoundationTypes.includes(inputs.foundationType)) {
    errors.push('Invalid foundation type');
  }

  // Roof type validation
  const validRoofTypes = ['asphalt-shingle', 'metal', 'tile', 'slate', 'flat'];
  if (!validRoofTypes.includes(inputs.roofType)) {
    errors.push('Invalid roof type');
  }

  // Exterior material validation
  const validExteriorMaterials = [
    'vinyl-siding', 'brick', 'stone', 'stucco', 'wood-siding', 'fiber-cement'
  ];
  if (!validExteriorMaterials.includes(inputs.exteriorMaterial)) {
    errors.push('Invalid exterior material');
  }

  // Heating system validation
  const validHeatingSystems = ['forced-air', 'heat-pump', 'radiant', 'boiler', 'baseboard'];
  if (!validHeatingSystems.includes(inputs.heatingSystem)) {
    errors.push('Invalid heating system');
  }

  // Cooling system validation
  const validCoolingSystems = ['central-ac', 'heat-pump', 'window-units', 'mini-split', 'none'];
  if (!validCoolingSystems.includes(inputs.coolingSystem)) {
    errors.push('Invalid cooling system');
  }

  // Optional field validation
  if (inputs.kitchenQuality !== undefined) {
    const validKitchenQualities = ['basic', 'standard', 'upgraded', 'luxury'];
    if (!validKitchenQualities.includes(inputs.kitchenQuality)) {
      errors.push('Invalid kitchen quality level');
    }
  }

  if (inputs.bathroomCount !== undefined) {
    if (inputs.bathroomCount < 0.5) {
      errors.push('Bathroom count must be at least 0.5');
    } else if (inputs.bathroomCount > 20) {
      errors.push('Bathroom count cannot exceed 20');
    }
  }

  if (inputs.bedroomCount !== undefined) {
    if (inputs.bedroomCount < 1) {
      errors.push('Bedroom count must be at least 1');
    } else if (inputs.bedroomCount > 20) {
      errors.push('Bedroom count cannot exceed 20');
    }
  }

  if (inputs.garageSpaces !== undefined) {
    if (inputs.garageSpaces < 0) {
      errors.push('Garage spaces cannot be negative');
    } else if (inputs.garageSpaces > 10) {
      errors.push('Garage spaces cannot exceed 10');
    }
  }

  if (inputs.inflationRate !== undefined) {
    if (inputs.inflationRate < 0) {
      errors.push('Inflation rate cannot be negative');
    } else if (inputs.inflationRate > 10) {
      errors.push('Inflation rate cannot exceed 10%');
    }
  }

  if (inputs.demolitionCost !== undefined) {
    if (inputs.demolitionCost < 0) {
      errors.push('Demolition cost cannot be negative');
    } else if (inputs.demolitionCost > 1000000) {
      errors.push('Demolition cost cannot exceed $1,000,000');
    }
  }

  if (inputs.sitePreparation !== undefined) {
    if (inputs.sitePreparation < 0) {
      errors.push('Site preparation cost cannot be negative');
    } else if (inputs.sitePreparation > 500000) {
      errors.push('Site preparation cost cannot exceed $500,000');
    }
  }

  // Cross-field validation
  const currentYear = new Date().getFullYear();
  const yearsSinceBuilt = currentYear - inputs.yearBuilt;
  
  if (yearsSinceBuilt < 0) {
    errors.push('Year built cannot be in the future');
  } else if (yearsSinceBuilt > 100) {
    warnings.push('Very old building may have unique construction methods');
  }

  // Square footage per story validation
  const sqFtPerStory = inputs.totalSquareFootage / inputs.numberOfStories;
  if (sqFtPerStory < 50) {
    warnings.push('Very small square footage per story may indicate data error');
  } else if (sqFtPerStory > 50000) {
    warnings.push('Very large square footage per story may indicate data error');
  }

  // Building type and quality consistency
  if (inputs.buildingType === 'warehouse' && inputs.constructionQuality === 'luxury') {
    warnings.push('Luxury quality may not be typical for warehouse construction');
  }

  if (inputs.buildingType === 'single-family' && inputs.totalSquareFootage > 10000) {
    warnings.push('Very large single-family home may have unique construction requirements');
  }

  // Special features validation
  if (inputs.specialFeatures && Array.isArray(inputs.specialFeatures)) {
    const validFeatures = [
      'fireplace', 'pool', 'deck', 'elevator', 'security-system', 'smart-home',
      'solar-panels', 'finished-basement', 'custom-cabinets', 'granite-countertops'
    ];
    
    for (const feature of inputs.specialFeatures) {
      if (!validFeatures.includes(feature)) {
        warnings.push(`Unknown special feature: ${feature}`);
      }
    }
  }

  // Business rule validation
  const estimatedBaseCost = inputs.totalSquareFootage * 120; // Rough estimate
  if (estimatedBaseCost > 50000000) {
    warnings.push('Very high estimated replacement cost - verify inputs');
  }

  // Regional cost factor validation
  const highCostRegions = ['northeast', 'west-coast'];
  const lowCostRegions = ['rural', 'south'];
  
  if (highCostRegions.includes(inputs.location) && inputs.constructionQuality === 'economy') {
    warnings.push('Economy construction may not be typical in high-cost regions');
  }

  if (lowCostRegions.includes(inputs.location) && inputs.constructionQuality === 'premium') {
    warnings.push('Premium construction may not be typical in low-cost regions');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate construction cost reasonableness
 */
export function validateConstructionCostReasonableness(
  totalSquareFootage: number,
  buildingType: string,
  constructionQuality: string,
  location: string,
  estimatedCost: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Calculate expected cost range
  const baseRates: Record<string, Record<string, number>> = {
    'single-family': { 'economy': 80, 'standard': 120, 'custom': 180, 'luxury': 250, 'premium': 350 },
    'multi-family': { 'economy': 90, 'standard': 140, 'custom': 200, 'luxury': 280, 'premium': 400 },
    'commercial': { 'economy': 100, 'standard': 160, 'custom': 220, 'luxury': 300, 'premium': 450 },
    'industrial': { 'economy': 70, 'standard': 110, 'custom': 160, 'luxury': 220, 'premium': 320 },
    'office': { 'economy': 110, 'standard': 170, 'custom': 240, 'luxury': 320, 'premium': 480 },
    'retail': { 'economy': 95, 'standard': 150, 'custom': 210, 'luxury': 290, 'premium': 420 },
    'warehouse': { 'economy': 60, 'standard': 90, 'custom': 130, 'luxury': 180, 'premium': 260 },
    'restaurant': { 'economy': 120, 'standard': 190, 'custom': 270, 'luxury': 360, 'premium': 520 },
    'hotel': { 'economy': 130, 'standard': 200, 'custom': 280, 'luxury': 380, 'premium': 550 },
    'apartment': { 'economy': 85, 'standard': 130, 'custom': 190, 'luxury': 260, 'premium': 380 }
  };

  const baseRate = baseRates[buildingType]?.[constructionQuality] || 120;
  const regionalFactors: Record<string, number> = {
    'northeast': 1.3, 'west-coast': 1.4, 'midwest': 1.0, 'south': 0.9,
    'southwest': 0.95, 'mountain': 1.1, 'rural': 0.8
  };
  const regionalFactor = regionalFactors[location] || 1.0;

  const expectedCost = totalSquareFootage * baseRate * regionalFactor;
  const costPerSqFt = estimatedCost / totalSquareFootage;
  const expectedCostPerSqFt = expectedCost / totalSquareFootage;

  // Check if cost is within reasonable range (±30%)
  const costRatio = costPerSqFt / expectedCostPerSqFt;
  
  if (costRatio < 0.7) {
    warnings.push('Estimated cost appears low for the specified quality and location');
  } else if (costRatio > 1.3) {
    warnings.push('Estimated cost appears high for the specified quality and location');
  }

  // Check for extreme values
  if (costPerSqFt < 50) {
    warnings.push('Very low cost per square foot - verify construction quality');
  } else if (costPerSqFt > 500) {
    warnings.push('Very high cost per square foot - verify construction quality and features');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate insurance coverage adequacy
 */
export function validateInsuranceCoverageAdequacy(
  replacementCost: number,
  currentCoverage: number,
  marketValue: number,
  landValue: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const buildingValue = marketValue - landValue;
  const coverageRatio = currentCoverage / replacementCost;
  const replacementToMarketRatio = replacementCost / buildingValue;

  // Coverage adequacy checks
  if (coverageRatio < 0.8) {
    errors.push('Insurance coverage is significantly below replacement cost (underinsured)');
  } else if (coverageRatio < 0.9) {
    warnings.push('Insurance coverage may be insufficient - consider increasing coverage');
  } else if (coverageRatio > 1.3) {
    warnings.push('Insurance coverage significantly exceeds replacement cost (over-insured)');
  }

  // Market value comparison
  if (replacementToMarketRatio > 1.5) {
    warnings.push('Replacement cost significantly higher than building market value');
  } else if (replacementToMarketRatio < 0.5) {
    warnings.push('Replacement cost significantly lower than building market value');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate construction timeframe reasonableness
 */
export function validateConstructionTimeframe(
  totalSquareFootage: number,
  buildingType: string,
  constructionQuality: string,
  estimatedMonths: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Calculate expected timeframe
  let expectedMonths = totalSquareFootage / 1000; // Base time
  
  const typeMultipliers: Record<string, number> = {
    'single-family': 1.0, 'multi-family': 1.2, 'commercial': 1.3, 'industrial': 1.1,
    'office': 1.4, 'retail': 1.2, 'warehouse': 0.8, 'restaurant': 1.3,
    'hotel': 1.5, 'apartment': 1.2
  };
  
  expectedMonths *= typeMultipliers[buildingType] || 1.0;
  
  const qualityMultipliers: Record<string, number> = {
    'economy': 0.8, 'standard': 1.0, 'custom': 1.3, 'luxury': 1.6, 'premium': 2.0
  };
  
  expectedMonths *= qualityMultipliers[constructionQuality] || 1.0;
  expectedMonths = Math.max(3, Math.round(expectedMonths));

  // Check timeframe reasonableness
  const timeframeRatio = estimatedMonths / expectedMonths;
  
  if (timeframeRatio < 0.5) {
    warnings.push('Estimated construction time appears very short');
  } else if (timeframeRatio > 2.0) {
    warnings.push('Estimated construction time appears very long');
  }

  // Check for extreme values
  if (estimatedMonths < 2) {
    warnings.push('Construction time less than 2 months may be unrealistic');
  } else if (estimatedMonths > 60) {
    warnings.push('Construction time over 5 years may indicate complex project');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
