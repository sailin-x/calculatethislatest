export interface registerCreditUtilizationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerCreditUtilizationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerCreditUtilizationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerCreditUtilizationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
