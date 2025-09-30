export interface cost_per_hire_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cost_per_hire_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cost_per_hire_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cost_per_hire_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
