export interface legal_malpractice_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface legal_malpractice_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface legal_malpractice_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface legal_malpractice_insurance_calculatorOutputs {
  result: number;
  analysis: legal_malpractice_insurance_calculatorAnalysis;
}
