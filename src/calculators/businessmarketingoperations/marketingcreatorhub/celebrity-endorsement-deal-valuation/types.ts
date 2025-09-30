export interface celebrity_endorsement_deal_valuationInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface celebrity_endorsement_deal_valuationMetrics {
  result: number;
  efficiency?: number;
}

export interface celebrity_endorsement_deal_valuationAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface celebrity_endorsement_deal_valuationOutputs {
  result: number;
  analysis: celebrity_endorsement_deal_valuationAnalysis;
}
