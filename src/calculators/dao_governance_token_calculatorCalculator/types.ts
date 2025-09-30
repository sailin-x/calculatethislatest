export interface dao_governance_token_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dao_governance_token_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface dao_governance_token_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dao_governance_token_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
