export interface asbestos_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface asbestos_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface asbestos_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface asbestos_settlement_calculatorOutputs {
  result: number;
  analysis: asbestos_settlement_calculatorAnalysis;
}
