export interface loan_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface loan_calculatorResults {
  result: number;
  analysis?: string;
}

export interface loan_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface loan_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
