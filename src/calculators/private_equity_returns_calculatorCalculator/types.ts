export interface private_equity_returns_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface private_equity_returns_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface private_equity_returns_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface private_equity_returns_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
