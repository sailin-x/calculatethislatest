/**
 * Trigonometry Calculator Formulas
 * Comprehensive trigonometric calculations with angle conversions
 */

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Normalize angle to 0-360 degrees range
 */
export function normalizeAngleDegrees(angle: number): number {
  let normalized = angle % 360;
  if (normalized < 0) {
    normalized += 360;
  }
  return normalized;
}

/**
 * Normalize angle to 0-2π radians range
 */
export function normalizeAngleRadians(angle: number): number {
  let normalized = angle % (2 * Math.PI);
  if (normalized < 0) {
    normalized += 2 * Math.PI;
  }
  return normalized;
}

/**
 * Calculate sine of an angle
 */
export function calculateSine(angle: number, angleUnit: 'degrees' | 'radians' = 'degrees'): number {
  const radians = angleUnit === 'degrees' ? degreesToRadians(angle) : angle;
  return Math.sin(radians);
}

/**
 * Calculate cosine of an angle
 */
export function calculateCosine(angle: number, angleUnit: 'degrees' | 'radians' = 'degrees'): number {
  const radians = angleUnit === 'degrees' ? degreesToRadians(angle) : angle;
  return Math.cos(radians);
}

/**
 * Calculate tangent of an angle
 */
export function calculateTangent(angle: number, angleUnit: 'degrees' | 'radians' = 'degrees'): number {
  const radians = angleUnit === 'degrees' ? degreesToRadians(angle) : angle;
  return Math.tan(radians);
}

/**
 * Calculate cosecant of an angle
 */
export function calculateCosecant(angle: number, angleUnit: 'degrees' | 'radians' = 'degrees'): number {
  const sine = calculateSine(angle, angleUnit);
  if (sine === 0) {
    throw new Error('Cosecant is undefined for angles where sine is zero');
  }
  return 1 / sine;
}

/**
 * Calculate secant of an angle
 */
export function calculateSecant(angle: number, angleUnit: 'degrees' | 'radians' = 'degrees'): number {
  const cosine = calculateCosine(angle, angleUnit);
  if (cosine === 0) {
    throw new Error('Secant is undefined for angles where cosine is zero');
  }
  return 1 / cosine;
}

/**
 * Calculate cotangent of an angle
 */
export function calculateCotangent(angle: number, angleUnit: 'degrees' | 'radians' = 'degrees'): number {
  const tangent = calculateTangent(angle, angleUnit);
  if (tangent === 0) {
    throw new Error('Cotangent is undefined for angles where tangent is zero');
  }
  return 1 / tangent;
}

/**
 * Calculate arcsine (inverse sine)
 */
export function calculateArcsine(value: number, resultUnit: 'degrees' | 'radians' = 'degrees'): number {
  if (value < -1 || value > 1) {
    throw new Error('Arcsine is only defined for values between -1 and 1');
  }

  const radians = Math.asin(value);
  return resultUnit === 'degrees' ? radiansToDegrees(radians) : radians;
}

/**
 * Calculate arccosine (inverse cosine)
 */
export function calculateArccosine(value: number, resultUnit: 'degrees' | 'radians' = 'degrees'): number {
  if (value < -1 || value > 1) {
    throw new Error('Arccosine is only defined for values between -1 and 1');
  }

  const radians = Math.acos(value);
  return resultUnit === 'degrees' ? radiansToDegrees(radians) : radians;
}

/**
 * Calculate arctangent (inverse tangent)
 */
export function calculateArctangent(value: number, resultUnit: 'degrees' | 'radians' = 'degrees'): number {
  const radians = Math.atan(value);
  return resultUnit === 'degrees' ? radiansToDegrees(radians) : radians;
}

/**
 * Calculate arctangent2 (angle between positive x-axis and point)
 */
export function calculateArctangent2(y: number, x: number, resultUnit: 'degrees' | 'radians' = 'degrees'): number {
  const radians = Math.atan2(y, x);
  return resultUnit === 'degrees' ? radiansToDegrees(radians) : radians;
}

/**
 * Calculate all trigonometric functions for an angle
 */
export function calculateAllTrigFunctions(
  angle: number,
  angleUnit: 'degrees' | 'radians' = 'degrees'
): {
  sine: number;
  cosine: number;
  tangent: number;
  cosecant: number | null;
  secant: number | null;
  cotangent: number | null;
  angle: number;
  angleUnit: string;
} {
  const sine = calculateSine(angle, angleUnit);
  const cosine = calculateCosine(angle, angleUnit);
  const tangent = calculateTangent(angle, angleUnit);

  let cosecant: number | null = null;
  let secant: number | null = null;
  let cotangent: number | null = null;

  try {
    cosecant = calculateCosecant(angle, angleUnit);
  } catch {
    // cosecant undefined
  }

  try {
    secant = calculateSecant(angle, angleUnit);
  } catch {
    // secant undefined
  }

  try {
    cotangent = calculateCotangent(angle, angleUnit);
  } catch {
    // cotangent undefined
  }

  return {
    sine,
    cosine,
    tangent,
    cosecant,
    secant,
    cotangent,
    angle,
    angleUnit
  };
}

