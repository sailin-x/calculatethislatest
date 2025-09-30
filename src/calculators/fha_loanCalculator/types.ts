export interface fha_loanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fha_loanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fha_loanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fha_loanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
