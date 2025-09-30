export interface ScientificCalculatorInputs {
  expression: string;
  variables: Record<string, number>;
  functions: string[];
  precision: number;
  angleUnit: 'degrees' | 'radians';
  calculationMode: 'basic' | 'scientific' | 'programmer';
}

export interface ScientificCalculatorMetrics {
  result: number;
  steps: string[];
  variables: Record<string, number>;
  functions: string[];
  precision: number;
}

export interface ScientificCalculatorAnalysis {
  expressionType: string;
  complexity: string;
  optimization: string[];
  recommendations: string[];
}

export interface ScientificCalculatorOutputs {
  result: number;
  steps: string[];
  analysis: ScientificCalculatorAnalysis;
}