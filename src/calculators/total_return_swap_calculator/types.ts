export interface total_return_swap_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface total_return_swap_calculatorResults {
  result: number;
  analysis?: string;
}

export interface total_return_swap_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface total_return_swap_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
