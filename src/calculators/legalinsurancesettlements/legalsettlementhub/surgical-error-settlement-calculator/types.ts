export interface surgical_error_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface surgical_error_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface surgical_error_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface surgical_error_settlement_calculatorOutputs {
  result: number;
  analysis: surgical_error_settlement_calculatorAnalysis;
}
