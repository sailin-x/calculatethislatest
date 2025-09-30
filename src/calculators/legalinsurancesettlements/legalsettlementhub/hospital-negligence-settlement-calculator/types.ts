export interface hospital_negligence_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface hospital_negligence_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface hospital_negligence_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface hospital_negligence_settlement_calculatorOutputs {
  result: number;
  analysis: hospital_negligence_settlement_calculatorAnalysis;
}
