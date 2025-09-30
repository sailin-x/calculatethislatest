export interface dividend_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dividend_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dividend_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dividend_calculatorOutputs {
  result: number;
  analysis: dividend_calculatorAnalysis;
}
