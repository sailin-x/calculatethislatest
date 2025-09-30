export interface catastrophe_bond_pricing_modelCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface catastrophe_bond_pricing_modelCalculatorResults {
  result: number;
  analysis?: string;
}

export interface catastrophe_bond_pricing_modelCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface catastrophe_bond_pricing_modelCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
