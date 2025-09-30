export interface './insurance/cash-value-accumulation-test-cvat-calculator/cash_value_accumulation_test_cvat_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/cash-value-accumulation-test-cvat-calculator/cash_value_accumulation_test_cvat_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/cash-value-accumulation-test-cvat-calculator/cash_value_accumulation_test_cvat_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/cash-value-accumulation-test-cvat-calculator/cash_value_accumulation_test_cvat_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
