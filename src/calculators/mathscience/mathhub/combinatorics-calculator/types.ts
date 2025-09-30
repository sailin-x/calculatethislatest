export interface combinatorics_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface combinatorics_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface combinatorics_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface combinatorics_calculatorOutputs {
  result: number;
  analysis: combinatorics_calculatorAnalysis;
}
