export interface request_for_proposal_scoring_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface request_for_proposal_scoring_calculatorResults {
  result: number;
  analysis?: string;
}

export interface request_for_proposal_scoring_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface request_for_proposal_scoring_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
