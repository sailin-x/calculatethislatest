export interface StatisticsCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface StatisticsCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface StatisticsCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface StatisticsCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: StatisticsCalculatorAnalysis;
}
