export interface bridge_loanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bridge_loanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bridge_loanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bridge_loanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
