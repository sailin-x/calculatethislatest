export interface lapse_rate_sensitivity_analysisCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface lapse_rate_sensitivity_analysisCalculatorResults {
  result: number;
  analysis?: string;
}

export interface lapse_rate_sensitivity_analysisCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface lapse_rate_sensitivity_analysisCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
