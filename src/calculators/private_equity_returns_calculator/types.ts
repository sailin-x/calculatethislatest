export interface private_equity_returns_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface private_equity_returns_calculatorResults {
  result: number;
  analysis?: string;
}

export interface private_equity_returns_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface private_equity_returns_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
