import { ComplexNumberInputs } from './types';

export function validateRealPart(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Real part must be a valid number';
  if (!isFinite(value)) return 'Real part must be finite';
  if (value > 1e15) return 'Real part seems unusually large';
  if (value < -1e15) return 'Real part seems unusually small';
  return null;
}

export function validateImaginaryPart(value: number, allInputs?: Record<string, any>): string | null {
  if (typeof value !== 'number' || isNaN(value)) return 'Imaginary part must be a valid number';
  if (!isFinite(value)) return 'Imaginary part must be finite';
  if (value > 1e15) return 'Imaginary part seems unusually large';
  if (value < -1e15) return 'Imaginary part seems unusually small';
  return null;
}

export function validateOperation(value: string, allInputs?: Record<string, any>): string | null {
  const validOperations = ['add', 'subtract', 'multiply', 'divide', 'power', 'root', 'conjugate', 'absolute', 'argument', 'exponential', 'logarithm', 'trigonometric'];
  if (!validOperations.includes(value)) {
    return 'Operation must be one of: add, subtract, multiply, divide, power, root, conjugate, absolute, argument, exponential, logarithm, trigonometric';
  }
  return null;
}

export function validateSecondRealPart(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (typeof value !== 'number' || isNaN(value)) return 'Second real part must be a valid number';
  if (!isFinite(value)) return 'Second real part must be finite';
  if (value > 1e15) return 'Second real part seems unusually large';
  if (value < -1e15) return 'Second real part seems unusually small';
  return null;
}

export function validateSecondImaginaryPart(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (typeof value !== 'number' || isNaN(value)) return 'Second imaginary part must be a valid number';
  if (!isFinite(value)) return 'Second imaginary part must be finite';
  if (value > 1e15) return 'Second imaginary part seems unusually large';
  if (value < -1e15) return 'Second imaginary part seems unusually small';
  return null;
}

export function validatePower(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (typeof value !== 'number' || isNaN(value)) return 'Power must be a valid number';
  if (!isFinite(value)) return 'Power must be finite';
  if (value > 1000) return 'Power seems unusually high';
  if (value < -1000) return 'Power seems unusually low';
  return null;
}

export function validateRootIndex(value: number, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  if (typeof value !== 'number' || isNaN(value)) return 'Root index must be a valid number';
  if (!isFinite(value)) return 'Root index must be finite';
  if (value <= 0) return 'Root index must be positive';
  if (value > 100) return 'Root index seems unusually high';
  if (!Number.isInteger(value)) return 'Root index must be an integer';
  return null;
}

export function validateAngleUnit(value: string, allInputs?: Record<string, any>): string | null {
  const validUnits = ['radians', 'degrees'];
  if (!validUnits.includes(value)) {
    return 'Angle unit must be either radians or degrees';
  }
  return null;
}

export function validatePrecision(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Precision must be non-negative';
  if (value > 20) return 'Precision cannot exceed 20 decimal places';
  if (!Number.isInteger(value)) return 'Precision must be an integer';
  return null;
}

export function validateTrigonometricFunction(value: string, allInputs?: Record<string, any>): string | null {
  if (!value) return null; // Optional field
  
  const validFunctions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'];
  if (!validFunctions.includes(value)) {
    return 'Trigonometric function must be one of: sin, cos, tan, asin, acos, atan';
  }
  return null;
}
