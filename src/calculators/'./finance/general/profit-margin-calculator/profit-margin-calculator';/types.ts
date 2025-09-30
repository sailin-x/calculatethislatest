export interface './finance/general/profit-margin-calculator/profit-margin-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/profit-margin-calculator/profit-margin-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/profit-margin-calculator/profit-margin-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/profit-margin-calculator/profit-margin-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
