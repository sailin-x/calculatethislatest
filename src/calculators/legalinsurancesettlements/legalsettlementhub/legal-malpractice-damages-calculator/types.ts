export interface legal_malpractice_damages_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface legal_malpractice_damages_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface legal_malpractice_damages_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface legal_malpractice_damages_calculatorOutputs {
  result: number;
  analysis: legal_malpractice_damages_calculatorAnalysis;
}
