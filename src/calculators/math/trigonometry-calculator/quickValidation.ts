import { ValidationResult } from '../../../types/calculator';

/**
 * Quick validation functions for Trigonometry Calculator
 * Individual field validation with allInputs parameter as required
 */

// Operation validation
export function validateOperation(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validOperations = [
    'sine', 'cosine', 'tangent', 'cosecant', 'secant', 'cotangent',
    'arcsine', 'arccosine', 'arctangent', 'arctangent2',
    'hyperbolicSine', 'hyperbolicCosine', 'hyperbolicTangent',
    'solveRightTriangle', 'solveTriangleSAS', 'lawOfSines', 'lawOfCosinesSide', 'lawOfCosinesAngle'
  ];

  const isValid = validOperations.includes(value);
  return {
    isValid,
    errors: isValid ? {} : { operation: 'Invalid trigonometric operation' }
  };
}

// Angle validation
export function validateAngle(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  const trigonometricOps = ['sine', 'cosine', 'tangent', 'cosecant', 'secant', 'cotangent'];

  if (!trigonometricOps.includes(operation)) {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num >= -360 && num <= 360;

  return {
    isValid,
    errors: isValid ? {} : {
      angle: 'Angle must be between -360° and 360°'
    }
  };
}

// Angle unit validation
export function validateAngleUnit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  const trigonometricOps = ['sine', 'cosine', 'tangent', 'cosecant', 'secant', 'cotangent'];

  if (!trigonometricOps.includes(operation)) {
    return { isValid: true, errors: {} };
  }

  const isValid = value === 'degrees' || value === 'radians';
  return {
    isValid,
    errors: isValid ? {} : {
      angleUnit: 'Angle unit must be degrees or radians'
    }
  };
}

// Value validation for inverse functions
export function validateValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  const inverseOps = ['arcsine', 'arccosine'];
  const arctangentOps = ['arctangent'];

  if (inverseOps.includes(operation)) {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    const isValid = !isNaN(num) && num >= -1 && num <= 1;
    return {
      isValid,
      errors: isValid ? {} : {
        value: 'Value for inverse functions must be between -1 and 1'
      }
    };
  }

  if (arctangentOps.includes(operation)) {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    const isValid = !isNaN(num);
    return {
      isValid,
      errors: isValid ? {} : {
        value: 'Value for arctangent must be a valid number'
      }
    };
  }

  return { isValid: true, errors: {} };
}

// Result unit validation
export function validateResultUnit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  const inverseOps = ['arcsine', 'arccosine', 'arctangent', 'arctangent2'];

  if (!inverseOps.includes(operation)) {
    return { isValid: true, errors: {} };
  }

  const isValid = value === 'degrees' || value === 'radians';
  return {
    isValid,
    errors: isValid ? {} : {
      resultUnit: 'Result unit must be degrees or radians'
    }
  };
}

// Side validation
export function validateSideA(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  const triangleOps = ['solveRightTriangle', 'solveTriangleSAS', 'lawOfCosinesSide', 'lawOfCosinesAngle'];

  if (!triangleOps.includes(operation)) {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num > 0;

  return {
    isValid,
    errors: isValid ? {} : {
      sideA: 'Side A must be a positive number'
    }
  };
}

export function validateSideB(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  const triangleOps = ['solveRightTriangle', 'solveTriangleSAS', 'lawOfCosinesSide', 'lawOfCosinesAngle'];

  if (!triangleOps.includes(operation)) {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num > 0;

  return {
    isValid,
    errors: isValid ? {} : {
      sideB: 'Side B must be a positive number'
    }
  };
}

export function validateHypotenuse(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  if (operation !== 'solveRightTriangle') {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num > 0;

  return {
    isValid,
    errors: isValid ? {} : {
      hypotenuse: 'Hypotenuse must be a positive number'
    }
  };
}

export function validateSideC(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  const needsSideC = ['solveTriangleSAS', 'lawOfCosinesAngle'];

  if (!needsSideC.includes(operation)) {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num > 0;

  return {
    isValid,
    errors: isValid ? {} : {
      sideC: 'Side C must be a positive number'
    }
  };
}

// Angle validation for triangles
export function validateAngleB(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  if (operation !== 'solveTriangleSAS') {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num > 0 && num < 180;

  return {
    isValid,
    errors: isValid ? {} : {
      angleB: 'Angle B must be between 0° and 180°'
    }
  };
}

export function validateAngleC(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  if (operation !== 'lawOfCosinesSide') {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num > 0 && num < 180;

  return {
    isValid,
    errors: isValid ? {} : {
      angleC: 'Angle C must be between 0° and 180°'
    }
  };
}

// Law of sines validation
export function validateSide(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  if (operation !== 'lawOfSines') {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num > 0;

  return {
    isValid,
    errors: isValid ? {} : {
      side: 'Side must be a positive number'
    }
  };
}

export function validateTriangleAngle(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  if (operation !== 'lawOfSines') {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num) && num > 0 && num < 180;

  return {
    isValid,
    errors: isValid ? {} : {
      angle: 'Angle must be between 0° and 180°'
    }
  };
}

// Arctangent2 validation
export function validateX(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  if (operation !== 'arctangent2') {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num);

  return {
    isValid,
    errors: isValid ? {} : {
      x: 'X coordinate must be a valid number'
    }
  };
}

export function validateY(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  if (operation !== 'arctangent2') {
    return { isValid: true, errors: {} };
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = !isNaN(num);

  return {
    isValid,
    errors: isValid ? {} : {
      y: 'Y coordinate must be a valid number'
    }
  };
}

// Triangle inequality validation
export function validateTriangleInequality(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  const needsTriangleCheck = ['solveTriangleSAS', 'lawOfCosinesAngle'];

  if (!needsTriangleCheck.includes(operation)) {
    return { isValid: true, errors: {} };
  }

  const sideA = allInputs.sideA;
  const sideB = allInputs.sideB;
  const sideC = allInputs.sideC;

  if (!sideA || !sideB || !sideC) {
    return { isValid: true, errors: {} }; // Not enough data yet
  }

  const isValid = (sideA + sideB > sideC) &&
                  (sideA + sideC > sideB) &&
                  (sideB + sideC > sideA);

  return {
    isValid,
    errors: isValid ? {} : {
      triangle: 'Sides do not satisfy triangle inequality theorem'
    }
  };
}

// Right triangle validation
export function validateRightTriangle(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs) return { isValid: true, errors: {} };

  const operation = allInputs.operation;
  if (operation !== 'solveRightTriangle') {
    return { isValid: true, errors: {} };
  }

  const sideA = allInputs.sideA;
  const sideB = allInputs.sideB;
  const hypotenuse = allInputs.hypotenuse;

  if (!sideA || !sideB || !hypotenuse) {
    return { isValid: true, errors: {} }; // Not enough data yet
  }

  const leftSide = sideA * sideA + sideB * sideB;
  const rightSide = hypotenuse * hypotenuse;
  const isValid = Math.abs(leftSide - rightSide) < 0.01;

  return {
    isValid,
    errors: isValid ? {} : {
      rightTriangle: 'Sides do not form a right triangle (Pythagorean theorem not satisfied)'
    }
  };
}