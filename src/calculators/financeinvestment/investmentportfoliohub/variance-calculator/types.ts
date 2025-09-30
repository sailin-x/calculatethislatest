export interface variance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface variance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface variance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface variance_calculatorOutputs {
  result: number;
  analysis: variance_calculatorAnalysis;
}
