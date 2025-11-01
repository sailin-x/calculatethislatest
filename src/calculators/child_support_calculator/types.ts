export interface child_support_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface child_support_calculatorResults {
  result: number;
  analysis?: string;
}

export interface child_support_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface child_support_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
