export interface macro_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface macro_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface macro_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface macro_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
