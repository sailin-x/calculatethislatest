export interface internal_rate_of_return_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface internal_rate_of_return_calculatorResults {
  result: number;
  analysis?: string;
}

export interface internal_rate_of_return_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface internal_rate_of_return_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
