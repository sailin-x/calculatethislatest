export interface capm_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface capm_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface capm_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface capm_calculatorOutputs {
  result: number;
  analysis: capm_calculatorAnalysis;
}
