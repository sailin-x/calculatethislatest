export interface private_equity_returns_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface private_equity_returns_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface private_equity_returns_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface private_equity_returns_calculatorOutputs {
  result: number;
  analysis: private_equity_returns_calculatorAnalysis;
}
