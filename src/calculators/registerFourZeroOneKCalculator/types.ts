export interface registerFourZeroOneKCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerFourZeroOneKCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerFourZeroOneKCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerFourZeroOneKCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
