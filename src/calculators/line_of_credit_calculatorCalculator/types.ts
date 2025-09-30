export interface line_of_credit_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface line_of_credit_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface line_of_credit_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface line_of_credit_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
