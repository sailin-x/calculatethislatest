export interface fourZeroOneKCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fourZeroOneKCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fourZeroOneKCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fourZeroOneKCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
