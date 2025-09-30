export interface debt_to_equity_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface debt_to_equity_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface debt_to_equity_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface debt_to_equity_calculatorOutputs {
  result: number;
  analysis: debt_to_equity_calculatorAnalysis;
}
