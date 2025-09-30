import { AssetBasedLendingCalculatorInputs } from './types';

/**
 * Validate asset-based lending calculator inputs
 */
export function validateAssetBasedLendingInputs(
  inputs: AssetBasedLendingCalculatorInputs
): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate asset value
  if (inputs.assetValue <= 0) {
    errors.push({ field: 'assetValue', message: 'Asset value must be greater than 0' });
  }
  if (inputs.assetValue > 100000000) {
    errors.push({ field: 'assetValue', message: 'Asset value cannot exceed $100,000,000' });
  }

  // Validate advance rate
  if (inputs.advanceRate <= 0 || inputs.advanceRate > 100) {
    errors.push({ field: 'advanceRate', message: 'Advance rate must be between 0 and 100 percent' });
  }

  // Validate interest rate
  if (inputs.interestRate < 0 || inputs.interestRate > 50) {
    errors.push({ field: 'interestRate', message: 'Interest rate must be between 0 and 50 percent' });
  }

  // Validate loan term
  if (inputs.loanTerm <= 0 || inputs.loanTerm > 360) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be between 1 and 360 months' });
  }

  // Validate origination fee
  if (inputs.originationFee < 0 || inputs.originationFee > 10) {
    errors.push({ field: 'originationFee', message: 'Origination fee must be between 0 and 10 percent' });
  }

  // Validate monitoring fee
  if (inputs.monitoringFee < 0 || inputs.monitoringFee > 5) {
    errors.push({ field: 'monitoringFee', message: 'Monitoring fee must be between 0 and 5 percent' });
  }

  return errors;
}
