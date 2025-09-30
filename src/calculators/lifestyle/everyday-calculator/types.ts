export interface EverydayCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface EverydayCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface EverydayCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface EverydayCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: EverydayCalculatorAnalysis;
}
