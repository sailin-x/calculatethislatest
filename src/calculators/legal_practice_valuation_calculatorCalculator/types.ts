export interface legal_practice_valuation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface legal_practice_valuation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface legal_practice_valuation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface legal_practice_valuation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
