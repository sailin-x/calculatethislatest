export interface bond_convexity_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bond_convexity_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bond_convexity_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bond_convexity_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
