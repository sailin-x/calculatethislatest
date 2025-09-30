export interface loan_comparison_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface loan_comparison_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface loan_comparison_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface loan_comparison_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
