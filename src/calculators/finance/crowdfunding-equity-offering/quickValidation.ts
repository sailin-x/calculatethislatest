import { CrowdfundingEquityOfferingInputs } from './types';

export function validateTotalFundingGoal(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Total funding goal must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Total funding goal cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateMinimumInvestment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Minimum investment must be greater than 0' };
  }
  if (allInputs?.totalFundingGoal && value > allInputs.totalFundingGoal) {
    return { isValid: false, message: 'Minimum investment cannot exceed total funding goal' };
  }
  return { isValid: true };
}

export function validateMaximumInvestment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0) {
    return { isValid: false, message: 'Maximum investment must be greater than 0' };
  }
  if (allInputs?.minimumInvestment && value < allInputs.minimumInvestment) {
    return { isValid: false, message: 'Maximum investment cannot be less than minimum investment' };
  }
  return { isValid: true };
}

export function validateCurrentFunding(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Current funding cannot be negative' };
  }
  if (allInputs?.totalFundingGoal && value > allInputs.totalFundingGoal) {
    return { isValid: false, message: 'Current funding cannot exceed total funding goal' };
  }
  return { isValid: true };
}

export function validateNumberOfInvestors(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Number of investors cannot be negative' };
  }
  return { isValid: true };
}

export function validateValuation(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Valuation must be greater than 0' };
  }
  return { isValid: true };
}

export function validateEquityPercentageOffered(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Equity percentage offered must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Equity percentage offered cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validatePlatformFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Platform fees cannot be negative' };
  }
  return { isValid: true };
}

export function validateLegalFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Legal fees cannot be negative' };
  }
  return { isValid: true };
}

export function validateMarketingFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Marketing fees cannot be negative' };
  }
  return { isValid: true };
}

export function validateCampaignDuration(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Campaign duration must be greater than 0 days' };
  }
  if (value > 365) {
    return { isValid: false, message: 'Campaign duration cannot exceed 365 days' };
  }
  return { isValid: true };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -100) {
    return { isValid: false, message: 'Expected return cannot be less than -100%' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Expected return cannot exceed 1000%' };
  }
  return { isValid: true };
}