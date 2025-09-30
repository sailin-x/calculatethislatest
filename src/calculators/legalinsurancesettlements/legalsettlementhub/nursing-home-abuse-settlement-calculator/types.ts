export interface nursing_home_abuse_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface nursing_home_abuse_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface nursing_home_abuse_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface nursing_home_abuse_settlement_calculatorOutputs {
  result: number;
  analysis: nursing_home_abuse_settlement_calculatorAnalysis;
}
