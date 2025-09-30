export interface opioid_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface opioid_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface opioid_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface opioid_settlement_calculatorOutputs {
  result: number;
  analysis: opioid_settlement_calculatorAnalysis;
}
