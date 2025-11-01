export interface crypto_portfolio_rebalancing_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface crypto_portfolio_rebalancing_calculatorResults {
  result: number;
  analysis?: string;
}

export interface crypto_portfolio_rebalancing_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface crypto_portfolio_rebalancing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
