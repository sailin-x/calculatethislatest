import { PrivateMortgageInsuranceInputs } from './types';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateDownPaymentAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Down payment amount cannot be negative' };
  }
  return { isValid: true };
}

export function validateDownPaymentPercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Down payment percentage must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateLoanToValueRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0 || value > 100) {
    return { isValid: false, message: 'Loan-to-value ratio must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
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

export function validateBorrowerIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Borrower income must be greater than 0' };
  }
  return { isValid: true };
}

export function validateBorrowerDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Debt-to-income ratio must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validatePmiRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 5) {
    return { isValid: false, message: 'PMI rate must be between 0% and 5%' };
  }
  return { isValid: true };
}

export function validatePmiTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'PMI term must be greater than 0 years' };
  }
  if (value > 50) {
    return { isValid: false, message: 'PMI term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateUpfrontMip(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.loanType === 'FHA' && (value < 0 || value > 5)) {
    return { isValid: false, message: 'FHA upfront MIP must be between 0% and 5%' };
  }
  return { isValid: true };
}

export function validateMarketRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'Market rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateMarginalTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Marginal tax rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'State tax rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateRefinanceInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (value < 0 || value > 20)) {
    return { isValid: false, message: 'Refinance interest rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateRefinanceClosingCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && value < 0) {
    return { isValid: false, message: 'Refinance closing costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateRefinanceTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (value <= 0 || value > 50)) {
    return { isValid: false, message: 'Refinance term must be between 1 and 50 years' };
  }
  return { isValid: true };
}

export function validateLoanOriginationDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Loan origination date is required' };
  }
  const date = new Date(value);
  const currentDate = new Date();
  if (date > currentDate) {
    return { isValid: false, message: 'Loan origination date cannot be in the future' };
  }
  return { isValid: true };
}

export function validateAnalysisDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Analysis date is required' };
  }
  return { isValid: true };
}

export function validateExpectedPayoffDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && allInputs?.loanOriginationDate) {
    const payoffDate = new Date(value);
    const originationDate = new Date(allInputs.loanOriginationDate);
    if (payoffDate <= originationDate) {
      return { isValid: false, message: 'Expected payoff date must be after origination date' };
    }
  }
  return { isValid: true };
}

export function validateNumberOfUnits(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 1 || value > 10) {
    return { isValid: false, message: 'Number of units must be between 1 and 10' };
  }
  return { isValid: true };
}