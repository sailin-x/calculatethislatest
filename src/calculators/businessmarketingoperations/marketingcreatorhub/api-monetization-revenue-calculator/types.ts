export interface api_monetization_revenue_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface api_monetization_revenue_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface api_monetization_revenue_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface api_monetization_revenue_calculatorOutputs {
  result: number;
  analysis: api_monetization_revenue_calculatorAnalysis;
}
