export interface convertible_bond_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface convertible_bond_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface convertible_bond_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface convertible_bond_calculatorOutputs {
  result: number;
  analysis: convertible_bond_calculatorAnalysis;
}
