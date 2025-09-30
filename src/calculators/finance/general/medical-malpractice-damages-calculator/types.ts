export interface medical_malpractice_damages_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface medical_malpractice_damages_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface medical_malpractice_damages_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface medical_malpractice_damages_calculatorOutputs {
  result: number;
  analysis: medical_malpractice_damages_calculatorAnalysis;
}
