export interface CookingCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface CookingCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface CookingCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface CookingCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: CookingCalculatorAnalysis;
}
