export interface instagram_influencer_rate_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface instagram_influencer_rate_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface instagram_influencer_rate_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface instagram_influencer_rate_calculatorOutputs {
  result: number;
  analysis: instagram_influencer_rate_calculatorAnalysis;
}
