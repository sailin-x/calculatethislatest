export interface AlgebraCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface AlgebraCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface AlgebraCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface AlgebraCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: AlgebraCalculatorAnalysis;
}
