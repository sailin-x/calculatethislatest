import { MatrixInputs } from './types';

export function validateOperation(value: string, allInputs?: Record<string, any>): string | null {
  const validOperations = ['add', 'subtract', 'multiply', 'determinant', 'inverse', 'transpose', 'eigenvalues', 'eigenvectors', 'rank', 'trace', 'power', 'solve', 'lu_decomposition', 'qr_decomposition', 'svd'];
  if (!validOperations.includes(value)) {
    return 'Operation must be one of: add, subtract, multiply, determinant, inverse, transpose, eigenvalues, eigenvectors, rank, trace, power, solve, lu_decomposition, qr_decomposition, svd';
  }
  return null;
}

export function validateMatrixA(value: number[][], allInputs?: Record<string, any>): string | null {
  if (!Array.isArray(value) || value.length === 0) return 'Matrix A must be a non-empty array';
  
  const rows = value.length;
  const firstRowLength = value[0]?.length;
  
  if (!firstRowLength) return 'Matrix A must have at least one column';
  
  for (let i = 0; i < rows; i++) {
    if (!Array.isArray(value[i])) return `Row ${i} must be an array`;
    if (value[i].length !== firstRowLength) return `All rows must have the same length`;
    
    for (let j = 0; j < value[i].length; j++) {
      if (typeof value[i][j] !== 'number' || isNaN(value[i][j])) {
        return `Element at [${i}][${j}] must be a valid number`;
      }
      if (!isFinite(value[i][j])) return `Element at [${i}][${j}] must be finite`;
    }
  }
  
  if (rows > 100 || firstRowLength > 100) return 'Matrix dimensions are too large';
  
  return null;
}

export function validateMatrixB(value: number[][], allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (!Array.isArray(value) || value.length === 0) return 'Matrix B must be a non-empty array';
  
  const rows = value.length;
  const firstRowLength = value[0]?.length;
  
  if (!firstRowLength) return 'Matrix B must have at least one column';
  
  for (let i = 0; i < rows; i++) {
    if (!Array.isArray(value[i])) return `Row ${i} must be an array`;
    if (value[i].length !== firstRowLength) return `All rows must have the same length`;
    
    for (let j = 0; j < value[i].length; j++) {
      if (typeof value[i][j] !== 'number' || isNaN(value[i][j])) {
        return `Element at [${i}][${j}] must be a valid number`;
      }
      if (!isFinite(value[i][j])) return `Element at [${i}][${j}] must be finite`;
    }
  }
  
  if (rows > 100 || firstRowLength > 100) return 'Matrix dimensions are too large';
  
  return null;
}

export function validatePower(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (typeof value !== 'number' || isNaN(value)) return 'Power must be a valid number';
  if (!Number.isInteger(value)) return 'Power must be an integer';
  if (value < -100 || value > 100) return 'Power must be between -100 and 100';
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
  
  const validMethods = ['gaussian', 'lu', 'qr', 'svd'];
  if (!validMethods.includes(value)) {
    return 'Method must be one of: gaussian, lu, qr, svd';
  }
  return null;
}

export function validateTolerance(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (typeof value !== 'number' || isNaN(value)) return 'Tolerance must be a valid number';
  if (value <= 0) return 'Tolerance must be positive';
  if (value > 1) return 'Tolerance must be less than or equal to 1';
  return null;
}
