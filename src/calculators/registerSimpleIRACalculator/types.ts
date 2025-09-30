export interface registerSimpleIRACalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerSimpleIRACalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerSimpleIRACalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerSimpleIRACalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
