import { GrantorRetainedAnnuityTrustGratCalculatorInputs } from './types';

export function validateInitialValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Initial value must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Initial value cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateAnnuityRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Annuity rate must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Annuity rate cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateTermYears(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Term years must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Term years cannot exceed 50' };
  }
  return { isValid: true };
}

export function validateGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -50 || value > 50) {
    return { isValid: false, message: 'Growth rate must be between -50% and 50%' };
  }
  return { isValid: true };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Discount rate must be between 0% and 50%' };
  }
  return { isValid: true };
}