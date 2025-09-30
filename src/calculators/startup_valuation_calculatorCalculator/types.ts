export interface startup_valuation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface startup_valuation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface startup_valuation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface startup_valuation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
