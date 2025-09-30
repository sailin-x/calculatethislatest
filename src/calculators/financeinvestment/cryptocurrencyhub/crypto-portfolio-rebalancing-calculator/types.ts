export interface crypto_portfolio_rebalancing_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface crypto_portfolio_rebalancing_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface crypto_portfolio_rebalancing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface crypto_portfolio_rebalancing_calculatorOutputs {
  result: number;
  analysis: crypto_portfolio_rebalancing_calculatorAnalysis;
}
