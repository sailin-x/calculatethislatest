export interface marketing_attribution_model_comparison_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface marketing_attribution_model_comparison_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface marketing_attribution_model_comparison_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface marketing_attribution_model_comparison_calculatorOutputs {
  result: number;
  analysis: marketing_attribution_model_comparison_calculatorAnalysis;
}
