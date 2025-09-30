export interface price_to_earnings_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface price_to_earnings_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface price_to_earnings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface price_to_earnings_calculatorOutputs {
  result: number;
  analysis: price_to_earnings_calculatorAnalysis;
}
