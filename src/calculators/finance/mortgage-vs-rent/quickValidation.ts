import { ValidationResult } from '../../types/calculator';

export function validateHomePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { homePrice: 'Home price must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { homePrice: 'Home price must be at least $10,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { homePrice: 'Home price cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, errors: { downPayment: 'Down payment must be $0 or greater' } };
  }
  if (allInputs?.homePrice && value > allInputs.homePrice) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot exceed home price' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { loanTerm: 'Loan term must be greater than 0 years' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { loanTerm: 'Loan term must be at least 1 year' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { loanTerm: 'Loan term cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be 0% or greater' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { interestRate: 'Interest rate cannot exceed 20%' } };
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

export function validateRentIncreaseRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < -5) {
    return { isValid: false, errors: { rentIncreaseRate: 'Rent increase rate cannot be less than -5%' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { rentIncreaseRate: 'Rent increase rate cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { propertyTax: 'Property tax cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { propertyTax: 'Property tax cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHomeInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { homeInsurance: 'Home insurance cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { homeInsurance: 'Home insurance cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHoaFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot be negative' } };
  }
  if (value > 5000) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot exceed $5,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaintenanceRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { maintenanceRate: 'Maintenance rate cannot be negative' } };
  }
  if (value > 5) {
    return { isValid: false, errors: { maintenanceRate: 'Maintenance rate cannot exceed 5%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 1) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period must be at least 1 year' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHomeAppreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < -10) {
    return { isValid: false, errors: { homeAppreciation: 'Home appreciation cannot be less than -10%' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { homeAppreciation: 'Home appreciation cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInvestmentReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < -10) {
    return { isValid: false, errors: { investmentReturn: 'Investment return cannot be less than -10%' } };
  }
  if (value > 25) {
    return { isValid: false, errors: { investmentReturn: 'Investment return cannot exceed 25%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < -5) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate cannot be less than -5%' } };
  }
  if (value > 10) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate cannot exceed 10%' } };
  }
  return { isValid: true, errors: {} };
}