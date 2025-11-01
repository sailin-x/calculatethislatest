export interface structured_settlement_payout_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface structured_settlement_payout_calculatorResults {
  result: number;
  analysis?: string;
}

export interface structured_settlement_payout_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface structured_settlement_payout_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
