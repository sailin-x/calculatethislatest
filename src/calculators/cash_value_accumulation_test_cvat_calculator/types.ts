export interface cash_value_accumulation_test_cvat_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cash_value_accumulation_test_cvat_calculatorResults {
  result: number;
  analysis?: string;
}

export interface cash_value_accumulation_test_cvat_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cash_value_accumulation_test_cvat_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
