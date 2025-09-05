import { ValidationResult } from '../../types';

export function validateAnnualPropertyTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Annual property tax is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Annual property tax must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Annual property tax must be greater than $0' };
  }

  if (numValue > 10000000) {
    return { isValid: false, error: 'Annual property tax cannot exceed $10 million' };
  }

  return { isValid: true };
}

export function validateClosingDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Closing date is required' };
  }

  const dateObj = new Date(value);
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Closing date must be a valid date' };
  }

  const currentYear = new Date().getFullYear();
  const year = dateObj.getFullYear();
  
  if (year < currentYear - 5 || year > currentYear + 5) {
    return { isValid: false, error: 'Closing date must be within 5 years of current year' };
  }

  return { isValid: true };
}

export function validateTaxYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Tax year is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Tax year must be a valid integer' };
  }

  const currentYear = new Date().getFullYear();
  if (numValue < currentYear - 5 || numValue > currentYear + 5) {
    return { isValid: false, error: 'Tax year must be within 5 years of current year' };
  }

  return { isValid: true };
}

export function validatePaymentSchedule(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Payment schedule is required' };
  }

  const validSchedules = ['annual', 'semi-annual', 'quarterly', 'monthly'];
  if (!validSchedules.includes(value)) {
    return { isValid: false, error: 'Payment schedule must be annual, semi-annual, quarterly, or monthly' };
  }

  return { isValid: true };
}

export function validateSellerPaidMonths(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Seller paid months must be a valid number' };
  }

  if (numValue < 0 || numValue > 12) {
    return { isValid: false, error: 'Seller paid months must be between 0 and 12' };
  }

  return { isValid: true };
}

export function validateBuyerPaidMonths(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Buyer paid months must be a valid number' };
  }

  if (numValue < 0 || numValue > 12) {
    return { isValid: false, error: 'Buyer paid months must be between 0 and 12' };
  }

  return { isValid: true };
}

export function validateProrationMethod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Proration method is required' };
  }

  const validMethods = ['365-day', '360-day', 'actual-days'];
  if (!validMethods.includes(value)) {
    return { isValid: false, error: 'Proration method must be 365-day, 360-day, or actual-days' };
  }

  return { isValid: true };
}

export function validateSellerCredits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Seller credits must be a valid number' };
  }

  if (numValue < -1000000 || numValue > 1000000) {
    return { isValid: false, error: 'Seller credits must be between -$1 million and $1 million' };
  }

  return { isValid: true };
}

export function validateBuyerCredits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Buyer credits must be a valid number' };
  }

  if (numValue < -1000000 || numValue > 1000000) {
    return { isValid: false, error: 'Buyer credits must be between -$1 million and $1 million' };
  }

  return { isValid: true };
}

export function validateSpecialAssessments(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Special assessments must be a valid number' };
  }

  if (numValue < 0 || numValue > 1000000) {
    return { isValid: false, error: 'Special assessments must be between $0 and $1 million' };
  }

  return { isValid: true };
}