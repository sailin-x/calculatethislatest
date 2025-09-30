export interface ChemistryCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface ChemistryCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface ChemistryCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface ChemistryCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: ChemistryCalculatorAnalysis;
}
