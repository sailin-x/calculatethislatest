export interface futures_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface futures_calculatorResults {
  result: number;
  analysis?: string;
}

export interface futures_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface futures_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
