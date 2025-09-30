export interface DataScienceCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface DataScienceCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface DataScienceCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface DataScienceCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: DataScienceCalculatorAnalysis;
}
