export interface sharpe_ratio_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface sharpe_ratio_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface sharpe_ratio_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface sharpe_ratio_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
