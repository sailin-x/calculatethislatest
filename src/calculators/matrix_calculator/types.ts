export interface matrix_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface matrix_calculatorResults {
  result: number;
  analysis?: string;
}

export interface matrix_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface matrix_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
