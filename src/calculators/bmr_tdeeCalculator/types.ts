export interface bmr_tdeeCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bmr_tdeeCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bmr_tdeeCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bmr_tdeeCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
