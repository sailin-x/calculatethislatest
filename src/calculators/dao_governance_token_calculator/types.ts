export interface dao_governance_token_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dao_governance_token_calculatorResults {
  result: number;
  analysis?: string;
}

export interface dao_governance_token_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dao_governance_token_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
