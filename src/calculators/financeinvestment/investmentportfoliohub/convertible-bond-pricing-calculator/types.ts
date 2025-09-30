export interface convertible_bond_pricing_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface convertible_bond_pricing_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface convertible_bond_pricing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface convertible_bond_pricing_calculatorOutputs {
  result: number;
  analysis: convertible_bond_pricing_calculatorAnalysis;
}
