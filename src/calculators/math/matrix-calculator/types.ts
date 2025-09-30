export interface MatrixCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface MatrixCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface MatrixCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface MatrixCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: MatrixCalculatorAnalysis;
}
