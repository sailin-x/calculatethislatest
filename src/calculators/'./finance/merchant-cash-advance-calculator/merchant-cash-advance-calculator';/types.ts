export interface './finance/merchant-cash-advance-calculator/merchant-cash-advance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/merchant-cash-advance-calculator/merchant-cash-advance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/merchant-cash-advance-calculator/merchant-cash-advance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/merchant-cash-advance-calculator/merchant-cash-advance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
