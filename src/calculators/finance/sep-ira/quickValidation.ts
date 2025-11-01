import { SEPIRAInputs } from './types';

export function validateSelfEmploymentIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Self-employment income must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Self-employment income cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateEmployerContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Employer contribution cannot be negative' };
  }
  return { isValid: true };
}

export function validateEmployeeContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Employee contribution cannot be negative' };
  }
  return { isValid: true };
}

export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 50) {
    return { isValid: false, message: 'Expected return must be between -10% and 50%' };
  }
  return { isValid: true };
}

export function validateYearsToContribute(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Years to contribute must be at least 1' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Years to contribute cannot exceed 50' };
  }
  return { isValid: true };
}

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Current balance cannot be negative' };
  }
  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Tax bracket must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateFilingStatus(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validStatuses = ['single', 'married_filing_jointly', 'married_filing_separately'];
  if (!value || !validStatuses.includes(value)) {
    return { isValid: false, message: 'Please select a valid filing status' };
  }
  return { isValid: true };
}

export function validateNumberOfEmployees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Number of employees cannot be negative' };
  }
  return { isValid: true };
}

export function validateBusinessType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['sole_proprietorship', 'partnership', 'corporation'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid business type' };
  }
  return { isValid: true };
}