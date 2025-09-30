export interface roundup_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface roundup_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface roundup_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface roundup_settlement_calculatorOutputs {
  result: number;
  analysis: roundup_settlement_calculatorAnalysis;
}
