export interface airdrop_value_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface airdrop_value_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface airdrop_value_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface airdrop_value_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
