export interface burn_mechanism_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface burn_mechanism_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface burn_mechanism_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface burn_mechanism_calculatorOutputs {
  result: number;
  analysis: burn_mechanism_calculatorAnalysis;
}
