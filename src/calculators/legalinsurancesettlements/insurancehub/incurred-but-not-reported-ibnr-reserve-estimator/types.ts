export interface incurred_but_not_reported_ibnr_reserve_estimatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface incurred_but_not_reported_ibnr_reserve_estimatorMetrics {
  result: number;
  efficiency?: number;
}

export interface incurred_but_not_reported_ibnr_reserve_estimatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface incurred_but_not_reported_ibnr_reserve_estimatorOutputs {
  result: number;
  analysis: incurred_but_not_reported_ibnr_reserve_estimatorAnalysis;
}
