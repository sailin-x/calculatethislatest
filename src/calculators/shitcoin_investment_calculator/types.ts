export interface shitcoin_investment_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface shitcoin_investment_calculatorResults {
  result: number;
  analysis?: string;
}

export interface shitcoin_investment_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface shitcoin_investment_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
