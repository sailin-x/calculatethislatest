export interface merger_model_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface merger_model_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface merger_model_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface merger_model_calculatorOutputs {
  result: number;
  analysis: merger_model_calculatorAnalysis;
}
