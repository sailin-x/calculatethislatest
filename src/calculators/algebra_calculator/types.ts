export interface algebra_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface algebra_calculatorResults {
  result: number;
  analysis?: string;
}

export interface algebra_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface algebra_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
