import { RetirementAbroadInputs } from './types';

export function validateCurrentAnnualIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current annual income must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Current annual income cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateCurrentAnnualExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Current annual expenses cannot be negative' };
  }
  return { isValid: true };
}

export function validateTargetCountry(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim() === '') {
    return { isValid: false, message: 'Target country is required' };
  }
  return { isValid: true };
}

export function validateCurrentCountry(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim() === '') {
    return { isValid: false, message: 'Current country is required' };
  }
  return { isValid: true };
}

export function validateYearsToRetirement(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Years to retirement cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Years to retirement cannot exceed 50' };
  }
  return { isValid: true };
}

export function validateExpectedInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 20) {
    return { isValid: false, message: 'Expected inflation rate must be between -5% and 20%' };
  }
  return { isValid: true };
}

export function validateExpectedInvestmentReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 50) {
    return { isValid: false, message: 'Expected investment return must be between -10% and 50%' };
  }
  return { isValid: true };
}

export function validateCurrentSavings(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Current savings cannot be negative' };
  }
  return { isValid: true };
}

export function validateMonthlyRetirementContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Monthly retirement contribution cannot be negative' };
  }
  return { isValid: true };
}

export function validateHealthcareCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Healthcare costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateHousingCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Housing costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateTransportationCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Transportation costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateFoodCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Food costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateEntertainmentCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Entertainment costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Tax rate must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateExchangeRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Exchange rate must be greater than 0' };
  }
  return { isValid: true };
}