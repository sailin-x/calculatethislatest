export interface libel_slander_per_se_damages_estimatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface libel_slander_per_se_damages_estimatorMetrics {
  result: number;
  efficiency?: number;
}

export interface libel_slander_per_se_damages_estimatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface libel_slander_per_se_damages_estimatorOutputs {
  result: number;
  analysis: libel_slander_per_se_damages_estimatorAnalysis;
}
