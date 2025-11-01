export interface employment_practices_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface employment_practices_calculatorResults {
  result: number;
  analysis?: string;
}

export interface employment_practices_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface employment_practices_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
