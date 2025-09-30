export interface market_cap_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface market_cap_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface market_cap_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface market_cap_calculatorOutputs {
  result: number;
  analysis: market_cap_calculatorAnalysis;
}
