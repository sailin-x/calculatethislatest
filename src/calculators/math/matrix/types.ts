export interface MatrixCalculatorInputs {
  operation: 'add' | 'subtract' | 'multiply' | 'transpose' | 'inverse' | 'determinant' | 'eigenvalues' | 'eigenvectors' | 'rank' | 'trace';
  matrixA: number[][];
  matrixB: number[][];
  scalar: number;
  precision: number;
}

export interface MatrixCalculatorMetrics {
  result: number[][] | number;
  determinant: number;
  rank: number;
  trace: number;
  eigenvalues: number[];
  eigenvectors: number[][];
  inverse: number[][];
  transpose: number[][];
}

export interface MatrixCalculatorAnalysis {
  matrixType: string;
  properties: string[];
  computationalComplexity: string;
  applications: string[];
}

export interface MatrixCalculatorOutputs {
  result: number[][] | number;
  properties: string[];
  analysis: MatrixCalculatorAnalysis;
}
