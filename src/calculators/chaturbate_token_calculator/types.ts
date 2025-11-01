export interface chaturbate_token_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface chaturbate_token_calculatorResults {
  result: number;
  analysis?: string;
}

export interface chaturbate_token_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface chaturbate_token_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