/**
 * Solve right triangle given two sides
 */
export function solveRightTriangle(
  sideA: number | null,
  sideB: number | null,
  sideC: number | null,
  angleA: number | null,
  angleB: number | null,
  angleC: number | null,
  angleUnit: 'degrees' | 'radians' = 'degrees'
): {
  sideA: number;
  sideB: number;
  sideC: number;
  angleA: number;
  angleB: number;
  angleC: number;
  area: number;
  perimeter: number;
} {
  // Right triangle has angleC = 90 degrees
  const rightAngle = angleUnit === 'degrees' ? 90 : Math.PI / 2;

  // Determine which values are provided and solve accordingly
  if (sideA !== null && sideB !== null) {
    // Two legs given
    const a = sideA;
    const b = sideB;
    const c = Math.sqrt(a * a + b * b);

    const angleA_rad = Math.atan(a / b);
    const angleB_rad = Math.atan(b / a);

    const angleA_result = angleUnit === 'degrees' ? radiansToDegrees(angleA_rad) : angleA_rad;
    const angleB_result = angleUnit === 'degrees' ? radiansToDegrees(angleB_rad) : angleB_rad;

    return {
      sideA: a,
      sideB: b,
      sideC: c,
      angleA: angleA_result,
      angleB: angleB_result,
      angleC: rightAngle,
      area: (a * b) / 2,
      perimeter: a + b + c
    };
  }

  if (sideA !== null && sideC !== null) {
    // Leg and hypotenuse given
    const a = sideA;
    const c = sideC;

    if (a >= c) {
      throw new Error('Leg cannot be greater than or equal to hypotenuse');
    }

    const b = Math.sqrt(c * c - a * a);
    const angleA_rad = Math.asin(a / c);
    const angleB_rad = Math.acos(a / c);

    const angleA_result = angleUnit === 'degrees' ? radiansToDegrees(angleA_rad) : angleA_rad;
    const angleB_result = angleUnit === 'degrees' ? radiansToDegrees(angleB_rad) : angleB_rad;

    return {
      sideA: a,
      sideB: b,
      sideC: c,
      angleA: angleA_result,
      angleB: angleB_result,
      angleC: rightAngle,
      area: (a * b) / 2,
      perimeter: a + b + c
    };
  }

  if (sideB !== null && sideC !== null) {
    // Leg and hypotenuse given
    const b = sideB;
    const c = sideC;

    if (b >= c) {
      throw new Error('Leg cannot be greater than or equal to hypotenuse');
    }

    const a = Math.sqrt(c * c - b * b);
    const angleA_rad = Math.acos(b / c);
    const angleB_rad = Math.asin(b / c);

    const angleA_result = angleUnit === 'degrees' ? radiansToDegrees(angleA_rad) : angleA_rad;
    const angleB_result = angleUnit === 'degrees' ? radiansToDegrees(angleB_rad) : angleB_rad;

    return {
      sideA: a,
      sideB: b,
      sideC: c,
      angleA: angleA_result,
      angleB: angleB_result,
      angleC: rightAngle,
      area: (a * b) / 2,
      perimeter: a + b + c
    };
  }

  if (sideA !== null && angleA !== null) {
    // Leg and adjacent angle given
    const a = sideA;
    const angleA_rad = angleUnit === 'degrees' ? degreesToRadians(angleA) : angleA;

    const angleB_rad = Math.PI / 2 - angleA_rad;
    const b = a / Math.tan(angleA_rad);
    const c = a / Math.sin(angleA_rad);

    const angleA_result = angleUnit === 'degrees' ? radiansToDegrees(angleA_rad) : angleA_rad;
    const angleB_result = angleUnit === 'degrees' ? radiansToDegrees(angleB_rad) : angleB_rad;

    return {
      sideA: a,
      sideB: b,
      sideC: c,
      angleA: angleA_result,
      angleB: angleB_result,
      angleC: rightAngle,
      area: (a * b) / 2,
      perimeter: a + b + c
    };
  }

  if (sideB !== null && angleB !== null) {
    // Leg and adjacent angle given
    const b = sideB;
    const angleB_rad = angleUnit === 'degrees' ? degreesToRadians(angleB) : angleB;

    const angleA_rad = Math.PI / 2 - angleB_rad;
    const a = b / Math.tan(angleB_rad);
    const c = b / Math.sin(angleB_rad);

    const angleA_result = angleUnit === 'degrees' ? radiansToDegrees(angleA_rad) : angleA_rad;
    const angleB_result = angleUnit === 'degrees' ? radiansToDegrees(angleB_rad) : angleB_rad;

    return {
      sideA: a,
      sideB: b,
      sideC: c,
      angleA: angleA_result,
      angleB: angleB_result,
      angleC: rightAngle,
      area: (a * b) / 2,
      perimeter: a + b + c
    };
  }

  throw new Error('Insufficient information to solve right triangle. Provide at least two sides or one side and one angle.');
}

