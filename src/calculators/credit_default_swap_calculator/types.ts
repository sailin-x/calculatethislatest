export interface credit_default_swap_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface credit_default_swap_calculatorResults {
  result: number;
  analysis?: string;
}

export interface credit_default_swap_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface credit_default_swap_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
