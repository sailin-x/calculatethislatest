export interface tiktok_creator_fund_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface tiktok_creator_fund_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface tiktok_creator_fund_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface tiktok_creator_fund_calculatorOutputs {
  result: number;
  analysis: tiktok_creator_fund_calculatorAnalysis;
}
