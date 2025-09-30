export interface bitcoin_halving_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bitcoin_halving_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bitcoin_halving_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bitcoin_halving_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
