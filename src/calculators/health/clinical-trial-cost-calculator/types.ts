export interface ClinicalTrialCostCalculatorInputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface ClinicalTrialCostCalculatorMetrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface ClinicalTrialCostCalculatorAnalysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface ClinicalTrialCostCalculatorOutputs {
  result: number;
  calculationSteps: string[];
  analysis: ClinicalTrialCostCalculatorAnalysis;
}
