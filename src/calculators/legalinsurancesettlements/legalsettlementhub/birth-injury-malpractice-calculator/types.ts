export interface birth_injury_malpractice_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface birth_injury_malpractice_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface birth_injury_malpractice_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface birth_injury_malpractice_calculatorOutputs {
  result: number;
  analysis: birth_injury_malpractice_calculatorAnalysis;
}
