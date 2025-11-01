export interface convertible_bond_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface convertible_bond_calculatorResults {
  result: number;
  analysis?: string;
}

export interface convertible_bond_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface convertible_bond_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
