export interface payback_period_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface payback_period_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface payback_period_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface payback_period_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
