import { QuickValidationResult } from '../../../types/QuickValidationResult';
import { RealEstateDepreciationScheduleInputs } from './formulas';

export function quickValidateAllInputs(inputs: RealEstateDepreciationScheduleInputs): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  results.push(quickValidatePropertyType(inputs.propertyType));
  results.push(quickValidatePropertyValue(inputs.propertyValue));
  results.push(quickValidateLandValue(inputs.landValue));
  results.push(quickValidateImprovementValue(inputs.improvementValue));
  results.push(quickValidatePlacedInServiceDate(inputs.placedInServiceDate));
  results.push(quickValidateDepreciationMethod(inputs.depreciationMethod));
  results.push(quickValidateCostSegregationPercentages(inputs.costSegregationPercentages));
  results.push(quickValidateConvention(inputs.convention));
  results.push(quickValidateTaxYear(inputs.taxYear));
  results.push(quickValidatePersonalUsePercentage(inputs.personalUsePercentage));
  results.push(quickValidateBonusDepreciation(inputs.bonusDepreciation));
  results.push(quickValidateSection179Deduction(inputs.section179Deduction));
  results.push(quickValidateTaxRate(inputs.taxRate));
  results.push(quickValidateInflationRate(inputs.inflationRate));
  results.push(quickValidateHoldingPeriod(inputs.holdingPeriod));

  return results;
}

function quickValidatePropertyType(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'propertyType', status: 'error', message: 'Property type is required' };
  }
  
  const validTypes = ['residential_rental', 'commercial', 'industrial', 'hotel', 'office', 'retail', 'warehouse', 'land'];
  if (!validTypes.includes(value)) {
    return { field: 'propertyType', status: 'error', message: 'Invalid property type' };
  }
  
  return { field: 'propertyType', status: 'success', message: 'Valid property type' };
}

function quickValidatePropertyValue(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'propertyValue', status: 'error', message: 'Property value must be greater than 0' };
  }
  
  if (value > 100000000) {
    return { field: 'propertyValue', status: 'warning', message: 'Very high property value - verify accuracy' };
  }
  
  return { field: 'propertyValue', status: 'success', message: 'Valid property value' };
}

function quickValidateLandValue(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'landValue', status: 'error', message: 'Land value must be non-negative' };
  }
  
  if (value > 100000000) {
    return { field: 'landValue', status: 'warning', message: 'Very high land value - verify accuracy' };
  }
  
  return { field: 'landValue', status: 'success', message: 'Valid land value' };
}

function quickValidateImprovementValue(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { field: 'improvementValue', status: 'error', message: 'Improvement value must be non-negative' };
  }
  
  if (value > 100000000) {
    return { field: 'improvementValue', status: 'warning', message: 'Very high improvement value - verify accuracy' };
  }
  
  return { field: 'improvementValue', status: 'success', message: 'Valid improvement value' };
}

function quickValidatePlacedInServiceDate(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'placedInServiceDate', status: 'error', message: 'Placed in service date is required' };
  }
  
  try {
    const date = new Date(value);
    const currentDate = new Date();
    
    if (isNaN(date.getTime())) {
      return { field: 'placedInServiceDate', status: 'error', message: 'Invalid date format' };
    }
    
    if (date > currentDate) {
      return { field: 'placedInServiceDate', status: 'warning', message: 'Date is in the future' };
    }
    
    if (date.getFullYear() < 1900) {
      return { field: 'placedInServiceDate', status: 'error', message: 'Date cannot be before 1900' };
    }
    
    return { field: 'placedInServiceDate', status: 'success', message: 'Valid placed in service date' };
  } catch (error) {
    return { field: 'placedInServiceDate', status: 'error', message: 'Invalid date format' };
  }
}

function quickValidateDepreciationMethod(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'depreciationMethod', status: 'error', message: 'Depreciation method is required' };
  }
  
  const validMethods = ['macrs_residential', 'macrs_commercial', 'straight_line', 'cost_segregation'];
  if (!validMethods.includes(value)) {
    return { field: 'depreciationMethod', status: 'error', message: 'Invalid depreciation method' };
  }
  
  return { field: 'depreciationMethod', status: 'success', message: 'Valid depreciation method' };
}

function quickValidateCostSegregationPercentages(value?: any): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'costSegregationPercentages', status: 'success', message: 'Optional field' };
  }
  
  if (typeof value !== 'object') {
    return { field: 'costSegregationPercentages', status: 'error', message: 'Must be an object' };
  }
  
  const totalPercentage = Object.values(value).reduce((sum: number, val: any) => sum + (val || 0), 0);
  if (Math.abs(totalPercentage - 100) > 1) {
    return { field: 'costSegregationPercentages', status: 'warning', message: 'Percentages should total approximately 100%' };
  }
  
  return { field: 'costSegregationPercentages', status: 'success', message: 'Valid cost segregation percentages' };
}

