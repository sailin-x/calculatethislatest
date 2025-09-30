export interface './finance/total-return-swap-calculator/total-return-swap-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/total-return-swap-calculator/total-return-swap-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/total-return-swap-calculator/total-return-swap-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/total-return-swap-calculator/total-return-swap-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
