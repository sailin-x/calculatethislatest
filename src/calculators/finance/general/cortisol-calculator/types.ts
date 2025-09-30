export interface cortisol_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cortisol_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cortisol_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cortisol_calculatorOutputs {
  result: number;
  analysis: cortisol_calculatorAnalysis;
}
