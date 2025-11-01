export interface macro_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface macro_calculatorResults {
  result: number;
  analysis?: string;
}

export interface macro_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface macro_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
