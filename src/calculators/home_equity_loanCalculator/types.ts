export interface home_equity_loanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface home_equity_loanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface home_equity_loanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface home_equity_loanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
