import { ValidationResult } from '../../types/calculator';

export function validatePropertyPrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { propertyPrice: 'Property price must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { propertyPrice: 'Property price must be at least $10,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { propertyPrice: 'Property price cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot be negative' } };
  }
  if (allInputs?.propertyPrice && value > allInputs.propertyPrice) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot exceed property price' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { loanAmount: 'Loan amount cannot be negative' } };
  }
  if (allInputs?.propertyPrice && allInputs?.downPayment && value > allInputs.propertyPrice - allInputs.downPayment) {
    return { isValid: false, errors: { loanAmount: 'Loan amount cannot exceed property price minus down payment' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { loanTerm: 'Loan term must be between 0 and 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { monthlyRent: 'Monthly rent must be greater than $0' } };
  }
  if (value < 100) {
    return { isValid: false, errors: { monthlyRent: 'Monthly rent must be at least $100' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { monthlyRent: 'Monthly rent cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateVacancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { vacancyRate: 'Vacancy rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyManagementFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { propertyManagementFee: 'Property management fee must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaintenanceCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { maintenanceCost: 'Maintenance cost cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { maintenanceCost: 'Maintenance cost cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot be negative' } };
  }
  if (value > 20000) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot exceed $20,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { insurance: 'Insurance cannot be negative' } };
  }
  if (value > 5000) {
    return { isValid: false, errors: { insurance: 'Insurance cannot exceed $5,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHoaFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot be negative' } };
  }
  if (value > 2000) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot exceed $2,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOtherExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { otherExpenses: 'Other expenses cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { otherExpenses: 'Other expenses cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { appreciationRate: 'Appreciation rate must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHoldingPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { holdingPeriod: 'Holding period must be greater than 0' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { holdingPeriod: 'Holding period must be at least 1 year' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { holdingPeriod: 'Holding period cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSellingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { sellingCosts: 'Selling costs must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}