export interface youtube_ad_revenue_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface youtube_ad_revenue_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface youtube_ad_revenue_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface youtube_ad_revenue_calculatorOutputs {
  result: number;
  analysis: youtube_ad_revenue_calculatorAnalysis;
}
