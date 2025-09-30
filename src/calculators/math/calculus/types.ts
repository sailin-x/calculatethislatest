export interface CalculusCalculatorInputs {
  function: string;
  operation: 'derivative' | 'integral' | 'limit' | 'series' | 'differential_equation';
  variable: string;
  point: number;
  interval: [number, number];
  order: number;
  method: 'symbolic' | 'numerical' | 'approximation';
  precision: number;
}

export interface CalculusCalculatorMetrics {
  result: string | number;
  steps: string[];
  domain: string;
  range: string;
  criticalPoints: number[];
  inflectionPoints: number[];
  asymptotes: string[];
  convergence: boolean;
  seriesSum: number;
}

export interface CalculusCalculatorAnalysis {
  functionType: string;
  complexity: string;
  convergenceRadius: number;
  errorEstimate: number;
  alternativeMethods: string[];
  recommendations: string[];
}

export interface CalculusCalculatorOutputs {
  result: string | number;
  steps: string[];
  analysis: CalculusCalculatorAnalysis;
}
