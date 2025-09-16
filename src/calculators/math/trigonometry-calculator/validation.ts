import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Trigonometry Calculator Validation Rules
 * Comprehensive validation for trigonometric calculations
 */
export const trigonometryValidationRules: ValidationRule[] = [
  // Operation validation
  ValidationRuleFactory.required('operation', 'Trigonometric operation is required'),

  // Angle validation for trigonometric functions
  ValidationRuleFactory.businessRule(
    'angle',
    (angle, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;
      const trigonometricOps = ['sine', 'cosine', 'tangent', 'cosecant', 'secant', 'cotangent'];

      if (!trigonometricOps.includes(operation)) return true;
      if (!angle && angle !== 0) return false;

      return angle >= -360 && angle <= 360;
    },
    'Angle must be between -360° and 360°'
  ),

  // Angle unit validation
  ValidationRuleFactory.businessRule(
    'angleUnit',
    (angleUnit, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;
      const trigonometricOps = ['sine', 'cosine', 'tangent', 'cosecant', 'secant', 'cotangent'];

      if (!trigonometricOps.includes(operation)) return true;
      return angleUnit === 'degrees' || angleUnit === 'radians';
    },
    'Angle unit must be degrees or radians'
  ),

  // Value validation for inverse functions
  ValidationRuleFactory.businessRule(
    'value',
    (value, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;
      const inverseOps = ['arcsine', 'arccosine'];

      if (!inverseOps.includes(operation)) return true;
      if (!value && value !== 0) return false;

      return value >= -1 && value <= 1;
    },
    'Value for inverse functions must be between -1 and 1'
  ),

  // Value validation for arctangent
  ValidationRuleFactory.businessRule(
    'value',
    (value, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;

      if (operation !== 'arctangent') return true;
      return value !== undefined && value !== null && !isNaN(value);
    },
    'Value for arctangent must be a valid number'
  ),

  // Result unit validation
  ValidationRuleFactory.businessRule(
    'resultUnit',
    (resultUnit, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;
      const inverseOps = ['arcsine', 'arccosine', 'arctangent', 'arctangent2'];

      if (!inverseOps.includes(operation)) return true;
      return resultUnit === 'degrees' || resultUnit === 'radians';
    },
    'Result unit must be degrees or radians'
  ),

  // Side validation for triangle solving
  ValidationRuleFactory.businessRule(
    'sideA',
    (sideA, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;
      const triangleOps = ['solveRightTriangle', 'solveTriangleSAS', 'lawOfCosinesSide', 'lawOfCosinesAngle'];

      if (!triangleOps.includes(operation)) return true;
      if (!sideA || sideA <= 0) return false;

      return sideA > 0;
    },
    'Side A must be a positive number'
  ),

  ValidationRuleFactory.businessRule(
    'sideB',
    (sideB, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;
      const triangleOps = ['solveRightTriangle', 'solveTriangleSAS', 'lawOfCosinesSide', 'lawOfCosinesAngle'];

      if (!triangleOps.includes(operation)) return true;
      if (!sideB || sideB <= 0) return false;

      return sideB > 0;
    },
    'Side B must be a positive number'
  ),

  ValidationRuleFactory.businessRule(
    'hypotenuse',
    (hypotenuse, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;

      if (operation !== 'solveRightTriangle') return true;
      if (!hypotenuse || hypotenuse <= 0) return false;

      return hypotenuse > 0;
    },
    'Hypotenuse must be a positive number'
  ),

  ValidationRuleFactory.businessRule(
    'sideC',
    (sideC, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;
      const needsSideC = ['solveTriangleSAS', 'lawOfCosinesAngle'];

      if (!needsSideC.includes(operation)) return true;
      if (!sideC || sideC <= 0) return false;

      return sideC > 0;
    },
    'Side C must be a positive number'
  ),

  // Angle validation for triangle solving
  ValidationRuleFactory.businessRule(
    'angleB',
    (angleB, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;

      if (operation !== 'solveTriangleSAS') return true;
      if (!angleB || angleB <= 0 || angleB >= 180) return false;

      return angleB > 0 && angleB < 180;
    },
    'Angle B must be between 0° and 180°'
  ),

  ValidationRuleFactory.businessRule(
    'angleC',
    (angleC, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;

      if (operation !== 'lawOfCosinesSide') return true;
      if (!angleC || angleC <= 0 || angleC >= 180) return false;

      return angleC > 0 && angleC < 180;
    },
    'Angle C must be between 0° and 180°'
  ),

  // Law of sines validation
  ValidationRuleFactory.businessRule(
    'side',
    (side, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;

      if (operation !== 'lawOfSines') return true;
      if (!side || side <= 0) return false;

      return side > 0;
    },
    'Side must be a positive number'
  ),

  ValidationRuleFactory.businessRule(
    'angle',
    (angle, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;

      if (operation !== 'lawOfSines') return true;
      if (!angle || angle <= 0 || angle >= 180) return false;

      return angle > 0 && angle < 180;
    },
    'Angle must be between 0° and 180°'
  ),

  // Arctangent2 validation
  ValidationRuleFactory.businessRule(
    'x',
    (x, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;

      if (operation !== 'arctangent2') return true;
      return x !== undefined && x !== null && !isNaN(x);
    },
    'X coordinate must be a valid number'
  ),

  ValidationRuleFactory.businessRule(
    'y',
    (y, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;

      if (operation !== 'arctangent2') return true;
      return y !== undefined && y !== null && !isNaN(y);
    },
    'Y coordinate must be a valid number'
  ),

  // Triangle inequality validation
  ValidationRuleFactory.businessRule(
    'sideA',
    (sideA, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;
      const needsTriangleCheck = ['solveTriangleSAS', 'lawOfCosinesAngle'];

      if (!needsTriangleCheck.includes(operation)) return true;

      const sideB = allInputs.sideB;
      const sideC = allInputs.sideC;

      if (!sideA || !sideB || !sideC) return true;

      // Triangle inequality: sum of any two sides must be greater than the third
      return (sideA + sideB > sideC) && (sideA + sideC > sideB) && (sideB + sideC > sideA);
    },
    'Sides do not satisfy triangle inequality theorem'
  ),

  // Right triangle validation
  ValidationRuleFactory.businessRule(
    'sideA',
    (sideA, allInputs) => {
      if (!allInputs) return true;
      const operation = allInputs.operation;

      if (operation !== 'solveRightTriangle') return true;

      const sideB = allInputs.sideB;
      const hypotenuse = allInputs.hypotenuse;

      if (!sideA || !sideB || !hypotenuse) return true;

      // Pythagorean theorem: a² + b² = c²
      const leftSide = sideA * sideA + sideB * sideB;
      const rightSide = hypotenuse * hypotenuse;

      return Math.abs(leftSide - rightSide) < 0.01; // Allow small floating point errors
    },
    'Sides do not form a right triangle (Pythagorean theorem not satisfied)'
  )
];

/**
 * Get validation rules with contextual help messages
 */
export function getTrigonometryValidationRules(): ValidationRule[] {
  return trigonometryValidationRules;
}

/**
 * Trigonometric operation information
 */
export const trigonometricOperations = {
  basic: ['sine', 'cosine', 'tangent', 'cosecant', 'secant', 'cotangent'],
  inverse: ['arcsine', 'arccosine', 'arctangent', 'arctangent2'],
  hyperbolic: ['hyperbolicSine', 'hyperbolicCosine', 'hyperbolicTangent'],
  triangle: ['solveRightTriangle', 'solveTriangleSAS', 'lawOfSines', 'lawOfCosinesSide', 'lawOfCosinesAngle']
};

/**
 * Angle conversion constants
 */
export const angleConstants = {
  PI: Math.PI,
  PI_2: Math.PI / 2,
  PI_4: Math.PI / 4,
  TWO_PI: 2 * Math.PI,
  DEG_TO_RAD: Math.PI / 180,
  RAD_TO_DEG: 180 / Math.PI
};