export interface bond_yield_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bond_yield_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bond_yield_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bond_yield_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
