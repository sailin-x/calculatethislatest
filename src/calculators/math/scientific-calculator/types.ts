export interface ScientificCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface ScientificCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface ScientificCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface ScientificCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: ScientificCalculatorAnalysis;
}
