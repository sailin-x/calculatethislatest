export interface six_sigma_cost_savings_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface six_sigma_cost_savings_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface six_sigma_cost_savings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface six_sigma_cost_savings_calculatorOutputs {
  result: number;
  analysis: six_sigma_cost_savings_calculatorAnalysis;
}
