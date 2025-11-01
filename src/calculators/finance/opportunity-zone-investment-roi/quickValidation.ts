import { OpportunityZoneInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateInitialInvestment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Initial investment must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Initial investment cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateInvestmentDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Investment date is required' };
  }
  // Basic date validation
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Invalid date format' };
  }
  return { isValid: true };
}

export function validateHoldingPeriodYears(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Holding period must be greater than 0 years' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Holding period cannot exceed 30 years' };
  }
  return { isValid: true };
}

export function validateCapitalGainsTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Capital gains tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Capital gains tax rate seems unusually high (>50%)' };
  }
  return { isValid: true };
}

export function validateOrdinaryIncomeTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Ordinary income tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Ordinary income tax rate seems unusually high (>50%)' };
  }
  return { isValid: true };
}

export function validateExpectedAnnualAppreciation(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < -50) {
    return { isValid: false, message: 'Expected annual appreciation cannot be less than -50%' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Expected annual appreciation seems unusually high (>100%)' };
  }
  return { isValid: true };
}

export function validateExpectedAnnualIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Expected annual income cannot be negative' };
  }
  return { isValid: true };
}

export function validateCapitalGainAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Capital gain amount cannot be negative' };
  }
  return { isValid: true };
}

export function validateDeferralPeriodYears(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Deferral period must be greater than 0 years' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Deferral period cannot exceed 10 years' };
  }
  return { isValid: true };
}

export function validateStepUpPercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Step-up percentage cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Step-up percentage seems unusually high (>20%)' };
  }
  return { isValid: true };
}

export function validateExitYear(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Exit year must be greater than 0' };
  }
  return { isValid: true };
}

export function validateExitMultiple(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Exit multiple must be greater than 0' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Exit multiple seems unusually high (>10x)' };
  }
  return { isValid: true };
}

export function validateLeveragePercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Leverage percentage cannot be negative' };
  }
  if (value > 90) {
    return { isValid: false, message: 'Leverage percentage cannot exceed 90%' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 25) {
    return { isValid: false, message: 'Interest rate seems unusually high (>25%)' };
  }
  return { isValid: true };
}

export function validateRiskAdjustedDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Risk-adjusted discount rate must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Risk-adjusted discount rate seems unusually high (>50%)' };
  }
  return { isValid: true };
}