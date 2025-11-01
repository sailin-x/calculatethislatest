import { CommodityInputs } from './types';

export function validateCurrentPrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current price must be greater than 0' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Current price cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateQuantity(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Quantity must be greater than 0' };
  }
  if (value > 1000000) {
    return { isValid: false, message: 'Quantity cannot exceed 1,000,000 units' };
  }
  return { isValid: true };
}

export function validatePurchasePrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Purchase price must be greater than 0' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Purchase price cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateLeverageRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 1 || value > 100) {
    return { isValid: false, message: 'Leverage ratio must be between 1 and 100' };
  }
  return { isValid: true };
}

export function validateMarginRequirement(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Margin requirement cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, message: 'Margin requirement cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

export function validateContractSize(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0) {
    return { isValid: false, message: 'Contract size must be greater than 0' };
  }
  return { isValid: true };
}

export function validateTransactionCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Transaction costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateStorageCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Storage costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateInsuranceCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Insurance costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateHoldingPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Holding period cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Holding period cannot exceed 100 years' };
  }
  return { isValid: true };
}

export function validateMarketVolatility(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 5) {
    return { isValid: false, message: 'Market volatility must be between 0% and 500%' };
  }
  return { isValid: true };
}

export function validateCurrencyExchangeRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0) {
    return { isValid: false, message: 'Currency exchange rate must be greater than 0' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 1) {
    return { isValid: false, message: 'Tax rate must be between 0% and 100%' };
  }
  return { isValid: true };
}