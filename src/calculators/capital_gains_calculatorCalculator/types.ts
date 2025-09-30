export interface capital_gains_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface capital_gains_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface capital_gains_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface capital_gains_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
