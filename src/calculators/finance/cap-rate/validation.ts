import { ValidationResult } from '../../types/calculator';

/**
 * Validate cap rate calculator inputs
 */
export function validateCapRateInputs(inputs: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = ['propertyValue', 'grossRent'];

  for (const field of requiredFields) {
    if (inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Property value validation
  if (inputs.propertyValue < 50000) {
    errors.push('Property value must be at least $50,000');
  } else if (inputs.propertyValue > 100000000) {
    errors.push('Property value cannot exceed $100 million');
  }

  // Gross rent validation
  if (inputs.grossRent < 1000) {
    errors.push('Gross rent must be at least $1,000');
  } else if (inputs.grossRent > 5000000) {
    errors.push('Gross rent cannot exceed $5 million');
  }

  // Optional field validation
  if (inputs.vacancyRate !== undefined) {
    if (inputs.vacancyRate < 0) {
      errors.push('Vacancy rate cannot be negative');
    } else if (inputs.vacancyRate > 50) {
      errors.push('Vacancy rate cannot exceed 50%');
    }
  }

  if (inputs.propertyTax !== undefined && inputs.propertyTax < 0) {
    errors.push('Property tax cannot be negative');
  } else if (inputs.propertyTax > 100000) {
    errors.push('Property tax cannot exceed $100,000');
  }

  if (inputs.insurance !== undefined && inputs.insurance < 0) {
    errors.push('Insurance cannot be negative');
  } else if (inputs.insurance > 50000) {
    errors.push('Insurance cannot exceed $50,000');
  }

  if (inputs.utilities !== undefined && inputs.utilities < 0) {
    errors.push('Utilities cannot be negative');
  } else if (inputs.utilities > 100000) {
    errors.push('Utilities cannot exceed $100,000');
  }

  if (inputs.maintenance !== undefined && inputs.maintenance < 0) {
    errors.push('Maintenance cannot be negative');
  } else if (inputs.maintenance > 100000) {
    errors.push('Maintenance cannot exceed $100,000');
  }

  if (inputs.propertyManagement !== undefined) {
    if (inputs.propertyManagement < 0) {
      errors.push('Property management fee cannot be negative');
    } else if (inputs.propertyManagement > 20) {
      errors.push('Property management fee cannot exceed 20%');
    }
  }

  if (inputs.hoaFees !== undefined && inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  } else if (inputs.hoaFees > 50000) {
    errors.push('HOA fees cannot exceed $50,000');
  }

  if (inputs.otherExpenses !== undefined && inputs.otherExpenses < 0) {
    errors.push('Other expenses cannot be negative');
  } else if (inputs.otherExpenses > 100000) {
    errors.push('Other expenses cannot exceed $100,000');
  }

  if (inputs.propertyAge !== undefined) {
    if (inputs.propertyAge < 0) {
      errors.push('Property age cannot be negative');
    } else if (inputs.propertyAge > 200) {
      errors.push('Property age cannot exceed 200 years');
    }
  }

  if (inputs.marketCapRate !== undefined) {
    if (inputs.marketCapRate < 1) {
      errors.push('Market cap rate must be at least 1%');
    } else if (inputs.marketCapRate > 20) {
      errors.push('Market cap rate cannot exceed 20%');
    }
  }

  // Cross-field validation
  const rentToValueRatio = (inputs.grossRent / inputs.propertyValue) * 100;
  if (rentToValueRatio < 5) {
    warnings.push('Low rent-to-value ratio may indicate overvaluation');
  } else if (rentToValueRatio > 20) {
    warnings.push('High rent-to-value ratio may indicate undervaluation or high-risk area');
  }

  // Business rule validation
  const totalExpenses = (inputs.propertyTax || 0) + (inputs.insurance || 0) + 
    (inputs.utilities || 0) + (inputs.maintenance || 0) + (inputs.hoaFees || 0) + 
    (inputs.otherExpenses || 0);
  
  if (totalExpenses > inputs.grossRent * 0.8) {
    warnings.push('Total expenses exceed 80% of gross rent - may indicate poor profitability');
  }

  // Vacancy rate business rules
  if (inputs.vacancyRate > 15) {
    warnings.push('High vacancy rate may indicate market or property issues');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate cap rate reasonableness
 */
export function validateCapRateReasonableness(
  capRate: number,
  propertyType: string,
  location: string,
  propertyAge: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Cap rate range validation based on property type
  const expectedRanges: Record<string, { min: number; max: number }> = {
    'single-family': { min: 4.0, max: 8.0 },
    'multi-family': { min: 5.0, max: 9.0 },
    'apartment': { min: 5.5, max: 9.5 },
    'commercial': { min: 6.0, max: 10.0 },
    'office': { min: 6.5, max: 10.5 },
    'retail': { min: 6.0, max: 10.0 },
    'industrial': { min: 7.0, max: 11.0 },
    'warehouse': { min: 7.5, max: 11.5 },
    'mixed-use': { min: 5.5, max: 9.5 }
  };

  const range = expectedRanges[propertyType] || { min: 5.0, max: 9.0 };

  if (capRate < range.min) {
    warnings.push(`Cap rate of ${capRate.toFixed(1)}% is below typical range for ${propertyType} properties (${range.min}-${range.max}%)`);
  } else if (capRate > range.max) {
    warnings.push(`Cap rate of ${capRate.toFixed(1)}% is above typical range for ${propertyType} properties (${range.min}-${range.max}%)`);
  }

  // Location-specific validation
  if (location === 'urban' && capRate < 4.0) {
    warnings.push('Urban properties typically have lower cap rates due to appreciation potential');
  } else if (location === 'rural' && capRate > 10.0) {
    warnings.push('Rural properties may have higher cap rates due to limited appreciation potential');
  }

  // Property age considerations
  if (propertyAge > 30 && capRate < 5.0) {
    warnings.push('Older properties typically require higher cap rates to account for maintenance costs');
  }

  // Extreme value checks
  if (capRate < 2.0) {
    errors.push('Extremely low cap rate may indicate overvaluation or data error');
  } else if (capRate > 15.0) {
    errors.push('Extremely high cap rate may indicate high-risk area or property issues');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
