export interface './finance/retirement-savings/structured-settlement-payout-calculator/structured_settlement_payout_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/retirement-savings/structured-settlement-payout-calculator/structured_settlement_payout_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/retirement-savings/structured-settlement-payout-calculator/structured_settlement_payout_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/retirement-savings/structured-settlement-payout-calculator/structured_settlement_payout_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