function quickValidateConvention(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'convention', status: 'error', message: 'Depreciation convention is required' };
  }
  
  const validConventions = ['mid-month', 'mid-quarter', 'half-year'];
  if (!validConventions.includes(value)) {
    return { field: 'convention', status: 'error', message: 'Invalid depreciation convention' };
  }
  
  return { field: 'convention', status: 'success', message: 'Valid depreciation convention' };
}

function quickValidateTaxYear(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'taxYear', status: 'error', message: 'Tax year must be greater than 0' };
  }
  
  if (value < 1900 || value > 2100) {
    return { field: 'taxYear', status: 'error', message: 'Tax year must be between 1900 and 2100' };
  }
  
  const currentYear = new Date().getFullYear();
  if (value > currentYear + 5) {
    return { field: 'taxYear', status: 'warning', message: 'Tax year is far in the future' };
  }
  
  return { field: 'taxYear', status: 'success', message: 'Valid tax year' };
}

function quickValidatePersonalUsePercentage(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'personalUsePercentage', status: 'error', message: 'Personal use percentage is required' };
  }
  
  if (value < 0 || value > 100) {
    return { field: 'personalUsePercentage', status: 'error', message: 'Personal use percentage must be between 0% and 100%' };
  }
  
  if (value > 50) {
    return { field: 'personalUsePercentage', status: 'warning', message: 'High personal use may limit depreciation benefits' };
  }
  
  return { field: 'personalUsePercentage', status: 'success', message: 'Valid personal use percentage' };
}

function quickValidateBonusDepreciation(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'bonusDepreciation', status: 'error', message: 'Bonus depreciation is required' };
  }
  
  if (value < 0 || value > 100) {
    return { field: 'bonusDepreciation', status: 'error', message: 'Bonus depreciation must be between 0% and 100%' };
  }
  
  if (value > 50) {
    return { field: 'bonusDepreciation', status: 'warning', message: 'High bonus depreciation rate - verify applicability' };
  }
  
  return { field: 'bonusDepreciation', status: 'success', message: 'Valid bonus depreciation rate' };
}

function quickValidateSection179Deduction(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'section179Deduction', status: 'error', message: 'Section 179 deduction is required' };
  }
  
  if (value < 0) {
    return { field: 'section179Deduction', status: 'error', message: 'Section 179 deduction cannot be negative' };
  }
  
  if (value > 1000000) {
    return { field: 'section179Deduction', status: 'error', message: 'Section 179 deduction cannot exceed $1 million' };
  }
  
  if (value > 500000) {
    return { field: 'section179Deduction', status: 'warning', message: 'High Section 179 deduction - verify limits' };
  }
  
  return { field: 'section179Deduction', status: 'success', message: 'Valid Section 179 deduction' };
}

function quickValidateTaxRate(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'taxRate', status: 'error', message: 'Tax rate must be greater than 0' };
  }
  
  if (value > 50) {
    return { field: 'taxRate', status: 'error', message: 'Tax rate cannot exceed 50%' };
  }
  
  if (value < 10) {
    return { field: 'taxRate', status: 'warning', message: 'Tax rate seems unusually low' };
  }
  
  if (value > 40) {
    return { field: 'taxRate', status: 'warning', message: 'Tax rate seems unusually high' };
  }
  
  return { field: 'taxRate', status: 'success', message: 'Valid tax rate' };
}

function quickValidateInflationRate(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'inflationRate', status: 'error', message: 'Inflation rate is required' };
  }
  
  if (value < -10 || value > 20) {
    return { field: 'inflationRate', status: 'error', message: 'Inflation rate must be between -10% and 20%' };
  }
  
  if (Math.abs(value) > 15) {
    return { field: 'inflationRate', status: 'warning', message: 'Extreme inflation rate - verify accuracy' };
  }
  
  return { field: 'inflationRate', status: 'success', message: 'Valid inflation rate' };
}

function quickValidateHoldingPeriod(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'holdingPeriod', status: 'error', message: 'Holding period must be greater than 0' };
  }
  
  if (value > 50) {
    return { field: 'holdingPeriod', status: 'error', message: 'Holding period cannot exceed 50 years' };
  }
  
  if (value < 1) {
    return { field: 'holdingPeriod', status: 'error', message: 'Holding period must be at least 1 year' };
  }
  
  if (value > 30) {
    return { field: 'holdingPeriod', status: 'warning', message: 'Very long holding period - consider shorter term' };
  }
  
  return { field: 'holdingPeriod', status: 'success', message: 'Valid holding period' };
}