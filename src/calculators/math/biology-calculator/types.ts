export interface BiologyCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface BiologyCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface BiologyCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface BiologyCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: BiologyCalculatorAnalysis;
}
