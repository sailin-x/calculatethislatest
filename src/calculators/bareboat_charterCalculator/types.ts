export interface bareboat_charterCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bareboat_charterCalculatorResults {
  result: number;
  analysis?: string;
}

export interface bareboat_charterCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bareboat_charterCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
