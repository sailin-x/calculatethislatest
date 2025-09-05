import { PropertyTaxInputs, PropertyTaxValidation } from './types';

export function validatePropertyTaxInputs(inputs: PropertyTaxInputs): PropertyTaxValidation {
  return {
    propertyValue: validatePropertyValue(inputs.propertyValue),
    taxRate: validateTaxRate(inputs.taxRate),
    exemptions: validateExemptions(inputs.exemptions),
    assessmentRatio: validateAssessmentRatio(inputs.assessmentRatio),
    homesteadExemption: validateExemptions(inputs.homesteadExemption),
    seniorExemption: validateExemptions(inputs.seniorExemption),
    disabilityExemption: validateExemptions(inputs.disabilityExemption),
    veteranExemption: validateExemptions(inputs.veteranExemption),
    localTaxes: validateExemptions(inputs.localTaxes),
    specialAssessments: validateExemptions(inputs.specialAssessments)
  };
}

export function validatePropertyValue(value: number): boolean {
  return value > 0 && value <= 1000000000; // Max $1 billion
}

export function validateTaxRate(rate: number): boolean {
  return rate >= 0 && rate <= 50; // Max 50% tax rate
}

export function validateExemptions(value: number | undefined): boolean {
  if (value === undefined) return true;
  return value >= 0 && value <= 10000000; // Max $10 million exemption
}

export function validateAssessmentRatio(ratio: number | undefined): boolean {
  if (ratio === undefined) return true;
  return ratio > 0 && ratio <= 2.0; // Max 200% assessment ratio
}

export function getValidationErrors(inputs: PropertyTaxInputs): string[] {
  const errors: string[] = [];
  const validation = validatePropertyTaxInputs(inputs);

  if (!validation.propertyValue) {
    errors.push('Property value must be greater than $0 and less than $1 billion');
  }

  if (!validation.taxRate) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (!validation.exemptions) {
    errors.push('Exemptions must be between $0 and $10 million');
  }

  if (!validation.assessmentRatio) {
    errors.push('Assessment ratio must be between 0% and 200%');
  }

  if (!validation.homesteadExemption) {
    errors.push('Homestead exemption must be between $0 and $10 million');
  }

  if (!validation.seniorExemption) {
    errors.push('Senior exemption must be between $0 and $10 million');
  }

  if (!validation.disabilityExemption) {
    errors.push('Disability exemption must be between $0 and $10 million');
  }

  if (!validation.veteranExemption) {
    errors.push('Veteran exemption must be between $0 and $10 million');
  }

  if (!validation.localTaxes) {
    errors.push('Local taxes must be between $0 and $10 million');
  }

  if (!validation.specialAssessments) {
    errors.push('Special assessments must be between $0 and $10 million');
  }

  return errors;
}

export function validatePropertyTaxCalculation(inputs: PropertyTaxInputs): boolean {
  const validation = validatePropertyTaxInputs(inputs);
  return Object.values(validation).every(Boolean);
}