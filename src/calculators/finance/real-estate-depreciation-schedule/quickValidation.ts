import { RealEstateDepreciationScheduleInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof RealEstateDepreciationScheduleInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'propertyName':
      return validatePropertyName(value);
    case 'propertyType':
      return validatePropertyType(value);
    case 'propertyAddress':
      return validatePropertyAddress(value);
    case 'acquisitionDate':
      return validateAcquisitionDate(value);
    case 'placedInServiceDate':
      return validatePlacedInServiceDate(value, allInputs);
    case 'totalCost':
      return validateTotalCost(value);
    case 'landValue':
      return validateLandValue(value, allInputs);
    case 'buildingValue':
      return validateBuildingValue(value, allInputs);
    case 'improvementsValue':
      return validateImprovementsValue(value, allInputs);
    case 'personalPropertyValue':
      return validatePersonalPropertyValue(value, allInputs);
    case 'depreciationMethod':
      return validateDepreciationMethod(value);
    case 'recoveryPeriod':
      return validateRecoveryPeriod(value, allInputs);
    case 'convention':
      return validateConvention(value);
    case 'salvageValue':
      return validateSalvageValue(value, allInputs);
    case 'salvageValuePercentage':
      return validateSalvageValuePercentage(value);
    case 'costSegregationStudyCost':
      return validateCostSegregationStudyCost(value, allInputs);
    case 'bonusDepreciationPercentage':
      return validateBonusDepreciationPercentage(value);
    case 'bonusDepreciationYear':
      return validateBonusDepreciationYear(value);
    case 'section179Deduction':
      return validateSection179Deduction(value);
    case 'section179Year':
      return validateSection179Year(value);
    case 'dispositionDate':
      return validateDispositionDate(value, allInputs);
    case 'dispositionAmount':
      return validateDispositionAmount(value);
    case 'adjustedBasis':
      return validateAdjustedBasis(value);
    case 'taxYear':
      return validateTaxYear(value);
    case 'taxRate':
      return validateTaxRate(value, allInputs);
    case 'stateTaxRate':
      return validateStateTaxRate(value, allInputs);
    case 'localTaxRate':
      return validateLocalTaxRate(value, allInputs);
    case 'amtAdjustments':
      return validateAMTAdjustments(value);
    default:
      return { isValid: true };
  }
}

function validatePropertyName(value: any): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Property name is required' };
  }
  if (value.length > 100) {
    return { isValid: false, error: 'Property name must be 100 characters or less' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Property type is required' };
  }
  const validTypes = ['residential', 'commercial', 'mixed-use', 'industrial', 'retail', 'office', 'hotel', 'multifamily', 'single-family', 'land-development'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid property type' };
  }
  return { isValid: true };
}

function validatePropertyAddress(value: any): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Property address is required' };
  }
  if (value.length > 200) {
    return { isValid: false, error: 'Property address must be 200 characters or less' };
  }
  return { isValid: true };
}

function validateAcquisitionDate(value: any): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Acquisition date is required' };
  }
  if (!isValidDate(value)) {
    return { isValid: false, error: 'Acquisition date must be a valid date' };
  }
  return { isValid: true };
}

function validatePlacedInServiceDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Placed in service date is required' };
  }
  if (!isValidDate(value)) {
    return { isValid: false, error: 'Placed in service date must be a valid date' };
  }
  if (allInputs?.acquisitionDate && new Date(value) < new Date(allInputs.acquisitionDate)) {
    return { isValid: false, error: 'Placed in service date cannot be before acquisition date' };
  }
  return { isValid: true };
}

function validateTotalCost(value: any): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Total cost must be greater than 0' };
  }
  if (value > 1000000000) {
    return { isValid: false, error: 'Total cost cannot exceed $1 billion' };
  }
  return { isValid: true };
}

function validateLandValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Land value cannot be negative' };
  }
  if (allInputs?.totalCost && value > allInputs.totalCost) {
    return { isValid: false, error: 'Land value cannot exceed total cost' };
  }
  return { isValid: true };
}

function validateBuildingValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Building value cannot be negative' };
  }
  if (allInputs?.totalCost && allInputs?.landValue && allInputs?.improvementsValue && allInputs?.personalPropertyValue) {
    const totalImprovements = value + allInputs.improvementsValue + allInputs.personalPropertyValue;
    const maxImprovements = allInputs.totalCost - allInputs.landValue;
    if (totalImprovements > maxImprovements) {
      return { isValid: false, error: 'Building + Improvements + Personal Property cannot exceed Total Cost - Land Value' };
    }
  }
  return { isValid: true };
}

function validateImprovementsValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Improvements value cannot be negative' };
  }
  if (allInputs?.totalCost && allInputs?.landValue && allInputs?.buildingValue && allInputs?.personalPropertyValue) {
    const totalImprovements = allInputs.buildingValue + value + allInputs.personalPropertyValue;
    const maxImprovements = allInputs.totalCost - allInputs.landValue;
    if (totalImprovements > maxImprovements) {
      return { isValid: false, error: 'Building + Improvements + Personal Property cannot exceed Total Cost - Land Value' };
    }
  }
  return { isValid: true };
}

function validatePersonalPropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Personal property value cannot be negative' };
  }
  if (allInputs?.totalCost && allInputs?.landValue && allInputs?.buildingValue && allInputs?.improvementsValue) {
    const totalImprovements = allInputs.buildingValue + allInputs.improvementsValue + value;
    const maxImprovements = allInputs.totalCost - allInputs.landValue;
    if (totalImprovements > maxImprovements) {
      return { isValid: false, error: 'Building + Improvements + Personal Property cannot exceed Total Cost - Land Value' };
    }
  }
  return { isValid: true };
}

