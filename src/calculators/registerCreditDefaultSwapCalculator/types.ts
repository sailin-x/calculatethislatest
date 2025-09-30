export interface registerCreditDefaultSwapCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerCreditDefaultSwapCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerCreditDefaultSwapCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerCreditDefaultSwapCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
