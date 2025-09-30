export interface cosmetic_surgery_cost_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cosmetic_surgery_cost_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cosmetic_surgery_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cosmetic_surgery_cost_calculatorOutputs {
  result: number;
  analysis: cosmetic_surgery_cost_calculatorAnalysis;
}
