export interface HealthSavingsAccountHsaCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface HealthSavingsAccountHsaCalculatorResults {
  result: number;
  analysis?: string;
}

export interface HealthSavingsAccountHsaCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface HealthSavingsAccountHsaCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
