export interface dao_governance_token_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dao_governance_token_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dao_governance_token_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dao_governance_token_calculatorOutputs {
  result: number;
  analysis: dao_governance_token_calculatorAnalysis;
}
