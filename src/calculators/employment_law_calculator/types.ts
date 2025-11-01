export interface employment_law_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface employment_law_calculatorResults {
  result: number;
  analysis?: string;
}

export interface employment_law_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface employment_law_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
