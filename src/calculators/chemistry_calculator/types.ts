export interface chemistry_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface chemistry_calculatorResults {
  result: number;
  analysis?: string;
}

export interface chemistry_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface chemistry_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
