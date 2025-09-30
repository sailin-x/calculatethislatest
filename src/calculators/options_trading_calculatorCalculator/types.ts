export interface options_trading_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface options_trading_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface options_trading_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface options_trading_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
