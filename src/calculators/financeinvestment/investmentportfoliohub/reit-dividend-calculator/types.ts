export interface reit_dividend_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface reit_dividend_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface reit_dividend_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface reit_dividend_calculatorOutputs {
  result: number;
  analysis: reit_dividend_calculatorAnalysis;
}
