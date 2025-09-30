export interface net_promoter_score_nps_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface net_promoter_score_nps_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface net_promoter_score_nps_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface net_promoter_score_nps_calculatorOutputs {
  result: number;
  analysis: net_promoter_score_nps_calculatorAnalysis;
}
