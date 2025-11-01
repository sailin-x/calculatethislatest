export interface corporate_bond_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface corporate_bond_calculatorResults {
  result: number;
  analysis?: string;
}

export interface corporate_bond_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface corporate_bond_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
