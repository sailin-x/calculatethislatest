export interface mass_tort_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface mass_tort_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface mass_tort_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface mass_tort_settlement_calculatorOutputs {
  result: number;
  analysis: mass_tort_settlement_calculatorAnalysis;
}
