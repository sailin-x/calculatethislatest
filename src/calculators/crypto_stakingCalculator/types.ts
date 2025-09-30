export interface crypto_stakingCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface crypto_stakingCalculatorResults {
  result: number;
  analysis?: string;
}

export interface crypto_stakingCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface crypto_stakingCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
