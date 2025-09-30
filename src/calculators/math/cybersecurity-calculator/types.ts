export interface CybersecurityCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface CybersecurityCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface CybersecurityCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface CybersecurityCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: CybersecurityCalculatorAnalysis;
}
