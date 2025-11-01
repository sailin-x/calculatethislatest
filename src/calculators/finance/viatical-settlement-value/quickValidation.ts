import { ViaticalSettlementInputs } from './types';

export function validateFaceValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Face value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Face value cannot exceed $10,000,000' };
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

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Life expectancy must be greater than 0 months' };
  }
  if (value > 600) {
    return { isValid: false, message: 'Life expectancy cannot exceed 600 months (50 years)' };
  }
  return { isValid: true };
}

export function validateHealthCondition(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !['terminal', 'critical', 'serious'].includes(value)) {
    return { isValid: false, message: 'Health condition must be terminal, critical, or serious' };
  }
  return { isValid: true };
}

export function validatePolicyType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !['whole_life', 'universal', 'term'].includes(value)) {
    return { isValid: false, message: 'Policy type must be whole_life, universal, or term' };
  }
  return { isValid: true };
}

export function validatePremiumAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 0) {
    return { isValid: false, message: 'Premium amount must be 0 or greater' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Annual premium amount cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateYearsOwned(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Years owned cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Years owned cannot exceed 50' };
  }
  return { isValid: true };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'Discount rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateSettlementFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Settlement fees cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Settlement fees cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateState(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.length !== 2) {
    return { isValid: false, message: 'Please select a valid state' };
  }
  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Tax bracket must be between 0% and 50%' };
  }
  return { isValid: true };
}