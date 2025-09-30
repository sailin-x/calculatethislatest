export interface CalculusCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface CalculusCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface CalculusCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface CalculusCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: CalculusCalculatorAnalysis;
}
