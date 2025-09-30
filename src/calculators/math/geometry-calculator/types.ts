export interface GeometryCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface GeometryCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface GeometryCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface GeometryCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: GeometryCalculatorAnalysis;
}
