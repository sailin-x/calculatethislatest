import { ValidationResult } from './validation';

export function validatePropertyName(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value || value.trim().length === 0) {
    errors.push('Property name is required');
    return { isValid: false, errors, warnings };
  }

  if (value.trim().length < 3) {
    warnings.push('Property name seems too short');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value || value.trim().length === 0) {
    errors.push('Property address is required');
    return { isValid: false, errors, warnings };
  }

  if (value.trim().length < 10) {
    warnings.push('Property address seems incomplete');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value) {
    errors.push('Property type is required');
    return { isValid: false, errors, warnings };
  }

  const validTypes = ['office', 'retail', 'industrial', 'multifamily', 'hotel', 'mixed_use', 'land', 'other'];
  if (!validTypes.includes(value)) {
    errors.push('Invalid property type');
    return { isValid: false, errors, warnings };
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Property size is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property size must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue <= 0) {
    errors.push('Property size must be greater than 0');
  } else if (numValue < 1000) {
    warnings.push('Property size is unusually small');
  } else if (numValue > 1000000) {
    warnings.push('Property size is unusually large');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateNumberOfUnits(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Number of units is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Number of units must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue <= 0) {
    errors.push('Number of units must be greater than 0');
  } else if (numValue < 5 && allInputs?.propertyType === 'multifamily') {
    warnings.push('Multifamily property with less than 5 units may not be typical');
  } else if (numValue > 1 && allInputs?.propertyType === 'office') {
    warnings.push('Office properties typically have fewer, larger units');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateOccupancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Occupancy rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Occupancy rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 100) {
    errors.push('Occupancy rate must be between 0% and 100%');
  } else if (numValue < 80) {
    warnings.push('Low occupancy rate may indicate market or management issues');
  } else if (numValue > 100) {
    warnings.push('Occupancy rate cannot exceed 100%');
  }

  // Cross-validation with vacancy rate
  if (allInputs?.vacancyRate !== undefined) {
    const vacancyRate = Number(allInputs.vacancyRate);
    if (!isNaN(vacancyRate) && numValue + vacancyRate > 100) {
      warnings.push('Vacancy rate and occupancy rate sum exceeds 100%');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateGrossRentalIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Gross rental income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Gross rental income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Gross rental income cannot be negative');
  } else if (numValue === 0) {
    warnings.push('Gross rental income is zero');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Property taxes are required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property taxes must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Property taxes cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Property insurance is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property insurance must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Property insurance cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateVacancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Vacancy rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 100) {
    errors.push('Vacancy rate must be between 0% and 100%');
  } else if (numValue > 15) {
    warnings.push('High vacancy rate may indicate market or property issues');
  }

  // Cross-validation with occupancy rate
  if (allInputs?.occupancyRate !== undefined) {
    const occupancyRate = Number(allInputs.occupancyRate);
    if (!isNaN(occupancyRate) && numValue + occupancyRate > 100) {
      warnings.push('Vacancy rate and occupancy rate sum exceeds 100%');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCollectionLossRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Collection loss rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 100) {
    errors.push('Collection loss rate must be between 0% and 100%');
  } else if (numValue > 5) {
    warnings.push('High collection loss rate may indicate tenant screening issues');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Property value is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property value must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMarketLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value || value.trim().length === 0) {
    errors.push('Market location is required');
    return { isValid: false, errors, warnings };
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMarketCondition(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value) {
    errors.push('Market condition is required');
    return { isValid: false, errors, warnings };
  }

  const validConditions = ['declining', 'stable', 'growing', 'hot'];
  if (!validConditions.includes(value)) {
    errors.push('Invalid market condition');
    return { isValid: false, errors, warnings };
  }

  // Cross-validation with occupancy rate
  if (allInputs?.occupancyRate !== undefined) {
    const occupancyRate = Number(allInputs.occupancyRate);
    if (!isNaN(occupancyRate)) {
      if (value === 'hot' && occupancyRate < 90) {
        warnings.push('Hot market with low occupancy may indicate property-specific issues');
      }
      if (value === 'declining' && occupancyRate > 95) {
        warnings.push('Declining market with very high occupancy may be unsustainable');
      }
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Market growth rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < -20 || numValue > 50) {
    errors.push('Market growth rate must be between -20% and 50%');
  } else if (numValue > 20) {
    warnings.push('Market growth rate is unusually high');
  } else if (numValue < -10) {
    warnings.push('Market growth rate is unusually low (declining market)');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Analysis period is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Analysis period must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1 || numValue > 30) {
    errors.push('Analysis period must be between 1 and 30 years');
  } else if (numValue < 3) {
    warnings.push('Very short analysis period');
  } else if (numValue > 20) {
    warnings.push('Very long analysis period');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null || value === '') {
    errors.push('Discount rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Discount rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 30) {
    errors.push('Discount rate must be between 0% and 30%');
  } else if (numValue > 15) {
    warnings.push('Discount rate is unusually high');
  } else if (numValue < 3) {
    warnings.push('Discount rate is unusually low');
  }

  return { isValid: errors.length === 0, errors, warnings };
}