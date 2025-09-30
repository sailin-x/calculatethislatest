export interface DatabaseCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface DatabaseCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface DatabaseCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface DatabaseCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: DatabaseCalculatorAnalysis;
}
