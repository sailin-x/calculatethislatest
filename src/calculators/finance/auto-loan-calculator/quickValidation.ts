import { ValidationResult } from '../../../types/calculator';

export function validateVehiclePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { vehiclePrice: 'Vehicle price must be greater than $0' } };
  }
  if (value < 5000) {
    return { isValid: false, errors: { vehiclePrice: 'Vehicle price must be at least $5,000' } };
  }
  if (value > 2000000) {
    return { isValid: false, errors: { vehiclePrice: 'Vehicle price cannot exceed $2,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    // Down payment is optional if down payment percent is provided
    if (allInputs?.downPaymentPercent !== undefined && allInputs?.downPaymentPercent !== null && allInputs?.downPaymentPercent !== '') {
      return { isValid: true, errors: {} };
    }
    return { isValid: false, errors: { downPayment: 'Down payment is required if percentage is not provided' } };
  }

  if (value < 0) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot be negative' } };
  }

  if (allInputs?.vehiclePrice && value > allInputs.vehiclePrice) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot exceed vehicle price' } };
  }

  return { isValid: true, errors: {} };
}

export function validateDownPaymentPercent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    // Down payment percent is optional if down payment amount is provided
    if (allInputs?.downPayment !== undefined && allInputs?.downPayment !== null && allInputs?.downPayment !== '') {
      return { isValid: true, errors: {} };
    }
    return { isValid: false, errors: { downPaymentPercent: 'Down payment percentage is required if amount is not provided' } };
  }

  if (value < 0) {
    return { isValid: false, errors: { downPaymentPercent: 'Down payment percentage cannot be negative' } };
  }

  if (value > 100) {
    return { isValid: false, errors: { downPaymentPercent: 'Down payment percentage cannot exceed 100%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateLoanTermYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { loanTermYears: 'Loan term must be greater than 0 years' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { loanTermYears: 'Loan term must be at least 1 year' } };
  }
  if (value > 10) {
    return { isValid: false, errors: { loanTermYears: 'Loan term cannot exceed 10 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, errors: { interestRate: 'Interest rate is required' } };
  }

  if (value < 0) {
    return { isValid: false, errors: { interestRate: 'Interest rate cannot be negative' } };
  }

  if (value > 25) {
    return { isValid: false, errors: { interestRate: 'Interest rate cannot exceed 25%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateSalesTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} }; // Optional field
  }

  if (value < 0) {
    return { isValid: false, errors: { salesTax: 'Sales tax cannot be negative' } };
  }

  if (value > 20) {
    return { isValid: false, errors: { salesTax: 'Sales tax cannot exceed 20%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateRegistrationFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} }; // Optional field
  }

  if (value < 0) {
    return { isValid: false, errors: { registrationFees: 'Registration fees cannot be negative' } };
  }

  if (value > 2000) {
    return { isValid: false, errors: { registrationFees: 'Registration fees cannot exceed $2,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateMonthlyInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} }; // Optional field
  }

  if (value < 0) {
    return { isValid: false, errors: { monthlyInsurance: 'Monthly insurance cannot be negative' } };
  }

  if (value > 500) {
    return { isValid: false, errors: { monthlyInsurance: 'Monthly insurance cannot exceed $500' } };
  }

  return { isValid: true, errors: {} };
}

export function validateTradeInValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} }; // Optional field
  }

  if (value < 0) {
    return { isValid: false, errors: { tradeInValue: 'Trade-in value cannot be negative' } };
  }

  if (allInputs?.vehiclePrice && value > allInputs.vehiclePrice) {
    return { isValid: false, errors: { tradeInValue: 'Trade-in value cannot exceed vehicle price' } };
  }

  return { isValid: true, errors: {} };
}

export function validateAllAutoLoanInputs(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate required fields
  if (!allInputs?.vehiclePrice) {
    errors.vehiclePrice = 'Vehicle price is required';
  }

  if (!allInputs?.loanTermYears) {
    errors.loanTermYears = 'Loan term is required';
  }

  if (allInputs?.interestRate === undefined || allInputs?.interestRate === null || allInputs?.interestRate === '') {
    errors.interestRate = 'Interest rate is required';
  }

  // Validate down payment logic
  const hasDownPayment = allInputs?.downPayment !== undefined && allInputs?.downPayment !== null && allInputs?.downPayment !== '';
  const hasDownPaymentPercent = allInputs?.downPaymentPercent !== undefined && allInputs?.downPaymentPercent !== null && allInputs?.downPaymentPercent !== '';

  if (!hasDownPayment && !hasDownPaymentPercent) {
    errors.downPayment = 'Either down payment amount or percentage must be provided';
  }

  // Validate loan amount doesn't exceed vehicle value
  if (allInputs?.vehiclePrice && allInputs?.downPayment !== undefined) {
    const tradeInValue = allInputs?.tradeInValue || 0;
    const loanAmount = allInputs.vehiclePrice - allInputs.downPayment - tradeInValue;
    if (loanAmount < 0) {
      errors.downPayment = 'Down payment plus trade-in value cannot exceed vehicle price';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}