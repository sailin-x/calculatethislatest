export interface revenue_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface revenue_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface revenue_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface revenue_calculatorOutputs {
  result: number;
  analysis: revenue_calculatorAnalysis;
}
