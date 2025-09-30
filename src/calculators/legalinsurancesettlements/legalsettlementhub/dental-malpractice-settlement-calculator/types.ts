export interface dental_malpractice_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dental_malpractice_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dental_malpractice_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dental_malpractice_settlement_calculatorOutputs {
  result: number;
  analysis: dental_malpractice_settlement_calculatorAnalysis;
}
