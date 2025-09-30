export interface debt_payoff_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface debt_payoff_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface debt_payoff_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface debt_payoff_calculatorOutputs {
  result: number;
  analysis: debt_payoff_calculatorAnalysis;
}
