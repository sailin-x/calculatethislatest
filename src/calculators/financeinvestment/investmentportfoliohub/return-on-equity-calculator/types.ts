export interface return_on_equity_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface return_on_equity_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface return_on_equity_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface return_on_equity_calculatorOutputs {
  result: number;
  analysis: return_on_equity_calculatorAnalysis;
}
