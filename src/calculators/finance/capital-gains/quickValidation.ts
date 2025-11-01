import { CapitalGainsInputs } from './types';

export function validateAcquisitionPrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0) {
    return { isValid: false, message: 'Acquisition price must be positive' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Acquisition price cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateSalePrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0) {
    return { isValid: false, message: 'Sale price must be positive' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Sale price cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateQuantity(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0) {
    return { isValid: false, message: 'Quantity must be positive' };
  }
  if (value > 1000000) {
    return { isValid: false, message: 'Quantity cannot exceed 1,000,000' };
  }
  return { isValid: true };
}

export function validateAcquisitionDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Acquisition date is required' };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Acquisition date must be a valid date' };
  }
  return { isValid: true };
}

export function validateSaleDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Sale date is required' };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Sale date must be a valid date' };
  }
  if (allInputs?.acquisitionDate) {
    const acquisitionDate = new Date(allInputs.acquisitionDate);
    const saleDate = new Date(value);
    if (saleDate < acquisitionDate) {
      return { isValid: false, message: 'Sale date cannot be before acquisition date' };
    }
  }
  return { isValid: true };
}

export function validateAcquisitionCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Acquisition costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateSaleCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Sale costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Tax rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 20) {
    return { isValid: false, message: 'Inflation rate must be between -10% and 20%' };
  }
  return { isValid: true };
}

export function validateHoldingPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !['short', 'long'].includes(value)) {
    return { isValid: false, message: 'Holding period must be short or long' };
  }
  return { isValid: true };
}