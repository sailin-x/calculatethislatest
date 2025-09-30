export interface adult_affiliate_commission_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface adult_affiliate_commission_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface adult_affiliate_commission_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface adult_affiliate_commission_calculatorOutputs {
  result: number;
  analysis: adult_affiliate_commission_calculatorAnalysis;
}
