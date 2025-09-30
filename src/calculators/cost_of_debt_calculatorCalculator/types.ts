export interface cost_of_debt_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cost_of_debt_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cost_of_debt_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cost_of_debt_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
