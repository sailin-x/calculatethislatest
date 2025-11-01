import { CalmarRatioInputs } from './types';

export function validatePortfolioValues(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !Array.isArray(value)) {
    return { isValid: false, message: 'Portfolio values must be an array' };
  }
  if (value.length < 3) {
    return { isValid: false, message: 'At least 3 portfolio values are required' };
  }
  if (value.length > 10000) {
    return { isValid: false, message: 'Portfolio values cannot exceed 10,000 data points' };
  }
  for (const item of value) {
    if (typeof item !== 'number' || !isFinite(item)) {
      return { isValid: false, message: 'All portfolio values must be valid numbers' };
    }
    if (item <= 0) {
      return { isValid: false, message: 'All portfolio values must be positive' };
    }
  }
  return { isValid: true };
}

export function validateTimePeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !['daily', 'weekly', 'monthly', 'quarterly', 'yearly'].includes(value)) {
    return { isValid: false, message: 'Time period must be daily, weekly, monthly, quarterly, or yearly' };
  }
  return { isValid: true };
}

export function validateRiskFreeRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 20) {
    return { isValid: false, message: 'Risk-free rate must be between -10% and 20%' };
  }
  return { isValid: true };
}

export function validateBenchmarkValues(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (!Array.isArray(value)) {
      return { isValid: false, message: 'Benchmark values must be an array' };
    }
    if (allInputs?.portfolioValues && value.length !== allInputs.portfolioValues.length) {
      return { isValid: false, message: 'Benchmark values must have same length as portfolio values' };
    }
    for (const item of value) {
      if (typeof item !== 'number' || !isFinite(item)) {
        return { isValid: false, message: 'All benchmark values must be valid numbers' };
      }
      if (item <= 0) {
        return { isValid: false, message: 'All benchmark values must be positive' };
      }
    }
  }
  return { isValid: true };
}