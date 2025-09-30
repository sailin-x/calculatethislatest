export interface request_for_proposal_rfp_scoring_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface request_for_proposal_rfp_scoring_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface request_for_proposal_rfp_scoring_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface request_for_proposal_rfp_scoring_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
