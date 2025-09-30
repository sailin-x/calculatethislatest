export interface trust_fund_distribution_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface trust_fund_distribution_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface trust_fund_distribution_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface trust_fund_distribution_calculatorOutputs {
  result: number;
  analysis: trust_fund_distribution_calculatorAnalysis;
}
