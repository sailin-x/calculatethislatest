export interface construction_loanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface construction_loanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface construction_loanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface construction_loanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
