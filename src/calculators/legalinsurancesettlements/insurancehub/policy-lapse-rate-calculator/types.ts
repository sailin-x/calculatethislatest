export interface policy_lapse_rate_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface policy_lapse_rate_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface policy_lapse_rate_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface policy_lapse_rate_calculatorOutputs {
  result: number;
  analysis: policy_lapse_rate_calculatorAnalysis;
}
