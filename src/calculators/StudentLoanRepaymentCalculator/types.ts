export interface StudentLoanRepaymentCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface StudentLoanRepaymentCalculatorResults {
  result: number;
  analysis?: string;
}

export interface StudentLoanRepaymentCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface StudentLoanRepaymentCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
