export interface municipal_bond_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface municipal_bond_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface municipal_bond_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface municipal_bond_calculatorOutputs {
  result: number;
  analysis: municipal_bond_calculatorAnalysis;
}
