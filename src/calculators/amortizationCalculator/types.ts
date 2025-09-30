export interface amortizationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface amortizationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface amortizationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface amortizationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
