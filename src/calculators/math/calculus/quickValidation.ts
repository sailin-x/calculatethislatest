import { CalculusInputs } from './types';

export function validateOperation(value: string, allInputs?: Record<string, any>): string | null {
  const validOperations = ['derivative', 'integral', 'limit', 'series', 'taylor', 'fourier', 'laplace', 'inverse_laplace'];
  if (!validOperations.includes(value)) {
    return 'Operation must be one of: derivative, integral, limit, series, taylor, fourier, laplace, inverse_laplace';
  }
  return null;
}

export function validateFunction(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim() === '') return 'Function expression is required';
  if (value.length > 1000) return 'Function expression is too long';
  return null;
}

export function validateVariable(value: string, allInputs?: Record<string, any>): string | null {
  if (!value || value.trim() === '') return 'Variable is required';
  if (value.length > 10) return 'Variable name is too long';
  if (!/^[AZaZ]$/.test(value)) return 'Variable must be a single letter';
  return null;
}

export function validateLowerBound(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Lower bound must be a valid number';
  if (!isFinite(value)) return 'Lower bound must be finite';
  return null;
}

export function validateUpperBound(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Upper bound must be a valid number';
  if (!isFinite(value)) return 'Upper bound must be finite';
  return null;
}

export function validatePoint(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Point must be a valid number';
  if (!isFinite(value)) return 'Point must be finite';
  return null;
}

export function validateOrder(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (typeof value !== 'number' || isNaN(value)) return 'Order must be a valid number';
  if (!Number.isInteger(value)) return 'Order must be an integer';
  if (value < 0) return 'Order must be non-negative';
  if (value > 100) return 'Order seems unusually high';
  return null;
}

export function validatePrecision(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Precision must be non-negative';
  if (value > 20) return 'Precision cannot exceed 20 decimal places';
  if (!Number.isInteger(value)) return 'Precision must be an integer';
  return null;
}

export function validateMethod(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  const validMethods = ['simpson', 'trapezoidal', 'romberg', 'gauss', 'monte_carlo'];
  if (!validMethods.includes(value)) {
    return 'Method must be one of: simpson, trapezoidal, romberg, gauss, monte_carlo';
  }
  return null;
}

export function validateDirection(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  const validDirections = ['left', 'right', 'both'];
  if (!validDirections.includes(value)) {
    return 'Direction must be one of: left, right, both';
  }
  return null;
}
