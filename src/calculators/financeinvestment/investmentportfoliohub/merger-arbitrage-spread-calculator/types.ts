export interface merger_arbitrage_spread_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface merger_arbitrage_spread_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface merger_arbitrage_spread_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface merger_arbitrage_spread_calculatorOutputs {
  result: number;
  analysis: merger_arbitrage_spread_calculatorAnalysis;
}
