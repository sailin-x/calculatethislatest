export interface fafsa_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fafsa_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fafsa_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fafsa_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
