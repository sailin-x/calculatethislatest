export interface crypto_staking_profitability_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface crypto_staking_profitability_calculatorResults {
  result: number;
  analysis?: string;
}

export interface crypto_staking_profitability_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface crypto_staking_profitability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
