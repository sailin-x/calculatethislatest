export interface liquidation_price_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface liquidation_price_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface liquidation_price_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface liquidation_price_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
