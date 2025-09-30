export interface convertible_bond_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface convertible_bond_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface convertible_bond_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface convertible_bond_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
