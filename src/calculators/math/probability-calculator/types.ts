export interface ProbabilityCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface ProbabilityCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface ProbabilityCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface ProbabilityCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: ProbabilityCalculatorAnalysis;
}
