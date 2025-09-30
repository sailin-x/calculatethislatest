export interface paycheck_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface paycheck_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface paycheck_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface paycheck_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
