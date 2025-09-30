export interface birth_injury_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface birth_injury_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface birth_injury_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface birth_injury_settlement_calculatorOutputs {
  result: number;
  analysis: birth_injury_settlement_calculatorAnalysis;
}
