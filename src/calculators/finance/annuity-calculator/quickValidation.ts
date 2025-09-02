import { AnnuityInputs } from './types';

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(field: keyof AnnuityInputs, value: any, inputs: AnnuityInputs): FieldValidationResult {
  switch (field) {
    case 'principal':
      return validatePrincipal(value);
    case 'annualRate':
      return validateAnnualRate(value);
    case 'years':
      return validateYears(value);
    case 'paymentFrequency':
      return validatePaymentFrequency(value);
    case 'annuityType':
      return validateAnnuityType(value);
    case 'taxRate':
      return validateTaxRate(value);
    case 'inflationRate':
      return validateInflationRate(value);
    default:
      return { isValid: true };
  }
}

function validatePrincipal(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Principal must be greater than 0' };
  }
  if (numValue > 1000000000) {
    return { isValid: false, warning: 'Principal seems unusually high' };
  }
  return { isValid: true };
}

function validateAnnualRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Annual rate must be between 0% and 100%' };
  }
  if (numValue > 50) {
    return { isValid: false, warning: 'Annual rate seems unusually high' };
  }
  return { isValid: true };
}

function validateYears(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Years must be greater than 0' };
  }
  if (numValue > 100) {
    return { isValid: false, error: 'Years cannot exceed 100' };
  }
  return { isValid: true };
}

function validatePaymentFrequency(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 365) {
    return { isValid: false, error: 'Payment frequency must be between 1 and 365' };
  }
  return { isValid: true };
}

function validateAnnuityType(value: any): FieldValidationResult {
  const validTypes = ['ordinary', 'due'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid annuity type' };
  }
  return { isValid: true };
}

function validateTaxRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Tax rate must be between 0% and 100%' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Inflation rate must be between 0% and 100%' };
  }
  return { isValid: true };
}
