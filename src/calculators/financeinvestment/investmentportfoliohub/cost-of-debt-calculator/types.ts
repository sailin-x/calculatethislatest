export interface cost_of_debt_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cost_of_debt_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cost_of_debt_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cost_of_debt_calculatorOutputs {
  result: number;
  analysis: cost_of_debt_calculatorAnalysis;
}
