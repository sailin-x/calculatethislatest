export interface CreditDefaultSwapCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface CreditDefaultSwapCalculatorResults {
  result: number;
  analysis?: string;
}

export interface CreditDefaultSwapCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface CreditDefaultSwapCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
