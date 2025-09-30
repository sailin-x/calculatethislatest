export interface './finance/net-present-value-calculator/net-present-value-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/net-present-value-calculator/net-present-value-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/net-present-value-calculator/net-present-value-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/net-present-value-calculator/net-present-value-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
