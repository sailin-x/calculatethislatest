import { RealEstateDepreciationScheduleInputs } from './formulas';

export function validateRealEstateDepreciationScheduleInputs(inputs: RealEstateDepreciationScheduleInputs): string[] {
  const errors: string[] = [];

  // Required field validations
  if (!inputs.propertyType) errors.push('Property type is required');
  if (!inputs.propertyValue) errors.push('Property value is required');
  if (!inputs.landValue) errors.push('Land value is required');
  if (!inputs.improvementValue) errors.push('Improvement value is required');
  if (!inputs.placedInServiceDate) errors.push('Placed in service date is required');
  if (!inputs.depreciationMethod) errors.push('Depreciation method is required');
  if (!inputs.convention) errors.push('Depreciation convention is required');
  if (!inputs.taxYear) errors.push('Tax year is required');
  if (inputs.personalUsePercentage === undefined || inputs.personalUsePercentage === null) errors.push('Personal use percentage is required');
  if (inputs.bonusDepreciation === undefined || inputs.bonusDepreciation === null) errors.push('Bonus depreciation is required');
  if (inputs.section179Deduction === undefined || inputs.section179Deduction === null) errors.push('Section 179 deduction is required');
  if (!inputs.taxRate) errors.push('Tax rate is required');
  if (inputs.inflationRate === undefined || inputs.inflationRate === null) errors.push('Inflation rate is required');
  if (!inputs.holdingPeriod) errors.push('Holding period is required');

  // Range validations
  if (inputs.propertyValue < 0 || inputs.propertyValue > 1000000000) errors.push('Property value must be between $0 and $1 billion');
  if (inputs.landValue < 0 || inputs.landValue > 1000000000) errors.push('Land value must be between $0 and $1 billion');
  if (inputs.improvementValue < 0 || inputs.improvementValue > 1000000000) errors.push('Improvement value must be between $0 and $1 billion');
  if (inputs.taxYear < 1900 || inputs.taxYear > 2100) errors.push('Tax year must be between 1900 and 2100');
  if (inputs.personalUsePercentage < 0 || inputs.personalUsePercentage > 100) errors.push('Personal use percentage must be between 0% and 100%');
  if (inputs.bonusDepreciation < 0 || inputs.bonusDepreciation > 100) errors.push('Bonus depreciation must be between 0% and 100%');
  if (inputs.section179Deduction < 0 || inputs.section179Deduction > 1000000) errors.push('Section 179 deduction must be between $0 and $1 million');
  if (inputs.taxRate < 0 || inputs.taxRate > 50) errors.push('Tax rate must be between 0% and 50%');
  if (inputs.inflationRate < -10 || inputs.inflationRate > 20) errors.push('Inflation rate must be between -10% and 20%');
  if (inputs.holdingPeriod < 1 || inputs.holdingPeriod > 50) errors.push('Holding period must be between 1 and 50 years');

  // Business logic validations
  validateBusinessLogic(inputs, errors);

  return errors;
}

function validateBusinessLogic(inputs: RealEstateDepreciationScheduleInputs, errors: string[]): void {
  // Property value consistency
  if (inputs.landValue + inputs.improvementValue > inputs.propertyValue * 1.1) {
    errors.push('Land value plus improvement value should not exceed property value by more than 10%');
  }

  if (inputs.landValue + inputs.improvementValue < inputs.propertyValue * 0.9) {
    errors.push('Land value plus improvement value should not be less than 90% of property value');
  }

  // Land value reasonableness
  if (inputs.landValue > inputs.propertyValue * 0.8) {
    errors.push('Land value seems unusually high compared to total property value');
  }

  // Personal use percentage
  if (inputs.personalUsePercentage > 50) {
    errors.push('Personal use percentage above 50% may limit depreciation benefits');
  }

  // Bonus depreciation validation
  if (inputs.bonusDepreciation > 0 && inputs.propertyType === 'land') {
    errors.push('Bonus depreciation is not applicable to land-only properties');
  }

  // Section 179 validation
  if (inputs.section179Deduction > inputs.improvementValue) {
    errors.push('Section 179 deduction cannot exceed improvement value');
  }

  // Cost segregation validation
  if (inputs.depreciationMethod === 'cost_segregation') {
    if (!inputs.costSegregationPercentages) {
      errors.push('Cost segregation percentages are required for cost segregation method');
    } else {
      const totalPercentage = Object.values(inputs.costSegregationPercentages).reduce((sum, val) => sum + (val || 0), 0);
      if (Math.abs(totalPercentage - 100) > 1) {
        errors.push('Cost segregation percentages must total approximately 100%');
      }
    }
  }

  // Date validation
  try {
    const placedInServiceDate = new Date(inputs.placedInServiceDate);
    const currentDate = new Date();
    
    if (placedInServiceDate > currentDate) {
      errors.push('Placed in service date cannot be in the future');
    }

    if (placedInServiceDate.getFullYear() < 1900) {
      errors.push('Placed in service date cannot be before 1900');
    }
  } catch (error) {
    errors.push('Invalid placed in service date format');
  }

  // Tax year validation
  if (inputs.taxYear < 1900 || inputs.taxYear > 2100) {
    errors.push('Tax year must be between 1900 and 2100');
  }

  // Holding period validation
  if (inputs.holdingPeriod < 1) {
    errors.push('Holding period must be at least 1 year');
  }

  if (inputs.holdingPeriod > 50) {
    errors.push('Holding period should typically be less than 50 years');
  }

  // Property type specific validations
  if (inputs.propertyType === 'land' && inputs.improvementValue > 0) {
    errors.push('Land-only properties should have zero improvement value');
  }

  if (inputs.propertyType !== 'land' && inputs.improvementValue <= 0) {
    errors.push('Non-land properties should have positive improvement value');
  }

  // Depreciation method validation
  const validMethods = ['macrs_residential', 'macrs_commercial', 'straight_line', 'cost_segregation'];
  if (!validMethods.includes(inputs.depreciationMethod)) {
    errors.push('Invalid depreciation method');
  }

  // Convention validation
  const validConventions = ['mid-month', 'mid-quarter', 'half-year'];
  if (!validConventions.includes(inputs.convention)) {
    errors.push('Invalid depreciation convention');
  }

  // Tax rate reasonableness
  if (inputs.taxRate < 10) {
    errors.push('Tax rate seems unusually low');
  }

  if (inputs.taxRate > 40) {
    errors.push('Tax rate seems unusually high');
  }

  // Inflation rate reasonableness
  if (Math.abs(inputs.inflationRate) > 15) {
    errors.push('Inflation rate seems unusually high or low');
  }
}