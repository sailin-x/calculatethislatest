import { CalmarRatioCalculatorInputs } from './types';

export function validateCalmarRatioCalculatorInputs(inputs: CalmarRatioCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];
  // Add validation logic here
  return errors;
}

export function validateCalmarRatioCalculatorBusinessRules(inputs: CalmarRatioCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];
  // Add business rule validation here
  return warnings;
}
