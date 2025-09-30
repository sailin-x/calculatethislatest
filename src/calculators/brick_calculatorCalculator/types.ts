export interface brick_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface brick_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface brick_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface brick_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
