export interface fix_and_flip_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fix_and_flip_calculatorResults {
  result: number;
  analysis?: string;
}

export interface fix_and_flip_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fix_and_flip_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
