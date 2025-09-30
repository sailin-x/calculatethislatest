export interface burn_injury_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface burn_injury_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface burn_injury_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface burn_injury_settlement_calculatorOutputs {
  result: number;
  analysis: burn_injury_settlement_calculatorAnalysis;
}
