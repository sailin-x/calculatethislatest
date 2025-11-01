export interface beta_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface beta_calculatorResults {
  result: number;
  analysis?: string;
}

export interface beta_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface beta_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
