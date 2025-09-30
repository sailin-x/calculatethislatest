export interface jumbo_loanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface jumbo_loanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface jumbo_loanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface jumbo_loanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
