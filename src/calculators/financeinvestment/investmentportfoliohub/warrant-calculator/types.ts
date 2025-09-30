export interface warrant_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface warrant_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface warrant_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface warrant_calculatorOutputs {
  result: number;
  analysis: warrant_calculatorAnalysis;
}
