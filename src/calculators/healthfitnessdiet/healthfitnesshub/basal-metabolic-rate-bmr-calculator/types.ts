export interface basal_metabolic_rate_bmr_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface basal_metabolic_rate_bmr_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface basal_metabolic_rate_bmr_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface basal_metabolic_rate_bmr_calculatorOutputs {
  result: number;
  analysis: basal_metabolic_rate_bmr_calculatorAnalysis;
}
