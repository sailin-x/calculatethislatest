export interface stock_options_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface stock_options_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface stock_options_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface stock_options_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
