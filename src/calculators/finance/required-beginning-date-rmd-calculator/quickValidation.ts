import { RequiredBeginningDateRmdInputs } from './types';

export function validateAccountBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Account balance cannot be negative' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Account balance cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Current age must be at least 18' };
  }
  if (value > 120) {
    return { isValid: false, message: 'Current age cannot exceed 120' };
  }
  return { isValid: true };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Life expectancy must be at least 18' };
  }
  if (value > 130) {
    return { isValid: false, message: 'Life expectancy cannot exceed 130' };
  }
  if (allInputs?.currentAge && value <= allInputs.currentAge) {
    return { isValid: false, message: 'Life expectancy must be greater than current age' };
  }
  return { isValid: true };
}

export function validateMarginalTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Marginal tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Marginal tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'State tax rate cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, message: 'State tax rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateExpectedReturnRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -20) {
    return { isValid: false, message: 'Expected return rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Expected return rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5) {
    return { isValid: false, message: 'Inflation rate cannot be less than -5%' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Inflation rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateSpouseAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.includeSpouse) {
    if (!value || value < 18) {
      return { isValid: false, message: 'Spouse age must be at least 18' };
    }
    if (value > 120) {
      return { isValid: false, message: 'Spouse age cannot exceed 120' };
    }
  }
  return { isValid: true };
}

export function validateInheritanceDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.accountType === 'inherited_ira' && !value) {
    return { isValid: false, message: 'Inheritance date is required for inherited IRAs' };
  }
  return { isValid: true };
}

export function validateDecedentBirthDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.accountType === 'inherited_ira' && !value) {
    return { isValid: false, message: 'Decedent birth date is required for inherited IRAs' };
  }
  return { isValid: true };
}

export function validateDecedentDeathDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.accountType === 'inherited_ira' && !value) {
    return { isValid: false, message: 'Decedent death date is required for inherited IRAs' };
  }
  return { isValid: true };
}