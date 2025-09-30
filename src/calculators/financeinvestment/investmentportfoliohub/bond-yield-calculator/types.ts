export interface bond_yield_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface bond_yield_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface bond_yield_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface bond_yield_calculatorOutputs {
  result: number;
  analysis: bond_yield_calculatorAnalysis;
}
