export interface PercentageCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface PercentageCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface PercentageCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface PercentageCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: PercentageCalculatorAnalysis;
}
