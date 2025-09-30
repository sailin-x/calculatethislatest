export interface instagram_engagement_rate_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface instagram_engagement_rate_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface instagram_engagement_rate_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface instagram_engagement_rate_calculatorOutputs {
  result: number;
  analysis: instagram_engagement_rate_calculatorAnalysis;
}
