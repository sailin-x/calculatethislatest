export interface total_cost_of_ownership_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface total_cost_of_ownership_calculatorResults {
  result: number;
  analysis?: string;
}

export interface total_cost_of_ownership_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface total_cost_of_ownership_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
