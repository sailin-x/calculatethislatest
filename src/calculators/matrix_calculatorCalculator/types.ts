export interface matrix_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface matrix_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface matrix_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface matrix_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
