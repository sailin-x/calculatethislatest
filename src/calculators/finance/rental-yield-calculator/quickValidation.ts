import { ValidationResult } from '../../../types/calculator';

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

export function validateAnnualOperatingExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualOperatingExpenses: 'Annual operating expenses cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { annualOperatingExpenses: 'Annual operating expenses cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualPropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualPropertyTaxes: 'Annual property taxes cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { annualPropertyTaxes: 'Annual property taxes cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualInsurance: 'Annual insurance cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { annualInsurance: 'Annual insurance cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualMaintenance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualMaintenance: 'Annual maintenance cannot be negative' } };
  }
  if (value > 25000) {
    return { isValid: false, errors: { annualMaintenance: 'Annual maintenance cannot exceed $25,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualManagementFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualManagementFees: 'Annual management fees cannot be negative' } };
  }
  if (value > 20000) {
    return { isValid: false, errors: { annualManagementFees: 'Annual management fees cannot exceed $20,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOtherAnnualCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { otherAnnualCosts: 'Other annual costs cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { otherAnnualCosts: 'Other annual costs cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFinancingType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || (value !== 'cash' && value !== 'financed')) {
    return { isValid: false, errors: { financingType: 'Financing type must be either "cash" or "financed"' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDownPaymentPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.financingType !== 'financed') return { isValid: true, errors: {} };
  if (value === undefined || value < 0 || value > 95) {
    return { isValid: false, errors: { downPaymentPercentage: 'Down payment percentage must be between 0% and 95%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.financingType !== 'financed') return { isValid: true, errors: {} };
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.financingType !== 'financed') return { isValid: true, errors: {} };
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { loanTerm: 'Loan term must be between 0 and 50 years' } };
  }
  return { isValid: true, errors: {} };
}