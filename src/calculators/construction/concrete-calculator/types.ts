export interface ConcreteCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface ConcreteCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface ConcreteCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface ConcreteCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: ConcreteCalculatorAnalysis;
}
