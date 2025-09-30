export interface child_support_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface child_support_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface child_support_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface child_support_calculatorOutputs {
  result: number;
  analysis: child_support_calculatorAnalysis;
}
