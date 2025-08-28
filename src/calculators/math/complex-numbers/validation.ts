import { ComplexNumberInputs } from './types';

export function validateComplexNumberInputs(inputs: ComplexNumberInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required field validation
  if (inputs.realPart === undefined || inputs.realPart === null) {
    errors.push('Real part is required');
  } else if (typeof inputs.realPart !== 'number' || isNaN(inputs.realPart)) {
    errors.push('Real part must be a valid number');
  } else if (!isFinite(inputs.realPart)) {
    errors.push('Real part must be finite');
  } else if (inputs.realPart > 1e15) {
    errors.push('Real part seems unusually large');
  } else if (inputs.realPart < -1e15) {
    errors.push('Real part seems unusually small');
  }

  if (inputs.imaginaryPart === undefined || inputs.imaginaryPart === null) {
    errors.push('Imaginary part is required');
  } else if (typeof inputs.imaginaryPart !== 'number' || isNaN(inputs.imaginaryPart)) {
    errors.push('Imaginary part must be a valid number');
  } else if (!isFinite(inputs.imaginaryPart)) {
    errors.push('Imaginary part must be finite');
  } else if (inputs.imaginaryPart > 1e15) {
    errors.push('Imaginary part seems unusually large');
  } else if (inputs.imaginaryPart < -1e15) {
    errors.push('Imaginary part seems unusually small');
  }

  if (!inputs.operation) {
    errors.push('Operation is required');
  } else {
    const validOperations = ['add', 'subtract', 'multiply', 'divide', 'power', 'root', 'conjugate', 'absolute', 'argument', 'exponential', 'logarithm', 'trigonometric'];
    if (!validOperations.includes(inputs.operation)) {
      errors.push('Operation must be one of: add, subtract, multiply, divide, power, root, conjugate, absolute, argument, exponential, logarithm, trigonometric');
    }
  }

  if (inputs.angleUnit === undefined || inputs.angleUnit === null) {
    errors.push('Angle unit is required');
  } else {
    const validUnits = ['radians', 'degrees'];
    if (!validUnits.includes(inputs.angleUnit)) {
      errors.push('Angle unit must be either radians or degrees');
    }
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
  if (inputs.secondRealPart !== undefined && inputs.secondRealPart !== null) {
    if (typeof inputs.secondRealPart !== 'number' || isNaN(inputs.secondRealPart)) {
      errors.push('Second real part must be a valid number');
    } else if (!isFinite(inputs.secondRealPart)) {
      errors.push('Second real part must be finite');
    } else if (inputs.secondRealPart > 1e15) {
      errors.push('Second real part seems unusually large');
    } else if (inputs.secondRealPart < -1e15) {
      errors.push('Second real part seems unusually small');
    }
  }

  if (inputs.secondImaginaryPart !== undefined && inputs.secondImaginaryPart !== null) {
    if (typeof inputs.secondImaginaryPart !== 'number' || isNaN(inputs.secondImaginaryPart)) {
      errors.push('Second imaginary part must be a valid number');
    } else if (!isFinite(inputs.secondImaginaryPart)) {
      errors.push('Second imaginary part must be finite');
    } else if (inputs.secondImaginaryPart > 1e15) {
      errors.push('Second imaginary part seems unusually large');
    } else if (inputs.secondImaginaryPart < -1e15) {
      errors.push('Second imaginary part seems unusually small');
    }
  }

  if (inputs.power !== undefined && inputs.power !== null) {
    if (typeof inputs.power !== 'number' || isNaN(inputs.power)) {
      errors.push('Power must be a valid number');
    } else if (!isFinite(inputs.power)) {
      errors.push('Power must be finite');
    } else if (inputs.power > 1000) {
      errors.push('Power seems unusually high');
    } else if (inputs.power < -1000) {
      errors.push('Power seems unusually low');
    }
  }

  if (inputs.rootIndex !== undefined && inputs.rootIndex !== null) {
    if (typeof inputs.rootIndex !== 'number' || isNaN(inputs.rootIndex)) {
      errors.push('Root index must be a valid number');
    } else if (!isFinite(inputs.rootIndex)) {
      errors.push('Root index must be finite');
    } else if (inputs.rootIndex <= 0) {
      errors.push('Root index must be positive');
    } else if (inputs.rootIndex > 100) {
      errors.push('Root index seems unusually high');
    } else if (!Number.isInteger(inputs.rootIndex)) {
      errors.push('Root index must be an integer');
    }
  }

  if (inputs.trigonometricFunction !== undefined && inputs.trigonometricFunction !== null) {
    const validFunctions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'];
    if (!validFunctions.includes(inputs.trigonometricFunction)) {
      errors.push('Trigonometric function must be one of: sin, cos, tan, asin, acos, atan');
    }
  }

  // Logical validation
  if (inputs.operation === 'divide' || inputs.operation === 'multiply' || inputs.operation === 'add' || inputs.operation === 'subtract') {
    if (inputs.secondRealPart === undefined || inputs.secondImaginaryPart === undefined) {
      errors.push('Second complex number is required for binary operations');
    }
  }

  if (inputs.operation === 'power') {
    if (inputs.power === undefined) {
      errors.push('Power is required for power operation');
    }
  }

  if (inputs.operation === 'root') {
    if (inputs.rootIndex === undefined) {
      errors.push('Root index is required for root operation');
    }
  }

  if (inputs.operation === 'trigonometric') {
    if (!inputs.trigonometricFunction) {
      errors.push('Trigonometric function is required for trigonometric operation');
    }
  }

  if (inputs.operation === 'divide' && inputs.secondRealPart === 0 && inputs.secondImaginaryPart === 0) {
    errors.push('Cannot divide by zero');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
