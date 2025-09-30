export interface cash_value_accumulation_test_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cash_value_accumulation_test_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cash_value_accumulation_test_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cash_value_accumulation_test_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
