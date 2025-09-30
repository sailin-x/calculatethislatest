export interface viatical_settlement_value_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface viatical_settlement_value_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface viatical_settlement_value_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface viatical_settlement_value_calculatorOutputs {
  result: number;
  analysis: viatical_settlement_value_calculatorAnalysis;
}
