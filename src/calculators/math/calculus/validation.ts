import { CalculusInputs } from './types';

export function validateCalculusInputs(inputs: CalculusInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.operation) {
    errors.push('Operation is required');
  } else {
    const validOperations = ['derivative', 'integral', 'limit', 'series', 'taylor', 'fourier', 'laplace', 'inverse_laplace'];
    if (!validOperations.includes(inputs.operation)) {
      errors.push('Invalid operation specified');
    }
  }

  if (!inputs.function) {
    errors.push('Function expression is required');
  } else if (inputs.function.length > 1000) {
    errors.push('Function expression is too long');
  }

  if (!inputs.variable) {
    errors.push('Variable is required');
  } else if (inputs.variable.length > 10) {
    errors.push('Variable name is too long');
  } else if (!/^[AZaZ]$/.test(inputs.variable)) {
    errors.push('Variable must be a single letter');
  }

  if (inputs.precision === undefined || inputs.precision === null) {
    errors.push('Precision is required');
  } else if (inputs.precision < 0) {
    errors.push('Precision must be non-negative');
  } else if (inputs.precision > 20) {
    errors.push('Precision cannot exceed 20 decimal places');
  } else if (!Number.isInteger(inputs.precision)) {
    errors.push('Precision must be an integer');
  }

  // Optional field validation
  if (inputs.lowerBound !== undefined && inputs.lowerBound !== null) {
    if (typeof inputs.lowerBound !== 'number' || isNaN(inputs.lowerBound)) {
      errors.push('Lower bound must be a valid number');
    } else if (!isFinite(inputs.lowerBound)) {
      errors.push('Lower bound must be finite');
    }
  }

  if (inputs.upperBound !== undefined && inputs.upperBound !== null) {
    if (typeof inputs.upperBound !== 'number' || isNaN(inputs.upperBound)) {
      errors.push('Upper bound must be a valid number');
    } else if (!isFinite(inputs.upperBound)) {
      errors.push('Upper bound must be finite');
    }
  }

  if (inputs.point !== undefined && inputs.point !== null) {
    if (typeof inputs.point !== 'number' || isNaN(inputs.point)) {
      errors.push('Point must be a valid number');
    } else if (!isFinite(inputs.point)) {
      errors.push('Point must be finite');
    }
  }

  if (inputs.order !== undefined && inputs.order !== null) {
    if (typeof inputs.order !== 'number' || isNaN(inputs.order)) {
      errors.push('Order must be a valid number');
    } else if (!Number.isInteger(inputs.order)) {
      errors.push('Order must be an integer');
    } else if (inputs.order < 0) {
      errors.push('Order must be non-negative');
    } else if (inputs.order > 100) {
      errors.push('Order seems unusually high');
    }
  }

  if (inputs.method !== undefined && inputs.method !== null) {
    const validMethods = ['simpson', 'trapezoidal', 'romberg', 'gauss', 'monte_carlo'];
    if (!validMethods.includes(inputs.method)) {
      errors.push('Invalid method specified');
    }
  }

  if (inputs.direction !== undefined && inputs.direction !== null) {
    const validDirections = ['left', 'right', 'both'];
    if (!validDirections.includes(inputs.direction)) {
      errors.push('Invalid direction specified');
    }
  }

  // Logical validation
  if (inputs.operation === 'integral') {
    if (inputs.lowerBound === undefined || inputs.upperBound === undefined) {
      errors.push('Integral requires both lower and upper bounds');
    }
    if (inputs.lowerBound !== undefined && inputs.upperBound !== undefined && inputs.lowerBound >= inputs.upperBound) {
      errors.push('Lower bound must be less than upper bound');
    }
  }

  if (inputs.operation === 'limit') {
    if (inputs.point === undefined) {
      errors.push('Limit requires a point');
    }
  }

  if (inputs.operation === 'taylor') {
    if (inputs.point === undefined) {
      errors.push('Taylor series requires a point');
    }
    if (inputs.order === undefined) {
      errors.push('Taylor series requires an order');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
