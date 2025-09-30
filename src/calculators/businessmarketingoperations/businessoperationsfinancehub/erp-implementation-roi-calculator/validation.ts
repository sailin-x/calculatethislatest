import { erp_implementation_roi_calculatorInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  message: string;
  field?: string;
}

export function validateerp_implementation_roi_calculatorInputs(inputs: erp_implementation_roi_calculatorInputs): ValidationResult[] {
  const errors: ValidationResult[] = [];

  if (inputs.amount <= 0) {
    errors.push({ isValid: false, message: 'Amount must be greater than 0', field: 'amount' });
  }

  if (inputs.rate && (inputs.rate < 0 || inputs.rate > 1)) {
    errors.push({ isValid: false, message: 'Rate must be between 0 and 1', field: 'rate' });
  }

  return errors;
}

export function validateerp_implementation_roi_calculatorBusinessRules(inputs: erp_implementation_roi_calculatorInputs): ValidationResult[] {
  const warnings: ValidationResult[] = [];

  if (inputs.amount > 1000000) {
    warnings.push({ isValid: true, message: 'Large amount - consider professional advice', field: 'amount' });
  }

  return warnings;
}
