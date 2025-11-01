export interface bitcoin_halving_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bitcoin_halving_calculatorResults {
  result: number;
  analysis?: string;
}

export interface bitcoin_halving_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bitcoin_halving_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
