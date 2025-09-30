import { ValidationResult } from '../../lib/errors';
import { employeestockoptionplanesopvaluationcalculatorCalculatorInputs } from './types';

/**
 * Validate employee stock option plan esop valuation calculator calculator inputs
 */
export function validateemployeestockoptionplanesopvaluationcalculatorCalculatorInputs(
  inputs: employeestockoptionplanesopvaluationcalculatorCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for employee stock option plan esop valuation calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
