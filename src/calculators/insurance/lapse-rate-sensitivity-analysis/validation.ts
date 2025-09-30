import { LapseRateSensitivityAnalysisInputs } from './types';

export function validateLapseRateSensitivityAnalysisInputs(inputs: LapseRateSensitivityAnalysisInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];
  // Add validation logic here
  return errors;
}

export function validateLapseRateSensitivityAnalysisBusinessRules(inputs: LapseRateSensitivityAnalysisInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];
  // Add business rule validation here
  return warnings;
}
