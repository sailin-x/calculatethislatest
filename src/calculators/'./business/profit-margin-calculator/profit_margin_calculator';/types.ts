export interface './business/profit-margin-calculator/profit_margin_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/profit-margin-calculator/profit_margin_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/profit-margin-calculator/profit_margin_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/profit-margin-calculator/profit_margin_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
