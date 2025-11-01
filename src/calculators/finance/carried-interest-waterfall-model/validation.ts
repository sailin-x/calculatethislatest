// import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateCarriedInterestWaterfallModelInputs(inputs: any): ValidationResult {
  const errors: string[] = [];

  // Total capital validation
  if (!inputs.totalCapital || typeof inputs.totalCapital !== 'number' || inputs.totalCapital <= 0) {
    errors.push('Total capital must be a positive number');
  } else if (inputs.totalCapital < 1000000 || inputs.totalCapital > 10000000000) {
    errors.push('Total capital must be between $1,000,000 and $10,000,000,000');
  }

  // Management fee validation
  if (inputs.managementFee === undefined || inputs.managementFee === null || typeof inputs.managementFee !== 'number' || inputs.managementFee < 0) {
    errors.push('Management fee must be a non-negative number');
  } else if (inputs.managementFee > 0.05) {
    errors.push('Management fee must be 5% or less');
  }

  // Carried interest validation
  if (inputs.carriedInterest === undefined || inputs.carriedInterest === null || typeof inputs.carriedInterest !== 'number' || inputs.carriedInterest < 0) {
    errors.push('Carried interest must be a non-negative number');
  } else if (inputs.carriedInterest > 0.5) {
    errors.push('Carried interest must be 50% or less');
  }

  // Hurdle rate validation
  if (inputs.hurdleRate === undefined || inputs.hurdleRate === null || typeof inputs.hurdleRate !== 'number' || inputs.hurdleRate < 0) {
    errors.push('Hurdle rate must be a non-negative number');
  } else if (inputs.hurdleRate > 0.3) {
    errors.push('Hurdle rate must be 30% or less');
  }

  // Catch-up percentage validation
  if (inputs.catchUpPercentage === undefined || inputs.catchUpPercentage === null || typeof inputs.catchUpPercentage !== 'number' || inputs.catchUpPercentage < 0) {
    errors.push('Catch-up percentage must be a non-negative number');
  } else if (inputs.catchUpPercentage > 1) {
    errors.push('Catch-up percentage must be 100% or less');
  }

  // Investment period validation
  if (!inputs.investmentPeriod || typeof inputs.investmentPeriod !== 'number' || inputs.investmentPeriod < 1) {
    errors.push('Investment period must be at least 1 year');
  } else if (inputs.investmentPeriod > 20) {
    errors.push('Investment period must be 20 years or less');
  }

  // Total return validation
  if (inputs.totalReturn === undefined || inputs.totalReturn === null || typeof inputs.totalReturn !== 'number' || inputs.totalReturn < 0) {
    errors.push('Total return must be a non-negative number');
  } else if (inputs.totalReturn > 10000000000) {
    errors.push('Total return must be $10,000,000,000 or less');
  }

  // Preferred return validation
  if (inputs.preferredReturn === undefined || inputs.preferredReturn === null || typeof inputs.preferredReturn !== 'number' || inputs.preferredReturn < 0) {
    errors.push('Preferred return must be a non-negative number');
  } else if (inputs.preferredReturn > 0.3) {
    errors.push('Preferred return must be 30% or less');
  }

  // Distribution waterfall validation
  if (!inputs.distributionWaterfall) {
    errors.push('Distribution waterfall is required');
  } else if (!['american', 'european'].includes(inputs.distributionWaterfall)) {
    errors.push('Invalid distribution waterfall type');
  }

  // GP commitment validation
  if (inputs.gpCommitment === undefined || inputs.gpCommitment === null || typeof inputs.gpCommitment !== 'number' || inputs.gpCommitment < 0) {
    errors.push('GP commitment must be a non-negative number');
  } else if (inputs.gpCommitment > inputs.totalCapital) {
    errors.push('GP commitment cannot exceed total capital');
  }

  // LP commitment validation
  if (inputs.lpCommitment === undefined || inputs.lpCommitment === null || typeof inputs.lpCommitment !== 'number' || inputs.lpCommitment < 0) {
    errors.push('LP commitment must be a non-negative number');
  } else if (inputs.lpCommitment > inputs.totalCapital) {
    errors.push('LP commitment cannot exceed total capital');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateCarriedInterestWaterfallModelInput(field: string, value: any): string | null {
  switch (field) {
    case 'totalCapital':
      if (!value) return 'Total capital is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 1000000 || value > 10000000000) return 'Must be between $1,000,000 and $10,000,000,000';
      break;

    case 'managementFee':
      if (value === undefined || value === null) return 'Management fee is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 0.05) return 'Must be 5% or less';
      break;

    case 'carriedInterest':
      if (value === undefined || value === null) return 'Carried interest is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 0.5) return 'Must be 50% or less';
      break;

    case 'hurdleRate':
      if (value === undefined || value === null) return 'Hurdle rate is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 0.3) return 'Must be 30% or less';
      break;

    case 'catchUpPercentage':
      if (value === undefined || value === null) return 'Catch-up percentage is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 1) return 'Must be 100% or less';
      break;

    case 'investmentPeriod':
      if (!value) return 'Investment period is required';
      if (typeof value !== 'number' || value < 1) return 'Must be at least 1 year';
      if (value > 20) return 'Must be 20 years or less';
      break;

    case 'totalReturn':
      if (value === undefined || value === null) return 'Total return is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 10000000000) return 'Must be $10,000,000,000 or less';
      break;

    case 'preferredReturn':
      if (value === undefined || value === null) return 'Preferred return is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      if (value > 0.3) return 'Must be 30% or less';
      break;

    case 'distributionWaterfall':
      if (!value) return 'Distribution waterfall is required';
      if (!['american', 'european'].includes(value)) return 'Invalid distribution waterfall type';
      break;

    case 'gpCommitment':
      if (value === undefined || value === null) return 'GP commitment is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      break;

    case 'lpCommitment':
      if (value === undefined || value === null) return 'LP commitment is required';
      if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
      break;
  }

  return null;
}