export interface buy_sell_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface buy_sell_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface buy_sell_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface buy_sell_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
