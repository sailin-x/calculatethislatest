export interface insurance_claim_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface insurance_claim_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface insurance_claim_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface insurance_claim_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
