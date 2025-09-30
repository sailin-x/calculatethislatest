export interface rideshare_cost_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rideshare_cost_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface rideshare_cost_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rideshare_cost_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
