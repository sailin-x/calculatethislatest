import { StructuredSettlementPayoutInputs } from './types';

export function validateSettlementAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Settlement amount must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Settlement amount cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validatePayoutPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Payout period must be at least 1 year' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Payout period cannot exceed 100 years' };
  }
  return { isValid: true };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 25) {
    return { isValid: false, message: 'Discount rate must be between 0% and 25%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 20) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 20%' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Tax rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateLumpSumOffer(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && value <= 0) {
    return { isValid: false, message: 'Lump sum offer must be greater than 0' };
  }
  if (value && allInputs?.settlementAmount && value > allInputs.settlementAmount) {
    return { isValid: false, message: 'Lump sum offer cannot exceed settlement amount' };
  }
  return { isValid: true };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 0) {
    return { isValid: false, message: 'Current age must be 0 or greater' };
  }
  if (value > 120) {
    return { isValid: false, message: 'Current age cannot exceed 120' };
  }
  return { isValid: true };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || (allInputs?.currentAge && value <= allInputs.currentAge)) {
    return { isValid: false, message: 'Life expectancy must be greater than current age' };
  }
  if (value > 150) {
    return { isValid: false, message: 'Life expectancy cannot exceed 150' };
  }
  return { isValid: true };
}

export function validateInvestmentReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 50) {
    return { isValid: false, message: 'Investment return must be between -10% and 50%' };
  }
  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Analysis period must be at least 1 year' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Analysis period cannot exceed 100 years' };
  }
  return { isValid: true };
}