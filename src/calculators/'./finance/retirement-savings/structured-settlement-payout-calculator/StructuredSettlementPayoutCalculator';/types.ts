export interface './finance/retirement-savings/structured-settlement-payout-calculator/StructuredSettlementPayoutCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/retirement-savings/structured-settlement-payout-calculator/StructuredSettlementPayoutCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/retirement-savings/structured-settlement-payout-calculator/StructuredSettlementPayoutCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/retirement-savings/structured-settlement-payout-calculator/StructuredSettlementPayoutCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
