export interface combinatorics_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface combinatorics_calculatorResults {
  result: number;
  analysis?: string;
}

export interface combinatorics_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface combinatorics_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
