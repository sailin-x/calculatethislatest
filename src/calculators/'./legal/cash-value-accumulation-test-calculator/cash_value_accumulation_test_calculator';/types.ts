export interface './legal/cash-value-accumulation-test-calculator/cash_value_accumulation_test_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/cash-value-accumulation-test-calculator/cash_value_accumulation_test_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/cash-value-accumulation-test-calculator/cash_value_accumulation_test_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/cash-value-accumulation-test-calculator/cash_value_accumulation_test_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
