export interface equity_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface equity_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface equity_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface equity_valuation_calculatorOutputs {
  result: number;
  analysis: equity_valuation_calculatorAnalysis;
}
