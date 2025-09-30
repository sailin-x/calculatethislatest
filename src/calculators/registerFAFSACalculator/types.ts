export interface registerFAFSACalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerFAFSACalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerFAFSACalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerFAFSACalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
