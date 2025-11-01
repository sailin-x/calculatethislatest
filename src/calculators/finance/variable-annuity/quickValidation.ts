import { VariableAnnuityInputs } from './types';

export function validateInitialInvestment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Initial investment cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Initial investment cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateMonthlyContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Monthly contribution cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Monthly contribution cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateInvestmentHorizon(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Investment horizon must be at least 1 year' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Investment horizon cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Current age must be at least 18' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Current age cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateAnnuityStartAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || (allInputs?.currentAge && value < allInputs.currentAge)) {
    return { isValid: false, message: 'Annuity start age must be greater than or equal to current age' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Annuity start age cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateExpectedReturnRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 25) {
    return { isValid: false, message: 'Expected return rate must be between -10% and 25%' };
  }
  return { isValid: true };
}

export function validateVolatility(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Volatility must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateAnnuityPayoutRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Annuity payout rate must be at least 1%' };
  }
  if (value > 15) {
    return { isValid: false, message: 'Annuity payout rate cannot exceed 15%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 10) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 10%' };
  }
  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Tax bracket must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateAnnuityType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !['immediate', 'deferred'].includes(value)) {
    return { isValid: false, message: 'Annuity type must be immediate or deferred' };
  }
  return { isValid: true };
}

export function validatePayoutType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !['lifetime', 'period_certain', 'joint_survivor'].includes(value)) {
    return { isValid: false, message: 'Payout type must be lifetime, period_certain, or joint_survivor' };
  }
  return { isValid: true };
}

export function validateRiderFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 5) {
    return { isValid: false, message: 'Rider fees must be between 0% and 5%' };
  }
  return { isValid: true };
}

export function validateManagementFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 3) {
    return { isValid: false, message: 'Management fees must be between 0% and 3%' };
  }
  return { isValid: true };
}