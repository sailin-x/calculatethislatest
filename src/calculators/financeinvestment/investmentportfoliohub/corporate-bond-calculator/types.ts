export interface corporate_bond_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface corporate_bond_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface corporate_bond_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface corporate_bond_calculatorOutputs {
  result: number;
  analysis: corporate_bond_calculatorAnalysis;
}
