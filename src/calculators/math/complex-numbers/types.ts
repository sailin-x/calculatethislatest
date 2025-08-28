export interface ComplexNumberInputs {
  realPart: number;
  imaginaryPart: number;
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'root' | 'conjugate' | 'absolute' | 'argument' | 'exponential' | 'logarithm' | 'trigonometric';
  secondRealPart?: number;
  secondImaginaryPart?: number;
  power?: number;
  rootIndex?: number;
  angleUnit: 'radians' | 'degrees';
  precision: number;
  trigonometricFunction?: 'sin' | 'cos' | 'tan' | 'asin' | 'acos' | 'atan';
}

export interface ComplexNumberMetrics {
  result: {
    realPart: number;
    imaginaryPart: number;
    magnitude: number;
    argument: number;
    conjugate: {
      realPart: number;
      imaginaryPart: number;
    };
  };
  polarForm: {
    magnitude: number;
    argument: number;
  };
  exponentialForm: {
    magnitude: number;
    argument: number;
  };
  operation: string;
  precision: number;
  angleUnit: string;
}

export interface ComplexNumberAnalysis {
  isReal: boolean;
  isImaginary: boolean;
  isZero: boolean;
  isUnit: boolean;
  quadrant: number;
  recommendation: string;
  keyFeatures: string[];
  limitations: string[];
  mathematicalProperties: {
    isAlgebraic: boolean;
    isTranscendental: boolean;
    isRational: boolean;
    isIrrational: boolean;
  };
  visualization: {
    cartesianCoordinates: [number, number];
    polarCoordinates: [number, number];
  };
}

export interface ComplexNumberOutputs extends ComplexNumberMetrics {
  analysis: ComplexNumberAnalysis;
}
