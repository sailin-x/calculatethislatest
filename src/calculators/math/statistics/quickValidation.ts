import { StatisticsInputs } from './types';

export function validateData(value: number[], allInputs?: Record<string, any>): string | null {
  if (!Array.isArray(value)) return 'Data must be an array';
  if (value.length === 0) return 'Data array cannot be empty';
  if (value.length > 10000) return 'Data array is too large';
  
  for (let i = 0; i < value.length; i++) {
    if (typeof value[i] !== 'number' || isNaN(value[i])) {
      return `Data element at index ${i} must be a valid number`;
    }
    if (!isFinite(value[i])) {
      return `Data element at index ${i} must be finite`;
    }
  }
  return null;
}

export function validateWeights(value: number[], allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (!Array.isArray(value)) return 'Weights must be an array';
  if (value.length === 0) return 'Weights array cannot be empty';
  
  for (let i = 0; i < value.length; i++) {
    if (typeof value[i] !== 'number' || isNaN(value[i])) {
      return `Weight element at index ${i} must be a valid number`;
    }
    if (value[i] < 0) {
      return `Weight element at index ${i} must be non-negative`;
    }
  }
  
  if (allInputs && allInputs.data && value.length !== allInputs.data.length) {
    return 'Weights array length must match data array length';
  }
  return null;
}

export function validateConfidenceLevel(value: number, allInputs?: Record<string, any>): string | null {
  if (value <= 0 || value >= 1) return 'Confidence level must be between 0 and 1';
  if (value < 0.5) return 'Confidence level should typically be at least 0.5';
  if (value > 0.999) return 'Confidence level should typically be less than 0.999';
  return null;
}

export function validatePopulationSize(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (value <= 0) return 'Population size must be positive';
  if (!Number.isInteger(value)) return 'Population size must be an integer';
  if (value > 1e9) return 'Population size seems unusually large';
  return null;
}

export function validateSampleSize(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (value <= 0) return 'Sample size must be positive';
  if (!Number.isInteger(value)) return 'Sample size must be an integer';
  if (value > 1e6) return 'Sample size seems unusually large';
  
  if (allInputs && allInputs.populationSize && value > allInputs.populationSize) {
    return 'Sample size cannot exceed population size';
  }
  return null;
}

export function validateNullValue(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (typeof value !== 'number' || isNaN(value)) return 'Null value must be a valid number';
  if (!isFinite(value)) return 'Null value must be finite';
  return null;
}

export function validateAlternative(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  const validAlternatives = ['two-tailed', 'left-tailed', 'right-tailed'];
  if (!validAlternatives.includes(value)) {
    return 'Alternative must be one of: two-tailed, left-tailed, right-tailed';
  }
  return null;
}

export function validateSignificanceLevel(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (value <= 0 || value >= 1) return 'Significance level must be between 0 and 1';
  if (value > 0.5) return 'Significance level should typically be less than 0.5';
  return null;
}

export function validateXValues(value: number[], allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (!Array.isArray(value)) return 'X values must be an array';
  if (value.length === 0) return 'X values array cannot be empty';
  if (value.length > 10000) return 'X values array is too large';
  
  for (let i = 0; i < value.length; i++) {
    if (typeof value[i] !== 'number' || isNaN(value[i])) {
      return `X value at index ${i} must be a valid number`;
    }
    if (!isFinite(value[i])) {
      return `X value at index ${i} must be finite`;
    }
  }
  return null;
}

export function validateYValues(value: number[], allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (!Array.isArray(value)) return 'Y values must be an array';
  if (value.length === 0) return 'Y values array cannot be empty';
  if (value.length > 10000) return 'Y values array is too large';
  
  for (let i = 0; i < value.length; i++) {
    if (typeof value[i] !== 'number' || isNaN(value[i])) {
      return `Y value at index ${i} must be a valid number`;
    }
    if (!isFinite(value[i])) {
      return `Y value at index ${i} must be finite`;
    }
  }
  
  if (allInputs && allInputs.regression && allInputs.regression.xValues && value.length !== allInputs.regression.xValues.length) {
    return 'Y values array length must match X values array length';
  }
  return null;
}
