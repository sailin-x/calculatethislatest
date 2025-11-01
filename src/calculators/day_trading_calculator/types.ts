export interface day_trading_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface day_trading_calculatorResults {
  result: number;
  analysis?: string;
}

export interface day_trading_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface day_trading_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
