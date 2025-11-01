import { CorporateBondInputs } from './types';

export function validateFaceValue(value: any): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Face value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Face value cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateCouponRate(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Coupon rate must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Coupon rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateMarketPrice(value: any): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Market price must be greater than 0' };
  }
  return { isValid: true };
}

export function validateYearsToMaturity(value: any): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Years to maturity must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Years to maturity cannot exceed 100 years' };
  }
  return { isValid: true };
}

export function validateYieldToMaturity(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Yield to maturity must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Yield to maturity cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateCouponFrequency(value: any): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Coupon frequency must be at least 1' };
  }
  if (value > 12) {
    return { isValid: false, message: 'Coupon frequency cannot exceed 12 payments per year' };
  }
  return { isValid: true };
}

export function validateCreditRating(value: any): { isValid: boolean; message?: string } {
  const validRatings = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C', 'D'];
  if (!value || !validRatings.includes(value.toUpperCase())) {
    return { isValid: false, message: 'Credit rating must be a valid rating (AAA, AA, A, BBB, BB, B, CCC, CC, C, D)' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Tax rate must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Tax rate cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateMarketRiskPremium(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Market risk premium must be 0 or greater' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Market risk premium cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateBeta(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < -5) {
    return { isValid: false, message: 'Beta must be -5 or greater' };
  }
  if (value > 5) {
    return { isValid: false, message: 'Beta cannot exceed 5' };
  }
  return { isValid: true };
}

export function validateRiskFreeRate(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Risk free rate must be 0 or greater' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Risk free rate cannot exceed 20%' };
  }
  return { isValid: true };
}