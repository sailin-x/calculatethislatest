import { MortgageVsRentInputs } from './types';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Property value cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Down payment cannot be negative' };
  }
  if (allInputs?.propertyValue && value >= allInputs.propertyValue) {
    return { isValid: false, message: 'Down payment cannot be greater than or equal to property value' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan term must be greater than 0 years' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Interest rate cannot exceed 30%' };
  }
  return { isValid: true };
}

export function validateMonthlyRent(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Monthly rent must be greater than 0' };
  }
  return { isValid: true };
}

export function validateAnnualRentIncrease(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 20) {
    return { isValid: false, message: 'Annual rent increase must be between -10% and 20%' };
  }
  return { isValid: true };
}

export function validateAnnualPropertyTaxes(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Annual property taxes cannot be negative' };
  }
  return { isValid: true };
}

export function validateAnnualHomeownersInsurance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Annual homeowners insurance cannot be negative' };
  }
  return { isValid: true };
}

export function validateMonthlyHOAFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Monthly HOA fees cannot be negative' };
  }
  return { isValid: true };
}

export function validateAnnualMaintenance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 10) {
    return { isValid: false, message: 'Annual maintenance must be between 0% and 10% of property value' };
  }
  return { isValid: true };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Closing costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateExpectedHomeAppreciation(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 30) {
    return { isValid: false, message: 'Expected home appreciation must be between -10% and 30%' };
  }
  return { isValid: true };
}

export function validateAlternativeInvestmentReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 50) {
    return { isValid: false, message: 'Alternative investment return must be between -10% and 50%' };
  }
  return { isValid: true };
}

export function validateMarginalTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Marginal tax rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Analysis period must be greater than 0 years' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Analysis period cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateOneTimeMovingCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'One-time moving costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateRentDeposit(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Rent deposit cannot be negative' };
  }
  return { isValid: true };
}

export function validateMortgagePoints(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Mortgage points cannot be negative' };
  }
  return { isValid: true };
}

export function validateMortgageOriginationFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Mortgage origination fees cannot be negative' };
  }
  return { isValid: true };
}