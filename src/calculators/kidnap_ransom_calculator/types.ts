export interface kidnap_ransom_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface kidnap_ransom_calculatorResults {
  result: number;
  analysis?: string;
}

export interface kidnap_ransom_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface kidnap_ransom_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
