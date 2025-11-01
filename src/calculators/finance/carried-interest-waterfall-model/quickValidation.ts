import { CarriedInterestWaterfallModelInputs } from './types';

// Total Capital Validators
export function validateTotalCapital(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Total capital is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 1000000 || value > 10000000000) return { isValid: false, message: 'Must be between $1,000,000 and $10,000,000,000' };
  return { isValid: true };
}

export function validateManagementFee(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Management fee is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 0.05) return { isValid: false, message: 'Must be 5% or less' };
  return { isValid: true };
}

export function validateCarriedInterest(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Carried interest is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 0.5) return { isValid: false, message: 'Must be 50% or less' };
  return { isValid: true };
}

export function validateHurdleRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Hurdle rate is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 0.3) return { isValid: false, message: 'Must be 30% or less' };
  return { isValid: true };
}

export function validateCatchUpPercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Catch-up percentage is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 1) return { isValid: false, message: 'Must be 100% or less' };
  return { isValid: true };
}

export function validateInvestmentPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Investment period is required' };
  if (typeof value !== 'number' || value < 1) return { isValid: false, message: 'Must be at least 1 year' };
  if (value > 20) return { isValid: false, message: 'Must be 20 years or less' };
  return { isValid: true };
}

export function validateTotalReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Total return is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 10000000000) return { isValid: false, message: 'Must be $10,000,000,000 or less' };
  return { isValid: true };
}

export function validatePreferredReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'Preferred return is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 0.3) return { isValid: false, message: 'Must be 30% or less' };
  return { isValid: true };
}

export function validateDistributionWaterfall(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Distribution waterfall is required' };
  const validTypes = ['american', 'european'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid distribution waterfall type' };
  return { isValid: true };
}

export function validateGpCommitment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'GP commitment is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (allInputs?.totalCapital && value > allInputs.totalCapital) return { isValid: false, message: 'Cannot exceed total capital' };
  return { isValid: true };
}

export function validateLpCommitment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value === null) return { isValid: false, message: 'LP commitment is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (allInputs?.totalCapital && value > allInputs.totalCapital) return { isValid: false, message: 'Cannot exceed total capital' };
  return { isValid: true };
}

export function validateAllCarriedInterestWaterfallModelInputs(inputs: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  const totalCapitalResult = validateTotalCapital(inputs.totalCapital);
  if (!totalCapitalResult.isValid) errors.push(totalCapitalResult.message!);

  const managementFeeResult = validateManagementFee(inputs.managementFee);
  if (!managementFeeResult.isValid) errors.push(managementFeeResult.message!);

  const carriedInterestResult = validateCarriedInterest(inputs.carriedInterest);
  if (!carriedInterestResult.isValid) errors.push(carriedInterestResult.message!);

  const hurdleRateResult = validateHurdleRate(inputs.hurdleRate);
  if (!hurdleRateResult.isValid) errors.push(hurdleRateResult.message!);

  const catchUpPercentageResult = validateCatchUpPercentage(inputs.catchUpPercentage);
  if (!catchUpPercentageResult.isValid) errors.push(catchUpPercentageResult.message!);

  const investmentPeriodResult = validateInvestmentPeriod(inputs.investmentPeriod);
  if (!investmentPeriodResult.isValid) errors.push(investmentPeriodResult.message!);

  const totalReturnResult = validateTotalReturn(inputs.totalReturn);
  if (!totalReturnResult.isValid) errors.push(totalReturnResult.message!);

  const preferredReturnResult = validatePreferredReturn(inputs.preferredReturn);
  if (!preferredReturnResult.isValid) errors.push(preferredReturnResult.message!);

  const distributionWaterfallResult = validateDistributionWaterfall(inputs.distributionWaterfall);
  if (!distributionWaterfallResult.isValid) errors.push(distributionWaterfallResult.message!);

  const gpCommitmentResult = validateGpCommitment(inputs.gpCommitment, inputs);
  if (!gpCommitmentResult.isValid) errors.push(gpCommitmentResult.message!);

  const lpCommitmentResult = validateLpCommitment(inputs.lpCommitment, inputs);
  if (!lpCommitmentResult.isValid) errors.push(lpCommitmentResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}