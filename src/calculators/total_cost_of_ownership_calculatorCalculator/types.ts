export interface total_cost_of_ownership_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface total_cost_of_ownership_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface total_cost_of_ownership_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface total_cost_of_ownership_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
