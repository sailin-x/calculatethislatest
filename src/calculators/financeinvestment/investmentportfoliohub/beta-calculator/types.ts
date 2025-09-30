export interface beta_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface beta_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface beta_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface beta_calculatorOutputs {
  result: number;
  analysis: beta_calculatorAnalysis;
}
