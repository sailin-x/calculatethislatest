export interface structured_settlement_payout_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface structured_settlement_payout_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface structured_settlement_payout_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface structured_settlement_payout_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
