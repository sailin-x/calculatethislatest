export interface dti_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dti_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dti_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dti_ratio_calculatorOutputs {
  result: number;
  analysis: dti_ratio_calculatorAnalysis;
}
