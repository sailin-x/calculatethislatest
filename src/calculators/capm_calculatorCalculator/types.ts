export interface capm_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface capm_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface capm_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface capm_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
