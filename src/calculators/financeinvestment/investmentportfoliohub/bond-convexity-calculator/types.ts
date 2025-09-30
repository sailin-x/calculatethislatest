export interface bond_convexity_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface bond_convexity_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface bond_convexity_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface bond_convexity_calculatorOutputs {
  result: number;
  analysis: bond_convexity_calculatorAnalysis;
}
