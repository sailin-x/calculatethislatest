export interface private_equity_irr_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface private_equity_irr_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface private_equity_irr_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface private_equity_irr_calculatorOutputs {
  result: number;
  analysis: private_equity_irr_calculatorAnalysis;
}
