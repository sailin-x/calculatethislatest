export interface structured_settlement_payout_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface structured_settlement_payout_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface structured_settlement_payout_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface structured_settlement_payout_calculatorOutputs {
  result: number;
  analysis: structured_settlement_payout_calculatorAnalysis;
}
