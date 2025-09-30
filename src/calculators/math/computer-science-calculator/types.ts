export interface ComputerScienceCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface ComputerScienceCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface ComputerScienceCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface ComputerScienceCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: ComputerScienceCalculatorAnalysis;
}
