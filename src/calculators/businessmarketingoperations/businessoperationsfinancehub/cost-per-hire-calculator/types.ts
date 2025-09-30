export interface cost_per_hire_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cost_per_hire_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cost_per_hire_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cost_per_hire_calculatorOutputs {
  result: number;
  analysis: cost_per_hire_calculatorAnalysis;
}
