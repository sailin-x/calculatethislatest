export interface bariatric_surgery_cost_savings_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface bariatric_surgery_cost_savings_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface bariatric_surgery_cost_savings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface bariatric_surgery_cost_savings_calculatorOutputs {
  result: number;
  analysis: bariatric_surgery_cost_savings_calculatorAnalysis;
}
