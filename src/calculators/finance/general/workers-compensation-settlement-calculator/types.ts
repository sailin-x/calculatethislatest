export interface workers_compensation_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface workers_compensation_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface workers_compensation_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface workers_compensation_settlement_calculatorOutputs {
  result: number;
  analysis: workers_compensation_settlement_calculatorAnalysis;
}
