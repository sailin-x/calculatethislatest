export interface crypto_mining_profitability_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface crypto_mining_profitability_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface crypto_mining_profitability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface crypto_mining_profitability_calculatorOutputs {
  result: number;
  analysis: crypto_mining_profitability_calculatorAnalysis;
}
