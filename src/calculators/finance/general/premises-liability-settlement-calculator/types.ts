export interface premises_liability_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface premises_liability_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface premises_liability_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface premises_liability_settlement_calculatorOutputs {
  result: number;
  analysis: premises_liability_settlement_calculatorAnalysis;
}
