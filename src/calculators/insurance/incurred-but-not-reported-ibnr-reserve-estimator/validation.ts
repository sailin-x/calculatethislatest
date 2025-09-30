import { IncurredButNotReportedIbnrReserveEstimatorInputs } from './types';

export function validateIncurredButNotReportedIbnrReserveEstimatorInputs(inputs: IncurredButNotReportedIbnrReserveEstimatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];
  // Add validation logic here
  return errors;
}

export function validateIncurredButNotReportedIbnrReserveEstimatorBusinessRules(inputs: IncurredButNotReportedIbnrReserveEstimatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];
  // Add business rule validation here
  return warnings;
}
