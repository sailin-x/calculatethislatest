export interface './finance/hedge-fund-fee-calculator/hedge-fund-fee-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/hedge-fund-fee-calculator/hedge-fund-fee-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/hedge-fund-fee-calculator/hedge-fund-fee-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/hedge-fund-fee-calculator/hedge-fund-fee-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
