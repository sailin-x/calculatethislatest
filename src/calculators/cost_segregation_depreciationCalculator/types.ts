export interface cost_segregation_depreciationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cost_segregation_depreciationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cost_segregation_depreciationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cost_segregation_depreciationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
