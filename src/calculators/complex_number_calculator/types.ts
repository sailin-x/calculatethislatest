export interface complex_number_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface complex_number_calculatorResults {
  result: number;
  analysis?: string;
}

export interface complex_number_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface complex_number_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
