export interface charitable_remainder_trustCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface charitable_remainder_trustCalculatorResults {
  result: number;
  analysis?: string;
}

export interface charitable_remainder_trustCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface charitable_remainder_trustCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
