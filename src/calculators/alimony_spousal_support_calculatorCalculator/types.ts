export interface alimony_spousal_support_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface alimony_spousal_support_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface alimony_spousal_support_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface alimony_spousal_support_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
