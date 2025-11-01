export interface onlyfans_earnings_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface onlyfans_earnings_calculatorResults {
  result: number;
  analysis?: string;
}

export interface onlyfans_earnings_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface onlyfans_earnings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
