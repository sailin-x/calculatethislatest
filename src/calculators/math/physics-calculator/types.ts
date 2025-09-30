export interface PhysicsCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface PhysicsCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface PhysicsCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface PhysicsCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: PhysicsCalculatorAnalysis;
}
