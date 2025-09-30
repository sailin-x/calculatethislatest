export interface TrigonometryCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface TrigonometryCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface TrigonometryCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface TrigonometryCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: TrigonometryCalculatorAnalysis;
}
