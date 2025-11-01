export interface glycemic_load_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface glycemic_load_calculatorResults {
  result: number;
  analysis?: string;
}

export interface glycemic_load_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface glycemic_load_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
