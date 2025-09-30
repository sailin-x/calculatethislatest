export interface onlyfans_earnings_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface onlyfans_earnings_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface onlyfans_earnings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface onlyfans_earnings_calculatorOutputs {
  result: number;
  analysis: onlyfans_earnings_calculatorAnalysis;
}
