import { MortgageRefinanceInputs } from './types';

export function validateCurrentLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Current loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateCurrentInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Current interest rate cannot be negative' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Current interest rate cannot exceed 30%' };
  }
  return { isValid: true };
}

export function validateNewInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'New interest rate cannot be negative' };
  }
  if (value > 30) {
    return { isValid: false, message: 'New interest rate cannot exceed 30%' };
  }
  return { isValid: true };
}

export function validateCurrentLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current loan term must be greater than 0 months' };
  }
  if (value > 360) {
    return { isValid: false, message: 'Current loan term cannot exceed 360 months' };
  }
  return { isValid: true };
}

export function validateNewLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'New loan term must be greater than 0 years' };
  }
  if (value > 50) {
    return { isValid: false, message: 'New loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
  }
  return { isValid: true };
}

export function validateCurrentLoanBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current loan balance must be greater than 0' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, message: 'Current loan balance cannot exceed property value' };
  }
  return { isValid: true };
}

export function validateCurrentMonthlyPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current monthly payment must be greater than 0' };
  }
  return { isValid: true };
}

export function validateCashOutAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Cash out amount cannot be negative' };
  }
  return { isValid: true };
}

export function validateExpectedStayDuration(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Expected stay duration must be greater than 0 months' };
  }
  return { isValid: true };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Closing costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 300) {
    return { isValid: false, message: 'Credit score must be at least 300' };
  }
  if (value > 850) {
    return { isValid: false, message: 'Credit score cannot exceed 850' };
  }
  return { isValid: true };
}

export function validateCurrentLoanOriginationDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Current loan origination date is required' };
  }
  const originationDate = new Date(value);
  const today = new Date();
  if (originationDate > today) {
    return { isValid: false, message: 'Origination date cannot be in the future' };
  }
  return { isValid: true };
}