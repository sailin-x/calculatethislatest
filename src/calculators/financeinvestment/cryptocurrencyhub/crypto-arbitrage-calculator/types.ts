export interface crypto_arbitrage_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface crypto_arbitrage_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface crypto_arbitrage_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface crypto_arbitrage_calculatorOutputs {
  result: number;
  analysis: crypto_arbitrage_calculatorAnalysis;
}
