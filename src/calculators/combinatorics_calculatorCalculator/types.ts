export interface combinatorics_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface combinatorics_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface combinatorics_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface combinatorics_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
