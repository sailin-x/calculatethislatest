export interface fafsa_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fafsa_calculatorResults {
  result: number;
  analysis?: string;
}

export interface fafsa_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fafsa_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
