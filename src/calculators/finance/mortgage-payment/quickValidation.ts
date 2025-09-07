import { MortgagePaymentInputs } from './types';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $10,000,000' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, message: 'Loan amount cannot exceed property value' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Interest rate must be 0 or greater' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Interest rate cannot exceed 30%' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Loan term must be at least 1 year' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
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

export function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 300) {
    return { isValid: false, message: 'Credit score must be at least 300' };
  }
  if (value > 850) {
    return { isValid: false, message: 'Credit score cannot exceed 850' };
  }
  return { isValid: true };
}

export function validateBorrowerDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'DTI ratio cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'DTI ratio cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateBorrowerIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Borrower income must be greater than 0' };
  }
  return { isValid: true };
}

export function validatePropertyInsurance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Property insurance cannot be negative' };
  }
  return { isValid: true };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Property taxes cannot be negative' };
  }
  return { isValid: true };
}

export function validateHoaFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'HOA fees cannot be negative' };
  }
  return { isValid: true };
}

export function validateFloodInsurance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Flood insurance cannot be negative' };
  }
  return { isValid: true };
}

export function validateMortgageInsurance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Mortgage insurance cannot be negative' };
  }
  return { isValid: true };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -20 || value > 50) {
    return { isValid: false, message: 'Market growth rate must be between -20% and 50%' };
  }
  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Analysis period must be at least 1 year' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Analysis period cannot exceed 30 years' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 20) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 20%' };
  }
  return { isValid: true };
}

export function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 30) {
    return { isValid: false, message: 'Property appreciation rate must be between -10% and 30%' };
  }
  return { isValid: true };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Discount rate must be 0 or greater' };
  }
  if (value > 25) {
    return { isValid: false, message: 'Discount rate cannot exceed 25%' };
  }
  return { isValid: true };
}

export function validateInitialFixedPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.paymentType === 'arm' && (!value || value < 1)) {
    return { isValid: false, message: 'Initial fixed period must be at least 1 year for ARM loans' };
  }
  return { isValid: true };
}

export function validateAdjustmentPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.paymentType === 'arm' && (!value || value < 1)) {
    return { isValid: false, message: 'Adjustment period must be at least 1 year for ARM loans' };
  }
  return { isValid: true };
}

export function validateLifetimeCap(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.paymentType === 'arm' && allInputs?.interestRate && value < allInputs.interestRate) {
    return { isValid: false, message: 'Lifetime cap must be greater than current interest rate' };
  }
  return { isValid: true };
}

export function validatePeriodicCap(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.paymentType === 'arm' && value <= 0) {
    return { isValid: false, message: 'Periodic cap must be greater than 0' };
  }
  return { isValid: true };
}