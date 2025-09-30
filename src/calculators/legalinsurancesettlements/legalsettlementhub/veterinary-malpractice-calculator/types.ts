export interface veterinary_malpractice_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface veterinary_malpractice_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface veterinary_malpractice_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface veterinary_malpractice_calculatorOutputs {
  result: number;
  analysis: veterinary_malpractice_calculatorAnalysis;
}
