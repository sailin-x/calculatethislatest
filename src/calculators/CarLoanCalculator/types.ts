export interface CarLoanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface CarLoanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface CarLoanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface CarLoanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
