export interface market_cap_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface market_cap_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface market_cap_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface market_cap_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
