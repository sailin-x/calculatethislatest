export interface line_of_credit_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface line_of_credit_calculatorResults {
  result: number;
  analysis?: string;
}

export interface line_of_credit_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface line_of_credit_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
