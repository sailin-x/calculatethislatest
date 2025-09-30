export interface fix_and_flip_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fix_and_flip_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fix_and_flip_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fix_and_flip_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
