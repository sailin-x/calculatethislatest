export interface hedge_fund_fee_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface hedge_fund_fee_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface hedge_fund_fee_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface hedge_fund_fee_calculatorOutputs {
  result: number;
  analysis: hedge_fund_fee_calculatorAnalysis;
}
