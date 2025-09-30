export interface clinical_trial_cost_estimatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface clinical_trial_cost_estimatorMetrics {
  result: number;
  efficiency?: number;
}

export interface clinical_trial_cost_estimatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface clinical_trial_cost_estimatorOutputs {
  result: number;
  analysis: clinical_trial_cost_estimatorAnalysis;
}
