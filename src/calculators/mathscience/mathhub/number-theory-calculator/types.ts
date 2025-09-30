export interface number_theory_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface number_theory_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface number_theory_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface number_theory_calculatorOutputs {
  result: number;
  analysis: number_theory_calculatorAnalysis;
}
