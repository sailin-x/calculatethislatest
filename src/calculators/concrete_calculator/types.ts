export interface concrete_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface concrete_calculatorResults {
  result: number;
  analysis?: string;
}

export interface concrete_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface concrete_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
