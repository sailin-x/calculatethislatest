export interface heart_rate_variability_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface heart_rate_variability_calculatorResults {
  result: number;
  analysis?: string;
}

export interface heart_rate_variability_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface heart_rate_variability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
