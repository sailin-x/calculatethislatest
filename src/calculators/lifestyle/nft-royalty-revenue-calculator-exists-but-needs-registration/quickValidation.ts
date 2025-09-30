import { ValidationResult } from '../../lib/errors';

/**
 * Quick validation for individual fields in nft royalty revenue calculator exists but needs registration Calculator
 */
export function validateValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];

  if (value === null || value === undefined) {
    errors.push('Value is required');
  } else if (typeof value !== 'number') {
    errors.push('Value must be a number');
  } else if (value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add domain-specific quick validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
