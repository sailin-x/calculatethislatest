import { PmiCancellationInputs } from './types';

export function validateOriginalLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Original loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Original loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateCurrentLoanBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current loan balance must be greater than 0' };
  }
  if (allInputs?.originalLoanAmount && value > allInputs.originalLoanAmount) {
    return { isValid: false, message: 'Current loan balance cannot exceed original loan amount' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'Interest rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateOriginalPropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Original property value must be greater than 0' };
  }
  return { isValid: true };
}

export function validateCurrentPropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current property value must be greater than 0' };
  }
  return { isValid: true };
}

export function validatePmiRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 5) {
    return { isValid: false, message: 'PMI rate must be between 0% and 5%' };
  }
  return { isValid: true };
}

export function validateMonthlyPmiPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Monthly PMI payment cannot be negative' };
  }
  return { isValid: true };
}

export function validateCurrentEquity(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Current equity cannot be negative' };
  }
  return { isValid: true };
}

export function validateLoanToValueRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Loan-to-value ratio must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateMonthsSinceOrigination(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Months since origination cannot be negative' };
  }
  return { isValid: true };
}

export function validateYearsSinceOrigination(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Years since origination cannot be negative' };
  }
  return { isValid: true };
}

export function validateAutomaticCancellationLtv(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Automatic cancellation LTV must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateLenderCancellationLtv(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Lender cancellation LTV must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateAppraisalFee(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Appraisal fee cannot be negative' };
  }
  return { isValid: true };
}

export function validateTitleSearchFee(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Title search fee cannot be negative' };
  }
  return { isValid: true };
}

export function validateOtherFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Other fees cannot be negative' };
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

export function validateExpectedPropertyAppreciation(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 30) {
    return { isValid: false, message: 'Expected property appreciation must be between -10% and 30%' };
  }
  return { isValid: true };
}

export function validateOriginalLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Original loan term must be greater than 0 years' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Original loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateRemainingTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Remaining term cannot be negative' };
  }
  if (allInputs?.originalLoanTerm && value > allInputs.originalLoanTerm) {
    return { isValid: false, message: 'Remaining term cannot exceed original loan term' };
  }
  return { isValid: true };
}