/**
 * Calculate law of sines for any triangle
 */
export function calculateLawOfSines(
  sideA: number | null,
  sideB: number | null,
  sideC: number | null,
  angleA: number | null,
  angleB: number | null,
  angleC: number | null,
  angleUnit: 'degrees' | 'radians' = 'degrees'
): {
  sideA: number;
  sideB: number;
  sideC: number;
  angleA: number;
  angleB: number;
  angleC: number;
  area: number;
  perimeter: number;
} {
  // Convert angles to radians for calculations
  const angleA_rad = angleA !== null ? (angleUnit === 'degrees' ? degreesToRadians(angleA) : angleA) : null;
  const angleB_rad = angleB !== null ? (angleUnit === 'degrees' ? degreesToRadians(angleB) : angleB) : null;
  const angleC_rad = angleC !== null ? (angleUnit === 'degrees' ? degreesToRadians(angleC) : angleC) : null;

  // Case 1: Two angles and one side given (ASA or AAS)
  if (angleA_rad !== null && angleB_rad !== null && sideC !== null) {
    const angleC_calc = Math.PI - angleA_rad - angleB_rad;
    const sideA_calc = sideC * Math.sin(angleA_rad) / Math.sin(angleC_calc);
    const sideB_calc = sideC * Math.sin(angleB_rad) / Math.sin(angleC_calc);

    return {
      sideA: sideA_calc,
      sideB: sideB_calc,
      sideC,
      angleA: angleUnit === 'degrees' ? radiansToDegrees(angleA_rad) : angleA_rad,
      angleB: angleUnit === 'degrees' ? radiansToDegrees(angleB_rad) : angleB_rad,
      angleC: angleUnit === 'degrees' ? radiansToDegrees(angleC_calc) : angleC_calc,
      area: calculateTriangleArea(sideA_calc, sideB_calc, sideC),
      perimeter: sideA_calc + sideB_calc + sideC
    };
  }

  // Case 2: Two sides and one angle given (SSA) - ambiguous case
  if (sideA !== null && sideB !== null && angleA_rad !== null) {
    const sideC_calc = Math.sqrt(sideA * sideA + sideB * sideB - 2 * sideA * sideB * Math.cos(angleA_rad));
    const angleB_calc = Math.asin(sideB * Math.sin(angleA_rad) / sideC_calc);
    const angleC_calc = Math.PI - angleA_rad - angleB_calc;

    return {
      sideA,
      sideB,
      sideC: sideC_calc,
      angleA: angleUnit === 'degrees' ? radiansToDegrees(angleA_rad) : angleA_rad,
      angleB: angleUnit === 'degrees' ? radiansToDegrees(angleB_calc) : angleB_calc,
      angleC: angleUnit === 'degrees' ? radiansToDegrees(angleC_calc) : angleC_calc,
      area: calculateTriangleArea(sideA, sideB, sideC_calc),
      perimeter: sideA + sideB + sideC_calc
    };
  }

  throw new Error('Insufficient information for law of sines calculation');
}

/**
 * Calculate law of cosines for any triangle
 */
