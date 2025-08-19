import { QuickValidationResult } from '../../types/QuickValidationResult';
import { PricePerSquareFootInputs } from './formulas';

/**
 * Quick validate property price
 */
export function quickValidatePropertyPrice(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Property price must be positive', severity: 'error' };
  }
  if (value < 10000) {
    return { isValid: false, message: 'Property price seems too low', severity: 'warning' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Property price seems too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid property price', severity: 'success' };
}

/**
 * Quick validate total square footage
 */
export function quickValidateTotalSquareFootage(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Square footage must be positive', severity: 'error' };
  }
  if (value < 100) {
    return { isValid: false, message: 'Square footage seems too small', severity: 'warning' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Square footage seems too large', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid square footage', severity: 'success' };
}

/**
 * Quick validate bedrooms
 */
export function quickValidateBedrooms(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Bedrooms cannot be negative', severity: 'error' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Number of bedrooms seems too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid number of bedrooms', severity: 'success' };
}

/**
 * Quick validate bathrooms
 */
export function quickValidateBathrooms(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Bathrooms cannot be negative', severity: 'error' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Number of bathrooms seems too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid number of bathrooms', severity: 'success' };
}

/**
 * Quick validate year built
 */
export function quickValidateYearBuilt(value: number): QuickValidationResult {
  const currentYear = new Date().getFullYear();
  if (value < 1800) {
    return { isValid: false, message: 'Year built seems too old', severity: 'warning' };
  }
  if (value > currentYear + 2) {
    return { isValid: false, message: 'Year built cannot be in the future', severity: 'error' };
  }
  return { isValid: true, message: 'Valid year built', severity: 'success' };
}

/**
 * Quick validate lot size
 */
