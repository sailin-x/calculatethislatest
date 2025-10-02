import { ValidationResult } from '../../types/calculator';

export function validateCurrentAnnuityValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { currentAnnuityValue: 'Current annuity value must be greater than $0' } };
  }
  if (value < 1000) {
    return { isValid: false, errors: { currentAnnuityValue: 'Current annuity value must be at least $1,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentAnnuityValue: 'Current annuity value cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { monthlyPayment: 'Monthly payment must be greater than $0' } };
  }
  if (value < 10) {
    return { isValid: false, errors: { monthlyPayment: 'Monthly payment must be at least $10' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { monthlyPayment: 'Monthly payment cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRemainingPayments(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { remainingPayments: 'Remaining payments must be greater than 0' } };
  }
  if (value > 600) {
    return { isValid: false, errors: { remainingPayments: 'Remaining payments cannot exceed 600 months' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBuyoutOffer(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { buyoutOffer: 'Buyout offer must be greater than $0' } };
  }
  if (value < 1000) {
    return { isValid: false, errors: { buyoutOffer: 'Buyout offer must be at least $1,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { buyoutOffer: 'Buyout offer cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBuyoutFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { buyoutFees: 'Buyout fees cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { buyoutFees: 'Buyout fees cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBuyoutTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { buyoutTaxes: 'Buyout taxes cannot be negative' } };
  }
  if (value > 5000000) {
    return { isValid: false, errors: { buyoutTaxes: 'Buyout taxes cannot exceed $5,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAlternativeInvestmentRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 30) {
    return { isValid: false, errors: { alternativeInvestmentRate: 'Alternative investment rate must be between 0% and 30%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAlternativeInvestmentFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { alternativeInvestmentFees: 'Alternative investment fees cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { alternativeInvestmentFees: 'Alternative investment fees cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTimeHorizon(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { timeHorizon: 'Time horizon must be at least 1 year' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { timeHorizon: 'Time horizon cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 18) {
    return { isValid: false, errors: { age: 'Age must be at least 18' } };
  }
  if (value > 120) {
    return { isValid: false, errors: { age: 'Age cannot exceed 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxBracket: 'Tax bracket must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRiskTolerance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['low', 'medium', 'high'].includes(value)) {
    return { isValid: false, errors: { riskTolerance: 'Risk tolerance must be low, medium, or high' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeInflation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeInflation: 'Include inflation must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 10) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between 0% and 10%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { discountRate: 'Discount rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}