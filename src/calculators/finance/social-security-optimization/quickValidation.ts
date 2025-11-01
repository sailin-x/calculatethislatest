import { SocialSecurityOptimizationInputs } from './types';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Current age must be at least 18' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Current age cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 55) {
    return { isValid: false, message: 'Retirement age must be at least 55' };
  }
  if (value > 75) {
    return { isValid: false, message: 'Retirement age cannot exceed 75' };
  }
  if (allInputs?.currentAge && value <= allInputs.currentAge) {
    return { isValid: false, message: 'Retirement age must be greater than current age' };
  }
  return { isValid: true };
}

export function validatePrimaryInsuranceAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Primary insurance amount must be greater than 0' };
  }
  if (value > 4000) {
    return { isValid: false, message: 'Primary insurance amount cannot exceed $4,000' };
  }
  return { isValid: true };
}

export function validateExpectedLifespan(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 70) {
    return { isValid: false, message: 'Expected lifespan must be at least 70' };
  }
  if (value > 120) {
    return { isValid: false, message: 'Expected lifespan cannot exceed 120' };
  }
  if (allInputs?.currentAge && value <= allInputs.currentAge) {
    return { isValid: false, message: 'Expected lifespan must be greater than current age' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 20) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 20%' };
  }
  return { isValid: true };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Discount rate must be 0 or greater' };
  }
  if (value > 25) {
    return { isValid: false, message: 'Discount rate cannot exceed 25%' };
  }
  return { isValid: true };
}

export function validateCurrentSavings(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Current savings cannot be negative' };
  }
  return { isValid: true };
}

export function validateMonthlyRetirementExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Monthly retirement expenses must be greater than 0' };
  }
  return { isValid: true };
}

export function validateOtherIncomeSources(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Other income sources cannot be negative' };
  }
  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Tax bracket must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateSpouseCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && value < 18) {
    return { isValid: false, message: 'Spouse current age must be at least 18' };
  }
  if (value && value > 100) {
    return { isValid: false, message: 'Spouse current age cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateSpousePrimaryInsuranceAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && value <= 0) {
    return { isValid: false, message: 'Spouse primary insurance amount must be greater than 0' };
  }
  if (value && value > 4000) {
    return { isValid: false, message: 'Spouse primary insurance amount cannot exceed $4,000' };
  }
  return { isValid: true };
}