export function calculateLawOfCosines(
  sideA: number | null,
  sideB: number | null,
  sideC: number | null,
  angleA: number | null,
  angleB: number | null,
  angleC: number | null,
  angleUnit: 'degrees' | 'radians' = 'degrees'
): {
  sideA: number;
  sideB: number;
  sideC: number;
  angleA: number;
  angleB: number;
  angleC: number;
  area: number;
  perimeter: number;
} {
  // Convert angles to radians for calculations
  const angleA_rad = angleA !== null ? (angleUnit === 'degrees' ? degreesToRadians(angleA) : angleA) : null;
  const angleB_rad = angleB !== null ? (angleUnit === 'degrees' ? degreesToRadians(angleB) : angleB) : null;
  const angleC_rad = angleC !== null ? (angleUnit === 'degrees' ? degreesToRadians(angleC) : angleC) : null;

  // Case 1: Three sides given (SSS)
  if (sideA !== null && sideB !== null && sideC !== null) {
    const angleA_calc = Math.acos((sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC));
    const angleB_calc = Math.acos((sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC));
    const angleC_calc = Math.PI - angleA_calc - angleB_calc;

    return {
      sideA,
      sideB,
      sideC,
      angleA: angleUnit === 'degrees' ? radiansToDegrees(angleA_calc) : angleA_calc,
      angleB: angleUnit === 'degrees' ? radiansToDegrees(angleB_calc) : angleB_calc,
      angleC: angleUnit === 'degrees' ? radiansToDegrees(angleC_calc) : angleC_calc,
      area: calculateTriangleArea(sideA, sideB, sideC),
      perimeter: sideA + sideB + sideC
    };
  }

  // Case 2: Two sides and included angle given (SAS)
  if (sideA !== null && sideB !== null && angleC_rad !== null) {
    const sideC_calc = Math.sqrt(sideA * sideA + sideB * sideB - 2 * sideA * sideB * Math.cos(angleC_rad));
    const angleA_calc = Math.asin(sideA * Math.sin(angleC_rad) / sideC_calc);
    const angleB_calc = Math.PI - angleC_rad - angleA_calc;

    return {
      sideA,
      sideB,
      sideC: sideC_calc,
      angleA: angleUnit === 'degrees' ? radiansToDegrees(angleA_calc) : angleA_calc,
      angleB: angleUnit === 'degrees' ? radiansToDegrees(angleB_calc) : angleB_calc,
      angleC: angleUnit === 'degrees' ? radiansToDegrees(angleC_rad) : angleC_rad,
      area: calculateTriangleArea(sideA, sideB, sideC_calc),
      perimeter: sideA + sideB + sideC_calc
    };
  }

  throw new Error('Insufficient information for law of cosines calculation');
}

/**
 * Calculate triangle area using Heron's formula
 */
export function calculateTriangleArea(sideA: number, sideB: number, sideC: number): number {
  const s = (sideA + sideB + sideC) / 2;
  return Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
}

/**
 * Calculate trigonometric identities
 */
export function calculateTrigIdentities(angle: number, angleUnit: 'degrees' | 'radians' = 'degrees'): {
  sin: number;
  cos: number;
  tan: number;
  sinSquared: number;
  cosSquared: number;
  sinCosIdentity: number; // sin²θ + cos²θ = 1
  tanIdentity: number; // sinθ/cosθ = tanθ
  doubleAngleSin: number;
  doubleAngleCos: number;
  halfAngleSin: number;
  halfAngleCos: number;
} {
  const sin = calculateSine(angle, angleUnit);
  const cos = calculateCosine(angle, angleUnit);
  const tan = calculateTangent(angle, angleUnit);

  return {
    sin,
    cos,
    tan,
    sinSquared: sin * sin,
    cosSquared: cos * cos,
    sinCosIdentity: sin * sin + cos * cos,
    tanIdentity: sin / cos,
    doubleAngleSin: 2 * sin * cos,
    doubleAngleCos: cos * cos - sin * sin,
    halfAngleSin: Math.sqrt((1 - cos) / 2),
    halfAngleCos: Math.sqrt((1 + cos) / 2)
  };
}

/**
 * Main trigonometry calculation function
 */
export function calculateTrigonometry(inputs: any): any {
  const {
    calculationType,
    angle,
    angleUnit = 'degrees',
    value,
    resultUnit = 'degrees',
    sideA,
    sideB,
    sideC,
    angleA,
    angleB,
    angleC
  } = inputs;

  switch (calculationType) {
    case 'trig_functions':
      return calculateAllTrigFunctions(angle, angleUnit);

    case 'inverse_functions':
      return {
        arcsine: calculateArcsine(value, resultUnit),
        arccosine: calculateArccosine(value, resultUnit),
        arctangent: calculateArctangent(value, resultUnit)
      };

    case 'right_triangle':
      return solveRightTriangle(sideA, sideB, sideC, angleA, angleB, angleC, angleUnit);

    case 'law_of_sines':
      return calculateLawOfSines(sideA, sideB, sideC, angleA, angleB, angleC, angleUnit);

    case 'law_of_cosines':
      return calculateLawOfCosines(sideA, sideB, sideC, angleA, angleB, angleC, angleUnit);

    case 'trig_identities':
      return calculateTrigIdentities(angle, angleUnit);

    case 'angle_conversion':
      return {
        degrees: angleUnit === 'radians' ? radiansToDegrees(angle) : angle,
        radians: angleUnit === 'degrees' ? degreesToRadians(angle) : angle
      };

    default:
      throw new Error('Unknown trigonometry calculation type');
  }
}