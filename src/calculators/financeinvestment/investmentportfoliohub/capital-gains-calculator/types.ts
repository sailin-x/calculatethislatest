export interface capital_gains_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface capital_gains_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface capital_gains_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface capital_gains_calculatorOutputs {
  result: number;
  analysis: capital_gains_calculatorAnalysis;
}