export function quickValidateLotSize(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Lot size cannot be negative', severity: 'error' };
  }
  if (value > 1000000) {
    return { isValid: false, message: 'Lot size seems too large', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid lot size', severity: 'success' };
}

/**
 * Quick validate market average
 */
export function quickValidateMarketAverage(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Market average must be positive', severity: 'error' };
  }
  if (value < 10) {
    return { isValid: false, message: 'Market average seems too low', severity: 'warning' };
  }
  if (value > 2000) {
    return { isValid: false, message: 'Market average seems too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid market average', severity: 'success' };
}

/**
 * Quick validate comparable properties
 */
export function quickValidateComparableProperties(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Comparable properties cannot be negative', severity: 'error' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Too many comparable properties', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid number of comparable properties', severity: 'success' };
}

/**
 * Quick validate adjustment factors
 */
export function quickValidateAdjustmentFactors(value: number): QuickValidationResult {
  if (value < -50) {
    return { isValid: false, message: 'Adjustment factor too negative', severity: 'error' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Adjustment factor too high', severity: 'error' };
  }
  if (Math.abs(value) > 25) {
    return { isValid: false, message: 'Large adjustment factor - verify accuracy', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid adjustment factor', severity: 'success' };
}

/**
 * Quick validate price per square foot
 */
export function quickValidatePricePerSquareFoot(propertyPrice: number, squareFootage: number): QuickValidationResult {
  if (propertyPrice <= 0 || squareFootage <= 0) {
    return { isValid: true, message: 'Cannot calculate price per sq ft', severity: 'info' };
  }
  
  const pricePerSqFt = propertyPrice / squareFootage;
  
  if (pricePerSqFt < 10) {
    return { isValid: false, message: 'Price per square foot seems unusually low', severity: 'warning' };
  }
  if (pricePerSqFt > 2000) {
    return { isValid: false, message: 'Price per square foot seems unusually high', severity: 'warning' };
  }
  if (pricePerSqFt < 50) {
    return { isValid: false, message: 'Price per square foot is very low - verify data', severity: 'warning' };
  }
  if (pricePerSqFt > 1000) {
    return { isValid: false, message: 'Price per square foot is very high - verify data', severity: 'warning' };
  }
  
  return { isValid: true, message: `Price per sq ft: $${pricePerSqFt.toFixed(2)}`, severity: 'success' };
}

/**
 * Quick validate property type consistency
 */
export function quickValidatePropertyTypeConsistency(
  propertyType: string,
  bedrooms?: number,
  bathrooms?: number,
  squareFootage?: number
): QuickValidationResult {
  if (propertyType === 'land') {
    if (bedrooms && bedrooms > 0) {
      return { isValid: false, message: 'Land properties should not have bedrooms', severity: 'warning' };
    }
    if (bathrooms && bathrooms > 0) {
      return { isValid: false, message: 'Land properties should not have bathrooms', severity: 'warning' };
    }
    if (squareFootage && squareFootage > 10000) {
      return { isValid: false, message: 'Land square footage seems too large for a building', severity: 'warning' };
    }
  }
  
  if (propertyType === 'condo' && squareFootage && squareFootage > 5000) {
    return { isValid: false, message: 'Condo square footage seems unusually large', severity: 'warning' };
  }
  
  if (propertyType === 'multi_family' && bedrooms && bedrooms < 2) {
    return { isValid: false, message: 'Multi-family properties typically have multiple units', severity: 'warning' };
  }
  
  return { isValid: true, message: 'Property type is consistent', severity: 'success' };
}

/**
 * Quick validate all price per square foot inputs
 */
export function quickValidateAllInputs(inputs: Partial<PricePerSquareFootInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  // Property Price
  if (inputs.propertyPrice !== undefined) {
    results.push(quickValidatePropertyPrice(inputs.propertyPrice));
  } else {
    results.push({ isValid: false, message: 'Property price is required', severity: 'error' });
  }

  // Total Square Footage
  if (inputs.totalSquareFootage !== undefined) {
    results.push(quickValidateTotalSquareFootage(inputs.totalSquareFootage));
  } else {
    results.push({ isValid: false, message: 'Total square footage is required', severity: 'error' });
  }

  // Property Type
  if (inputs.propertyType !== undefined) {
    results.push({ isValid: true, message: 'Valid property type', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Property type is required', severity: 'error' });
  }

  // Bedrooms
  if (inputs.bedrooms !== undefined) {
    results.push(quickValidateBedrooms(inputs.bedrooms));
  } else {
    results.push({ isValid: true, message: 'Bedrooms (optional)', severity: 'info' });
  }

  // Bathrooms
  if (inputs.bathrooms !== undefined) {
    results.push(quickValidateBathrooms(inputs.bathrooms));
  } else {
    results.push({ isValid: true, message: 'Bathrooms (optional)', severity: 'info' });
  }

  // Year Built
  if (inputs.yearBuilt !== undefined) {
    results.push(quickValidateYearBuilt(inputs.yearBuilt));
  } else {
    results.push({ isValid: true, message: 'Year built (optional)', severity: 'info' });
  }

  // Lot Size
  if (inputs.lotSize !== undefined) {
    results.push(quickValidateLotSize(inputs.lotSize));
  } else {
    results.push({ isValid: true, message: 'Lot size (optional)', severity: 'info' });
  }

  // Condition
  if (inputs.condition !== undefined) {
    results.push({ isValid: true, message: 'Valid condition', severity: 'success' });
  } else {
    results.push({ isValid: true, message: 'Condition (optional)', severity: 'info' });
  }

  // Location
  if (inputs.location !== undefined) {
    results.push({ isValid: true, message: 'Valid location', severity: 'success' });
  } else {
    results.push({ isValid: true, message: 'Location (optional)', severity: 'info' });
  }

  // Market Average
  if (inputs.marketAverage !== undefined) {
    results.push(quickValidateMarketAverage(inputs.marketAverage));
  } else {
    results.push({ isValid: true, message: 'Market average (optional)', severity: 'info' });
  }

  // Comparable Properties
  if (inputs.comparableProperties !== undefined) {
    results.push(quickValidateComparableProperties(inputs.comparableProperties));
  } else {
    results.push({ isValid: true, message: 'Comparable properties (optional)', severity: 'info' });
  }

  // Features
  if (inputs.features !== undefined) {
    if (inputs.features.length > 10) {
      results.push({ isValid: false, message: 'Too many features selected', severity: 'warning' });
    } else {
      results.push({ isValid: true, message: 'Valid features', severity: 'success' });
    }
  } else {
    results.push({ isValid: true, message: 'Features (optional)', severity: 'info' });
  }

  // Adjustment Factors
  if (inputs.adjustmentFactors !== undefined) {
    results.push(quickValidateAdjustmentFactors(inputs.adjustmentFactors));
  } else {
    results.push({ isValid: true, message: 'Adjustment factors (optional)', severity: 'info' });
  }

  // Calculation Type
  if (inputs.calculationType !== undefined) {
    results.push({ isValid: true, message: 'Valid calculation type', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Calculation type is required', severity: 'error' });
  }

  // Include Land
  if (inputs.includeLand !== undefined) {
    results.push({ isValid: true, message: 'Valid land inclusion setting', severity: 'success' });
  } else {
    results.push({ isValid: true, message: 'Include land (optional)', severity: 'info' });
  }

  // Price per square foot calculation
  if (inputs.propertyPrice !== undefined && inputs.totalSquareFootage !== undefined) {
    results.push(quickValidatePricePerSquareFoot(inputs.propertyPrice, inputs.totalSquareFootage));
  } else {
    results.push({ isValid: true, message: 'Price per sq ft calculation (requires price and footage)', severity: 'info' });
  }

  // Property type consistency
  if (inputs.propertyType !== undefined) {
    results.push(quickValidatePropertyTypeConsistency(
      inputs.propertyType,
      inputs.bedrooms,
      inputs.bathrooms,
      inputs.totalSquareFootage
    ));
  } else {
    results.push({ isValid: true, message: 'Property type consistency (requires property type)', severity: 'info' });
  }

  return results;
}