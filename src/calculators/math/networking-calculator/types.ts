export interface NetworkingCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface NetworkingCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface NetworkingCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface NetworkingCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: NetworkingCalculatorAnalysis;
}
