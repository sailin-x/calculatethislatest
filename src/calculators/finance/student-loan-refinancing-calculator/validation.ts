import { ValidationResult } from '../../lib/errors';
import { studentloanrefinancingcalculatorInputs } from './types';

/**
 * Validate student loan refinancing calculator calculator inputs
 */
export function validatestudentloanrefinancingcalculatorInputs(
  inputs: studentloanrefinancingcalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for student loan refinancing calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
