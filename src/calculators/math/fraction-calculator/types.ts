export interface FractionCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface FractionCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface FractionCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface FractionCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: FractionCalculatorAnalysis;
}
