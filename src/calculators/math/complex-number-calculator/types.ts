export interface ComplexNumberCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface ComplexNumberCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface ComplexNumberCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface ComplexNumberCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: ComplexNumberCalculatorAnalysis;
}
