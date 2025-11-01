import { BetaInputs } from './types';

export function validateStockReturns(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !Array.isArray(value)) {
    return { isValid: false, message: 'Stock returns must be an array' };
  }
  if (value.length < 2) {
    return { isValid: false, message: 'At least 2 stock returns are required' };
  }
  if (value.length > 10000) {
    return { isValid: false, message: 'Stock returns cannot exceed 10,000 data points' };
  }
  for (const item of value) {
    if (typeof item !== 'number' || !isFinite(item)) {
      return { isValid: false, message: 'All stock returns must be valid numbers' };
    }
    if (Math.abs(item) > 100) {
      return { isValid: false, message: 'Stock returns cannot exceed ±100%' };
    }
  }
  return { isValid: true };
}

export function validateMarketReturns(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !Array.isArray(value)) {
    return { isValid: false, message: 'Market returns must be an array' };
  }
  if (value.length < 2) {
    return { isValid: false, message: 'At least 2 market returns are required' };
  }
  if (value.length > 10000) {
    return { isValid: false, message: 'Market returns cannot exceed 10,000 data points' };
  }
  if (allInputs?.stockReturns && value.length !== allInputs.stockReturns.length) {
    return { isValid: false, message: 'Market returns must have same length as stock returns' };
  }
  for (const item of value) {
    if (typeof item !== 'number' || !isFinite(item)) {
      return { isValid: false, message: 'All market returns must be valid numbers' };
    }
    if (Math.abs(item) > 100) {
      return { isValid: false, message: 'Market returns cannot exceed ±100%' };
    }
  }
  return { isValid: true };
}

export function validateRiskFreeRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 20) {
    return { isValid: false, message: 'Risk-free rate must be between -10% and 20%' };
  }
  return { isValid: true };
}

export function validateTimePeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !['daily', 'weekly', 'monthly', 'quarterly', 'yearly'].includes(value)) {
    return { isValid: false, message: 'Time period must be daily, weekly, monthly, quarterly, or yearly' };
  }
  return { isValid: true };
}

export function validateBenchmarkIndex(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, message: 'Benchmark index must be specified' };
  }
  return { isValid: true };
}

export function validateConfidenceLevel(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0.8 || value > 0.99) {
    return { isValid: false, message: 'Confidence level must be between 80% and 99%' };
  }
  return { isValid: true };
}