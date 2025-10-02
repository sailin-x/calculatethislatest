import { ValidationResult } from '../../types/calculator';

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
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot exceed $10,000,000' } };
  }
  if (allInputs?.homePrice && value >= allInputs.homePrice) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot be greater than or equal to home price' } };
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

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period must be at least 1 year' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period must be at least 1 year' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHomeownersInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { homeownersInsurance: 'Homeowners insurance cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { homeownersInsurance: 'Homeowners insurance cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHoaFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaintenanceCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { maintenanceCost: 'Maintenance cost cannot be negative' } };
  }
  if (value > 25000) {
    return { isValid: false, errors: { maintenanceCost: 'Maintenance cost cannot exceed $25,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { closingCosts: 'Closing costs cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { closingCosts: 'Closing costs cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRentersInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { rentersInsurance: 'Renters insurance cannot be negative' } };
  }
  if (value > 5000) {
    return { isValid: false, errors: { rentersInsurance: 'Renters insurance cannot exceed $5,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSecurityDeposit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { securityDeposit: 'Security deposit cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { securityDeposit: 'Security deposit cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualRentIncrease(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { annualRentIncrease: 'Annual rent increase must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedAppreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { expectedAppreciation: 'Expected appreciation must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInvestmentReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { investmentReturn: 'Investment return must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMarginalTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { marginalTaxRate: 'Marginal tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}