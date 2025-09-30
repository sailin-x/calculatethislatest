export interface cost_of_equity_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cost_of_equity_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cost_of_equity_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cost_of_equity_calculatorOutputs {
  result: number;
  analysis: cost_of_equity_calculatorAnalysis;
}
