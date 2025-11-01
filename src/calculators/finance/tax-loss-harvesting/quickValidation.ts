import { TaxLossHarvestingInputs } from './types';

export function validateCurrentPortfolioValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Portfolio value must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Portfolio value cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateRealizedGains(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Realized gains cannot be negative' };
  }
  return { isValid: true };
}

export function validateRealizedLosses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Realized losses cannot be negative' };
  }
  return { isValid: true };
}

export function validateShortTermGains(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Short-term gains cannot be negative' };
  }
  return { isValid: true };
}

export function validateShortTermLosses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Short-term losses cannot be negative' };
  }
  return { isValid: true };
}

export function validateLongTermGains(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Long-term gains cannot be negative' };
  }
  return { isValid: true };
}

export function validateLongTermLosses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Long-term losses cannot be negative' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Tax rate must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateWashSalePeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Wash sale period cannot be negative' };
  }
  if (value > 365) {
    return { isValid: false, message: 'Wash sale period cannot exceed 365 days' };
  }
  return { isValid: true };
}

export function validateInvestmentHorizon(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Investment horizon must be at least 1 year' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Investment horizon cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -20 || value > 50) {
    return { isValid: false, message: 'Expected return must be between -20% and 50%' };
  }
  return { isValid: true };
}

export function validateVolatility(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Volatility must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateTransactionCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Transaction costs cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Transaction costs cannot exceed $1,000' };
  }
  return { isValid: true };
}

export function validateMinimumHarvestAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Minimum harvest amount must be greater than 0' };
  }
  if (allInputs?.currentPortfolioValue && value > allInputs.currentPortfolioValue) {
    return { isValid: false, message: 'Minimum harvest amount cannot exceed portfolio value' };
  }
  return { isValid: true };
}