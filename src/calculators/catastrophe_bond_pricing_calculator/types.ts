export interface catastrophe_bond_pricing_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface catastrophe_bond_pricing_calculatorResults {
  result: number;
  analysis?: string;
}

export interface catastrophe_bond_pricing_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface catastrophe_bond_pricing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
