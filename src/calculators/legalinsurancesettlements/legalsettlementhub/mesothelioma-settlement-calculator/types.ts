export interface mesothelioma_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface mesothelioma_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface mesothelioma_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface mesothelioma_settlement_calculatorOutputs {
  result: number;
  analysis: mesothelioma_settlement_calculatorAnalysis;
}
