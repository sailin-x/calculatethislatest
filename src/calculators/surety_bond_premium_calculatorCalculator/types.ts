export interface surety_bond_premium_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface surety_bond_premium_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface surety_bond_premium_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface surety_bond_premium_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
