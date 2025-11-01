import { BlackLittermanInputs } from './types';

export function validateMarketWeights(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !Array.isArray(value)) {
    return { isValid: false, message: 'Market weights must be an array' };
  }
  if (value.length < 2) {
    return { isValid: false, message: 'At least 2 market weights are required' };
  }
  if (value.length > 10) {
    return { isValid: false, message: 'Market weights cannot exceed 10 assets' };
  }
  for (const item of value) {
    if (typeof item !== 'number' || !isFinite(item)) {
      return { isValid: false, message: 'All market weights must be valid numbers' };
    }
    if (item < 0 || item > 1) {
      return { isValid: false, message: 'Market weights must be between 0 and 1' };
    }
  }
  const sum = value.reduce((a: number, b: number) => a + b, 0);
  if (Math.abs(sum - 1) > 0.01) {
    return { isValid: false, message: 'Market weights must sum to 1' };
  }
  return { isValid: true };
}

export function validateMarketReturns(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !Array.isArray(value)) {
    return { isValid: false, message: 'Market returns must be an array' };
  }
  if (allInputs?.marketWeights && value.length !== allInputs.marketWeights.length) {
    return { isValid: false, message: 'Market returns must have same length as market weights' };
  }
  for (const item of value) {
    if (typeof item !== 'number' || !isFinite(item)) {
      return { isValid: false, message: 'All market returns must be valid numbers' };
    }
    if (Math.abs(item) > 1) {
      return { isValid: false, message: 'Market returns cannot exceed ±100%' };
    }
  }
  return { isValid: true };
}

export function validateMarketCovariance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || !Array.isArray(value)) {
    return { isValid: false, message: 'Market covariance must be a matrix' };
  }
  const n = allInputs?.marketWeights?.length || 0;
  if (value.length !== n) {
    return { isValid: false, message: 'Covariance matrix must match number of assets' };
  }
  for (const row of value) {
    if (!Array.isArray(row) || row.length !== n) {
      return { isValid: false, message: 'Covariance matrix must be square' };
    }
    for (const item of row) {
      if (typeof item !== 'number' || !isFinite(item)) {
        return { isValid: false, message: 'All covariance values must be valid numbers' };
      }
    }
  }
  return { isValid: true };
}

export function validateInvestorViews(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'object') {
    return { isValid: false, message: 'Investor views must be an object' };
  }
  const { assets, returns, confidences } = value;
  if (!Array.isArray(assets) || !Array.isArray(returns) || !Array.isArray(confidences)) {
    return { isValid: false, message: 'All investor view arrays must be provided' };
  }
  if (assets.length !== returns.length || assets.length !== confidences.length) {
    return { isValid: false, message: 'All investor view arrays must have equal length' };
  }
  const n = allInputs?.marketWeights?.length || 0;
  for (let i = 0; i < assets.length; i++) {
    if (!Number.isInteger(assets[i]) || assets[i] < 0 || assets[i] >= n) {
      return { isValid: false, message: `Asset index ${assets[i]} is invalid` };
    }
    if (typeof returns[i] !== 'number' || !isFinite(returns[i])) {
      return { isValid: false, message: 'All view returns must be valid numbers' };
    }
    if (typeof confidences[i] !== 'number' || confidences[i] < 0 || confidences[i] > 1) {
      return { isValid: false, message: 'All confidences must be between 0 and 1' };
    }
  }
  return { isValid: true };
}

export function validateRiskAversion(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (typeof value !== 'number' || !isFinite(value)) {
    return { isValid: false, message: 'Risk aversion must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Risk aversion must be positive' };
  }
  return { isValid: true };
}

export function validateTau(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (typeof value !== 'number' || !isFinite(value)) {
    return { isValid: false, message: 'Tau must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Tau must be positive' };
  }
  return { isValid: true };
}