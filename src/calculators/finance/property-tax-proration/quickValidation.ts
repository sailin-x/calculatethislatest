import { ValidationResult } from '../../../types/calculator';

export function validateAnnualPropertyTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { annualPropertyTax: 'Annual property tax must be greater than $0' } };
  }
  if (value < 100) {
    return { isValid: false, errors: { annualPropertyTax: 'Annual property tax must be at least $100' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { annualPropertyTax: 'Annual property tax cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxYearStart(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { taxYearStart: 'Tax year start date is required' } };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: { taxYearStart: 'Invalid date format' } };
  }
  if (allInputs?.taxYearEnd) {
    const endDate = new Date(allInputs.taxYearEnd);
    if (date >= endDate) {
      return { isValid: false, errors: { taxYearStart: 'Start date must be before end date' } };
    }
  }
  return { isValid: true, errors: {} };
}

export function validateTaxYearEnd(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { taxYearEnd: 'Tax year end date is required' } };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: { taxYearEnd: 'Invalid date format' } };
  }
  if (allInputs?.taxYearStart) {
    const startDate = new Date(allInputs.taxYearStart);
    if (date <= startDate) {
      return { isValid: false, errors: { taxYearEnd: 'End date must be after start date' } };
    }
    const diffTime = Math.abs(date.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 366) {
      return { isValid: false, errors: { taxYearEnd: 'Tax year cannot exceed 366 days' } };
    }
  }
  return { isValid: true, errors: {} };
}

export function validateClosingDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { closingDate: 'Closing date is required' } };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: { closingDate: 'Invalid date format' } };
  }
  if (allInputs?.taxYearStart && allInputs?.taxYearEnd) {
    const startDate = new Date(allInputs.taxYearStart);
    const endDate = new Date(allInputs.taxYearEnd);
    if (date < startDate || date > endDate) {
      return { isValid: false, errors: { closingDate: 'Closing date must be within the tax year period' } };
    }
  }
  return { isValid: true, errors: {} };
}

export function validateProrationMethod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { prorationMethod: 'Proration method is required' } };
  }
  const validMethods = ['365-day', '366-day', '360-day', 'actual-days'];
  if (!validMethods.includes(value)) {
    return { isValid: false, errors: { prorationMethod: 'Invalid proration method selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { interestAmount: 'Interest amount cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { interestAmount: 'Interest amount cannot exceed $10,000' } };
  }
  if (allInputs?.annualPropertyTax && value > allInputs.annualPropertyTax * 0.1) {
    return { isValid: false, errors: { interestAmount: 'Interest amount should not exceed 10% of annual property tax' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBuyerPaysClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  // Boolean field, no specific validation needed beyond type checking
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { buyerPaysClosingCosts: 'Invalid value for buyer pays closing costs' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeInterest(value: any, allInputs?: Record<string, any>): ValidationResult {
  // Boolean field, no specific validation needed beyond type checking
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeInterest: 'Invalid value for include interest' } };
  }
  return { isValid: true, errors: {} };
}