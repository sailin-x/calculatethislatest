import { FourOhThreeBInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Current age must be at least 18' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Current age cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Retirement age must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Retirement age cannot exceed 100' };
  }
  if (allInputs?.currentAge && value <= allInputs.currentAge) {
    return { isValid: false, message: 'Retirement age must be greater than current age' };
  }
  return { isValid: true };
}

export function validateCurrentSalary(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current salary must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Current salary seems unusually high' };
  }
  return { isValid: true };
}

export function validateEmployeeContributionPercent(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Employee contribution percentage cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Employee contribution percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateEmployerMatchPercent(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Employer match percentage cannot be negative' };
  }
  if (value > 200) {
    return { isValid: false, message: 'Employer match percentage seems unusually high' };
  }
  return { isValid: true };
}

export function validateEmployerMatchLimitPercent(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Employer match limit percentage cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Employer match limit percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateExpectedAnnualSalaryIncrease(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < -10) {
    return { isValid: false, message: 'Expected salary increase cannot be less than -10%' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Expected salary increase seems unusually high (>20%)' };
  }
  return { isValid: true };
}

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Current balance cannot be negative' };
  }
  return { isValid: true };
}

export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < -10) {
    return { isValid: false, message: 'Expected annual return cannot be less than -10%' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Expected annual return seems unusually high (>30%)' };
  }
  return { isValid: true };
}

export function validateInvestmentFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Investment fees cannot be negative' };
  }
  if (value > 5) {
    return { isValid: false, message: 'Investment fees seem unusually high (>5%)' };
  }
  return { isValid: true };
}

export function validateCurrentTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Current tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Current tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateRetirementTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Retirement tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Retirement tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateCatchUpContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < 0) {
    return { isValid: false, message: 'Catch-up contribution cannot be negative' };
  }
  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validPeriods = ['annual', 'monthly'];
  if (!validPeriods.includes(value)) {
    return { isValid: false, message: 'Analysis period must be annual or monthly' };
  }
  return { isValid: true };
}