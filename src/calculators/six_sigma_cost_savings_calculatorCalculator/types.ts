export interface six_sigma_cost_savings_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface six_sigma_cost_savings_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface six_sigma_cost_savings_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface six_sigma_cost_savings_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
