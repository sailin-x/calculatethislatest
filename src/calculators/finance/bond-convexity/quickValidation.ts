import { BondConvexityInputs } from './types';

export function validateFaceValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0) {
    return { isValid: false, message: 'Face value must be positive' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Face value cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateCouponRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Coupon rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateYearsToMaturity(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0) {
    return { isValid: false, message: 'Years to maturity must be positive' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Years to maturity cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateYieldToMaturity(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0 || value > 50) {
    return { isValid: false, message: 'Yield to maturity must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateCouponFrequency(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (![1, 2, 4, 12].includes(value)) {
    return { isValid: false, message: 'Coupon frequency must be 1, 2, 4, or 12' };
  }
  return { isValid: true };
}

export function validateCurrentPrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && value <= 0) {
    return { isValid: false, message: 'Current price must be positive' };
  }
  return { isValid: true };
}