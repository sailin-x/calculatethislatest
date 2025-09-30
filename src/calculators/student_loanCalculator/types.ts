export interface student_loanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface student_loanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface student_loanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface student_loanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
