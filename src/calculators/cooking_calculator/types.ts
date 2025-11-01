export interface cooking_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cooking_calculatorResults {
  result: number;
  analysis?: string;
}

export interface cooking_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cooking_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
