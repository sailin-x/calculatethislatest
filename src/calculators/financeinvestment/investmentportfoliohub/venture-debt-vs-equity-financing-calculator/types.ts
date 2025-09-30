export interface venture_debt_vs_equity_financing_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface venture_debt_vs_equity_financing_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface venture_debt_vs_equity_financing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface venture_debt_vs_equity_financing_calculatorOutputs {
  result: number;
  analysis: venture_debt_vs_equity_financing_calculatorAnalysis;
}
