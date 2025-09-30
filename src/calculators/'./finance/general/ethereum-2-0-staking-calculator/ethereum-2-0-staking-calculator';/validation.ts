import { './finance/general/ethereum-2-0-staking-calculator/ethereum-2-0-staking-calculator';Inputs } from './types';

export function validateInputs(inputs: './finance/general/ethereum-2-0-staking-calculator/ethereum-2-0-staking-calculator';Inputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Add validation logic specific to this calculator
  if (inputs.value !== undefined && inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  if (inputs.rate !== undefined && (inputs.rate < 0 || inputs.rate > 100)) {
    errors.push('Rate must be between 0 and 100');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
