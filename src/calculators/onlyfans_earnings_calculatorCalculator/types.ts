export interface onlyfans_earnings_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface onlyfans_earnings_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface onlyfans_earnings_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface onlyfans_earnings_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
