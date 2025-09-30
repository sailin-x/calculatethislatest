export interface ethereum_2_staking_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ethereum_2_staking_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface ethereum_2_staking_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ethereum_2_staking_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
