export interface brick_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface brick_calculatorResults {
  result: number;
  analysis?: string;
}

export interface brick_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface brick_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
