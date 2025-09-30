export interface college_savingsCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface college_savingsCalculatorResults {
  result: number;
  analysis?: string;
}

export interface college_savingsCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface college_savingsCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
