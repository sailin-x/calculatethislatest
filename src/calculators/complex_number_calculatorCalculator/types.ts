export interface complex_number_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface complex_number_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface complex_number_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface complex_number_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
