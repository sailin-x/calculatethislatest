export interface home_equity_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface home_equity_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface home_equity_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface home_equity_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
