import { CorrelationInputs } from './types';

export function validateAsset1Returns(value: any): { isValid: boolean; message?: string } {
  if (!value || !Array.isArray(value)) {
    return { isValid: false, message: 'Asset 1 returns must be an array' };
  }
  if (value.length < 2) {
    return { isValid: false, message: 'Asset 1 returns must have at least 2 data points' };
  }
  if (value.some((v: any) => isNaN(v))) {
    return { isValid: false, message: 'Asset 1 returns must contain only numbers' };
  }
  return { isValid: true };
}

export function validateAsset2Returns(value: any): { isValid: boolean; message?: string } {
  if (!value || !Array.isArray(value)) {
    return { isValid: false, message: 'Asset 2 returns must be an array' };
  }
  if (value.length < 2) {
    return { isValid: false, message: 'Asset 2 returns must have at least 2 data points' };
  }
  if (value.some((v: any) => isNaN(v))) {
    return { isValid: false, message: 'Asset 2 returns must contain only numbers' };
  }
  return { isValid: true };
}

export function validateAsset1Name(value: any): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, message: 'Asset 1 name is required' };
  }
  return { isValid: true };
}

export function validateAsset2Name(value: any): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, message: 'Asset 2 name is required' };
  }
  return { isValid: true };
}

export function validateConfidenceLevel(value: any): { isValid: boolean; message?: string } {
  if (!value || value < 80 || value > 99) {
    return { isValid: false, message: 'Confidence level must be between 80 and 99' };
  }
  return { isValid: true };
}

export function validateTimePeriod(value: any): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, message: 'Time period is required' };
  }
  return { isValid: true };
}

export function validateCalculationMethod(value: any): { isValid: boolean; message?: string } {
  const validMethods = ['pearson', 'spearman', 'kendall'];
  if (!value || !validMethods.includes(value)) {
    return { isValid: false, message: 'Calculation method must be pearson, spearman, or kendall' };
  }
  return { isValid: true };
}

export function validateRiskFreeRate(value: any): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < -0.1 || value > 0.2) {
    return { isValid: false, message: 'Risk free rate must be between -10% and 20%' };
  }
  return { isValid: true };
}

export function validateBenchmarkReturns(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  if (!Array.isArray(value)) {
    return { isValid: false, message: 'Benchmark returns must be an array' };
  }
  if (value.some((v: any) => isNaN(v))) {
    return { isValid: false, message: 'Benchmark returns must contain only numbers' };
  }
  if (allInputs?.asset1Returns && value.length !== allInputs.asset1Returns.length) {
    return { isValid: false, message: 'Benchmark returns must have the same length as asset returns' };
  }
  return { isValid: true };
}

export function validateBenchmarkName(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.benchmarkReturns && (!value || typeof value !== 'string' || value.trim().length === 0)) {
    return { isValid: false, message: 'Benchmark name is required when benchmark returns are provided' };
  }
  return { isValid: true };
}