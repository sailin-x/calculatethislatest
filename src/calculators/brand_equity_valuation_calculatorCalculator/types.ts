export interface brand_equity_valuation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface brand_equity_valuation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface brand_equity_valuation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface brand_equity_valuation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
