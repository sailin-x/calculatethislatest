export interface lapse_rate_sensitivity_analysisInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface lapse_rate_sensitivity_analysisMetrics {
  result: number;
  efficiency?: number;
}

export interface lapse_rate_sensitivity_analysisAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface lapse_rate_sensitivity_analysisOutputs {
  result: number;
  analysis: lapse_rate_sensitivity_analysisAnalysis;
}
