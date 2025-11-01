export interface calculus_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface calculus_calculatorResults {
  result: number;
  analysis?: string;
}

export interface calculus_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface calculus_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
