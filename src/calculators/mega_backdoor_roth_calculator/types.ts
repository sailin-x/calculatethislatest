export interface mega_backdoor_roth_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mega_backdoor_roth_calculatorResults {
  result: number;
  analysis?: string;
}

export interface mega_backdoor_roth_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mega_backdoor_roth_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
