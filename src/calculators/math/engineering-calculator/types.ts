export interface EngineeringCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface EngineeringCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface EngineeringCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface EngineeringCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: EngineeringCalculatorAnalysis;
}
