export interface hard_money_loanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hard_money_loanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hard_money_loanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hard_money_loanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
