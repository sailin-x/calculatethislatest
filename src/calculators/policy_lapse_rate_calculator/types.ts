export interface policy_lapse_rate_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface policy_lapse_rate_calculatorResults {
  result: number;
  analysis?: string;
}

export interface policy_lapse_rate_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface policy_lapse_rate_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
