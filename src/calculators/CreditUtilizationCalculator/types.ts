export interface CreditUtilizationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface CreditUtilizationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface CreditUtilizationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface CreditUtilizationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
