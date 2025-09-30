export interface beta_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface beta_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface beta_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface beta_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
