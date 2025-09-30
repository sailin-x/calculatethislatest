export interface medical_malpractice_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface medical_malpractice_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface medical_malpractice_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface medical_malpractice_insurance_calculatorOutputs {
  result: number;
  analysis: medical_malpractice_insurance_calculatorAnalysis;
}
