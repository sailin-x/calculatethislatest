export interface mega_backdoor_roth_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mega_backdoor_roth_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mega_backdoor_roth_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mega_backdoor_roth_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
