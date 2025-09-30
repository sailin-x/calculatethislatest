export interface hit_and_run_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface hit_and_run_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface hit_and_run_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface hit_and_run_settlement_calculatorOutputs {
  result: number;
  analysis: hit_and_run_settlement_calculatorAnalysis;
}