function validateDepreciationMethod(value: any): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Depreciation method is required' };
  }
  const validMethods = ['straight-line', 'accelerated', 'bonus', 'cost-segregation', 'section-179', 'bonus-depreciation'];
  if (!validMethods.includes(value)) {
    return { isValid: false, error: 'Invalid depreciation method' };
  }
  return { isValid: true };
}

function validateRecoveryPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Recovery period must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Recovery period cannot exceed 50 years' };
  }
  
  // Property type specific validation
  if (allInputs?.propertyType) {
    switch (allInputs.propertyType) {
      case 'residential':
        if (value !== 27.5) {
          return { isValid: false, error: 'Residential property typically uses 27.5-year recovery period' };
        }
        break;
      case 'commercial':
      case 'office':
      case 'retail':
      case 'industrial':
      case 'hotel':
        if (value !== 39) {
          return { isValid: false, error: 'Commercial property typically uses 39-year recovery period' };
        }
        break;
      case 'land-development':
        if (value < 5 || value > 15) {
          return { isValid: false, error: 'Land development typically uses 5-15 year recovery period' };
        }
        break;
    }
  }
  
  return { isValid: true };
}

function validateConvention(value: any): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Convention is required' };
  }
  const validConventions = ['mid-month', 'mid-quarter', 'half-year', 'full-year'];
  if (!validConventions.includes(value)) {
    return { isValid: false, error: 'Invalid convention' };
  }
  return { isValid: true };
}

function validateSalvageValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Salvage value cannot be negative' };
  }
  if (allInputs?.totalCost && value > allInputs.totalCost) {
    return { isValid: false, error: 'Salvage value cannot exceed total cost' };
  }
  return { isValid: true };
}

function validateSalvageValuePercentage(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Salvage value percentage cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Salvage value percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateCostSegregationStudyCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Cost segregation study cost cannot be negative' };
  }
  if (allInputs?.totalCost && value > allInputs.totalCost * 0.1) {
    return { isValid: false, error: 'Cost segregation study cost cannot exceed 10% of total cost' };
  }
  return { isValid: true };
}

function validateBonusDepreciationPercentage(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Bonus depreciation percentage cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Bonus depreciation percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateBonusDepreciationYear(value: any): ValidationResult {
  if (value < 2017) {
    return { isValid: false, error: 'Bonus depreciation year must be 2017 or later' };
  }
  if (value > new Date().getFullYear() + 10) {
    return { isValid: false, error: 'Bonus depreciation year cannot be more than 10 years in the future' };
  }
  return { isValid: true };
}

function validateSection179Deduction(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Section 179 deduction cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Section 179 deduction cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateSection179Year(value: any): ValidationResult {
  if (value < 2017) {
    return { isValid: false, error: 'Section 179 year must be 2017 or later' };
  }
  if (value > new Date().getFullYear() + 10) {
    return { isValid: false, error: 'Section 179 year cannot be more than 10 years in the future' };
  }
  return { isValid: true };
}

function validateDispositionDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value && !isValidDate(value)) {
    return { isValid: false, error: 'Disposition date must be a valid date' };
  }
  if (value && allInputs?.acquisitionDate && new Date(value) < new Date(allInputs.acquisitionDate)) {
    return { isValid: false, error: 'Disposition date cannot be before acquisition date' };
  }
  return { isValid: true };
}

function validateDispositionAmount(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Disposition amount cannot be negative' };
  }
  return { isValid: true };
}

function validateAdjustedBasis(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Adjusted basis cannot be negative' };
  }
  return { isValid: true };
}

function validateTaxYear(value: any): ValidationResult {
  if (value < 2017) {
    return { isValid: false, error: 'Tax year must be 2017 or later' };
  }
  if (value > new Date().getFullYear() + 10) {
    return { isValid: false, error: 'Tax year cannot be more than 10 years in the future' };
  }
  return { isValid: true };
}

function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Federal tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Federal tax rate cannot exceed 50%' };
  }
  if (allInputs?.stateTaxRate && allInputs?.localTaxRate) {
    const totalTaxRate = value + allInputs.stateTaxRate + allInputs.localTaxRate;
    if (totalTaxRate > 70) {
      return { isValid: false, error: 'Combined tax rate (federal + state + local) cannot exceed 70%' };
    }
  }
  return { isValid: true };
}

function validateStateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'State tax rate cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, error: 'State tax rate cannot exceed 20%' };
  }
  if (allInputs?.taxRate && allInputs?.localTaxRate) {
    const totalTaxRate = allInputs.taxRate + value + allInputs.localTaxRate;
    if (totalTaxRate > 70) {
      return { isValid: false, error: 'Combined tax rate (federal + state + local) cannot exceed 70%' };
    }
  }
  return { isValid: true };
}

function validateLocalTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Local tax rate cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Local tax rate cannot exceed 10%' };
  }
  if (allInputs?.taxRate && allInputs?.stateTaxRate) {
    const totalTaxRate = allInputs.taxRate + allInputs.stateTaxRate + value;
    if (totalTaxRate > 70) {
      return { isValid: false, error: 'Combined tax rate (federal + state + local) cannot exceed 70%' };
    }
  }
  return { isValid: true };
}

function validateAMTAdjustments(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'AMT adjustments cannot be negative' };
  }
  return { isValid: true };
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}