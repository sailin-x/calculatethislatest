import { RealEstateDepreciationScheduleInputs, RealEstateDepreciationScheduleValidation } from './types';

export function validateRealEstateDepreciationScheduleInputs(inputs: RealEstateDepreciationScheduleInputs): RealEstateDepreciationScheduleValidation {
  return {
    propertyCost: validatePropertyCost(inputs.propertyCost),
    landValue: validateLandValue(inputs.landValue),
    placedInServiceDate: validatePlacedInServiceDate(inputs.placedInServiceDate),
    propertyType: validatePropertyType(inputs.propertyType),
    depreciationMethod: validateDepreciationMethod(inputs.depreciationMethod),
    bonusDepreciationPercentage: validateBonusDepreciationPercentage(inputs.bonusDepreciationPercentage),
    section179Deduction: validateSection179Deduction(inputs.section179Deduction),
    costSegregation: validateCostSegregation(inputs.costSegregation),
    costSegregationAmount: validateCostSegregationAmount(inputs.costSegregationAmount),
    costSegregationBreakdown: validateCostSegregationBreakdown(inputs.costSegregationBreakdown),
    taxYear: validateTaxYear(inputs.taxYear),
    disposalDate: validateDisposalDate(inputs.disposalDate),
    disposalValue: validateDisposalValue(inputs.disposalValue),
    recaptureRate: validateRecaptureRate(inputs.recaptureRate)
  };
}

export function validatePropertyCost(cost: number): boolean {
  return cost > 0 && cost <= 1000000000; // Max $1 billion
}

export function validateLandValue(value: number): boolean {
  return value >= 0 && value <= 1000000000; // Max $1 billion
}

export function validatePlacedInServiceDate(date: string): boolean {
  if (!date) return false;
  
  const dateObj = new Date(date);
  const currentYear = new Date().getFullYear();
  
  return !isNaN(dateObj.getTime()) && 
         dateObj.getFullYear() >= 1900 && 
         dateObj.getFullYear() <= currentYear + 5;
}

export function validatePropertyType(type: string): boolean {
  return ['residential', 'commercial', 'mixed-use'].includes(type);
}

export function validateDepreciationMethod(method: string): boolean {
  return ['straight-line', 'accelerated', 'bonus'].includes(method);
}

export function validateBonusDepreciationPercentage(percentage: number): boolean {
  return percentage >= 0 && percentage <= 100;
}

export function validateSection179Deduction(deduction: number): boolean {
  return deduction >= 0 && deduction <= 1080000; // 2023 limit
}

export function validateCostSegregation(enabled: boolean): boolean {
  return typeof enabled === 'boolean';
}

export function validateCostSegregationAmount(amount: number): boolean {
  return amount >= 0 && amount <= 100000000; // Max $100 million
}

export function validateCostSegregationBreakdown(breakdown: any): boolean {
  if (!breakdown) return true;
  
  const requiredFields = ['fiveYear', 'sevenYear', 'fifteenYear', 'twentySevenPointFiveYear', 'thirtyNineYear'];
  return requiredFields.every(field => 
    typeof breakdown[field] === 'number' && 
    breakdown[field] >= 0 && 
    breakdown[field] <= 100000000
  );
}

export function validateTaxYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 5;
}

export function validateDisposalDate(date: string | undefined): boolean {
  if (!date) return true; // Optional field
  
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
}

export function validateDisposalValue(value: number | undefined): boolean {
  if (value === undefined) return true; // Optional field
  return value >= 0 && value <= 1000000000; // Max $1 billion
}

export function validateRecaptureRate(rate: number): boolean {
  return rate >= 0 && rate <= 1; // 0% to 100%
}

export function getValidationErrors(inputs: RealEstateDepreciationScheduleInputs): string[] {
  const errors: string[] = [];
  const validation = validateRealEstateDepreciationScheduleInputs(inputs);

  if (!validation.propertyCost) {
    errors.push('Property cost must be greater than $0 and less than $1 billion');
  }

  if (!validation.landValue) {
    errors.push('Land value must be between $0 and $1 billion');
  }

  if (!validation.placedInServiceDate) {
    errors.push('Placed in service date must be a valid date');
  }

  if (!validation.propertyType) {
    errors.push('Property type must be residential, commercial, or mixed-use');
  }

  if (!validation.depreciationMethod) {
    errors.push('Depreciation method must be straight-line, accelerated, or bonus');
  }

  if (!validation.bonusDepreciationPercentage) {
    errors.push('Bonus depreciation percentage must be between 0% and 100%');
  }

  if (!validation.section179Deduction) {
    errors.push('Section 179 deduction must be between $0 and $1,080,000');
  }

  if (!validation.costSegregation) {
    errors.push('Cost segregation must be a boolean value');
  }

  if (!validation.costSegregationAmount) {
    errors.push('Cost segregation amount must be between $0 and $100 million');
  }

  if (!validation.costSegregationBreakdown) {
    errors.push('Cost segregation breakdown must have valid values for all categories');
  }

  if (!validation.taxYear) {
    errors.push('Tax year must be between 1900 and current year + 5');
  }

  if (!validation.disposalDate) {
    errors.push('Disposal date must be a valid date');
  }

  if (!validation.disposalValue) {
    errors.push('Disposal value must be between $0 and $1 billion');
  }

  if (!validation.recaptureRate) {
    errors.push('Recapture rate must be between 0% and 100%');
  }

  // Additional business logic validations
  if (inputs.landValue >= inputs.propertyCost) {
    errors.push('Land value cannot exceed property cost');
  }

  if (inputs.costSegregation && inputs.costSegregationAmount <= 0) {
    errors.push('Cost segregation amount must be greater than $0 when cost segregation is enabled');
  }

  if (inputs.disposalDate && inputs.disposalValue === undefined) {
    errors.push('Disposal value is required when disposal date is provided');
  }

  if (inputs.disposalDate && inputs.disposalValue !== undefined) {
    const placedInService = new Date(inputs.placedInServiceDate);
    const disposal = new Date(inputs.disposalDate);
    if (disposal <= placedInService) {
      errors.push('Disposal date must be after placed in service date');
    }
  }

  return errors;
}

export function validateRealEstateDepreciationScheduleCalculation(inputs: RealEstateDepreciationScheduleInputs): boolean {
  const validation = validateRealEstateDepreciationScheduleInputs(inputs);
  return Object.values(validation).every(Boolean);
}