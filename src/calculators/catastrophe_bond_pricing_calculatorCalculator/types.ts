export interface catastrophe_bond_pricing_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface catastrophe_bond_pricing_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface catastrophe_bond_pricing_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface catastrophe_bond_pricing_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
