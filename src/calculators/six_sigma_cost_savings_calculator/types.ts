export interface six_sigma_cost_savings_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface six_sigma_cost_savings_calculatorResults {
  result: number;
  analysis?: string;
}

export interface six_sigma_cost_savings_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface six_sigma_cost_savings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
