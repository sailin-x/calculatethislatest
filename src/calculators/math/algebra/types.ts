export interface AlgebraCalculatorInputs {
  equation: string;
  variables: Record<string, number>;
  operation: 'solve' | 'simplify' | 'factor' | 'expand' | 'substitute';
  equationType: 'linear' | 'quadratic' | 'polynomial' | 'system' | 'inequality';
  domain: 'real' | 'complex' | 'integer';
  precision: number;
}

export interface AlgebraCalculatorMetrics {
  solution: number | number[] | string;
  steps: string[];
  domain: string[];
  simplifiedForm: string;
  factoredForm: string;
  expandedForm: string;
  discriminant: number;
  roots: number[];
  vertex: [number, number];
}

export interface AlgebraCalculatorAnalysis {
  solutionType: string;
  complexity: string;
  alternativeForms: string[];
  verification: boolean;
  recommendations: string[];
}

export interface AlgebraCalculatorOutputs {
  solution: number | number[] | string;
  steps: string[];
  analysis: AlgebraCalculatorAnalysis;
}
