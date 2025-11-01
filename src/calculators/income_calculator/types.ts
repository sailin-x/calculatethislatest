export interface income_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface income_calculatorResults {
  result: number;
  analysis?: string;
}

export interface income_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface income_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
