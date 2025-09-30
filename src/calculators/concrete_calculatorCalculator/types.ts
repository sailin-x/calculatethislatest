export interface concrete_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface concrete_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface concrete_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface concrete_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
