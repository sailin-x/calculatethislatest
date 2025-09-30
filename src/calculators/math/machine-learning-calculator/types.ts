export interface MachineLearningCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface MachineLearningCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface MachineLearningCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface MachineLearningCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: MachineLearningCalculatorAnalysis;
}
