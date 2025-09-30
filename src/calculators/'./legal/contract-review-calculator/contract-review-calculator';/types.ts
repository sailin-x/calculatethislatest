export interface './legal/contract-review-calculator/contract-review-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/contract-review-calculator/contract-review-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/contract-review-calculator/contract-review-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/contract-review-calculator/contract-review-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
