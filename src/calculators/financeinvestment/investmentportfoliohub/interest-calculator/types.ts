export interface interest_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface interest_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface interest_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface interest_calculatorOutputs {
  result: number;
  analysis: interest_calculatorAnalysis;
}
