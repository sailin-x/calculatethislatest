export interface './finance/structured-settlement-payout-calculator/structured-settlement-payout-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/structured-settlement-payout-calculator/structured-settlement-payout-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/structured-settlement-payout-calculator/structured-settlement-payout-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/structured-settlement-payout-calculator/structured-settlement-payout-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
