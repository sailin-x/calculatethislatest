export interface twitch_subscriber_revenue_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface twitch_subscriber_revenue_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface twitch_subscriber_revenue_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface twitch_subscriber_revenue_calculatorOutputs {
  result: number;
  analysis: twitch_subscriber_revenue_calculatorAnalysis;
}
