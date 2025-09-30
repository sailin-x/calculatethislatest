export interface dogecoin_mining_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dogecoin_mining_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface dogecoin_mining_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dogecoin_mining_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
