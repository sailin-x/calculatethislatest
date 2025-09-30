export interface './business/restricted-stock-unit-vs-stock-option-calculator/restricted-stock-unit-vs-stock-option-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/restricted-stock-unit-vs-stock-option-calculator/restricted-stock-unit-vs-stock-option-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/restricted-stock-unit-vs-stock-option-calculator/restricted-stock-unit-vs-stock-option-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/restricted-stock-unit-vs-stock-option-calculator/restricted-stock-unit-vs-stock-option-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
