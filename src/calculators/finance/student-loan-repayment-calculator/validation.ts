import { ValidationResult } from '../../lib/errors';
import { studentloanrepaymentcalculatorInputs } from './types';

/**
 * Validate student loan repayment calculator calculator inputs
 */
export function validatestudentloanrepaymentcalculatorInputs(
  inputs: studentloanrepaymentcalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for student loan repayment calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
