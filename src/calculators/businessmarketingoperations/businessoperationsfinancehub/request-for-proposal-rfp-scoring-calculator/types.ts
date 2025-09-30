export interface request_for_proposal_rfp_scoring_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface request_for_proposal_rfp_scoring_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface request_for_proposal_rfp_scoring_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface request_for_proposal_rfp_scoring_calculatorOutputs {
  result: number;
  analysis: request_for_proposal_rfp_scoring_calculatorAnalysis;
}
