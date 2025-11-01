export interface black_litterman_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface black_litterman_calculatorResults {
  result: number;
  analysis?: string;
}

export interface black_litterman_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface black_litterman_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
