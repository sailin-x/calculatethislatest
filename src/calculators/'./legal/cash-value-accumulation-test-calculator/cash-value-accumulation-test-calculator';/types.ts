export interface './legal/cash-value-accumulation-test-calculator/cash-value-accumulation-test-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/cash-value-accumulation-test-calculator/cash-value-accumulation-test-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/cash-value-accumulation-test-calculator/cash-value-accumulation-test-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/cash-value-accumulation-test-calculator/cash-value-accumulation-test-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
