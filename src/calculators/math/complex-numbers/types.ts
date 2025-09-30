export interface ComplexNumbersCalculatorInputs {
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'root' | 'conjugate' | 'magnitude' | 'argument' | 'polar' | 'rectangular';
  complexNumber1: {
    real: number;
    imaginary: number;
  };
  complexNumber2: {
    real: number;
    imaginary: number;
  };
  exponent: number;
  rootOrder: number;
  precision: number;
}

export interface ComplexNumbersCalculatorMetrics {
  result: {
    real: number;
    imaginary: number;
  };
  magnitude: number;
  argument: number;
  polarForm: string;
  rectangularForm: string;
  conjugate: {
    real: number;
    imaginary: number;
  };
}

export interface ComplexNumbersCalculatorAnalysis {
  operationType: string;
  resultType: string;
  properties: string[];
  applications: string[];
}

export interface ComplexNumbersCalculatorOutputs {
  result: {
    real: number;
    imaginary: number;
  };
  magnitude: number;
  analysis: ComplexNumbersCalculatorAnalysis;
}
