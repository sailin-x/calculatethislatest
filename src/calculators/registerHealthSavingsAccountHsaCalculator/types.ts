export interface registerHealthSavingsAccountHsaCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerHealthSavingsAccountHsaCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerHealthSavingsAccountHsaCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerHealthSavingsAccountHsaCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
