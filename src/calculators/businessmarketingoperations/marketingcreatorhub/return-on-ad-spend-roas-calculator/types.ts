export interface return_on_ad_spend_roas_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface return_on_ad_spend_roas_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface return_on_ad_spend_roas_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface return_on_ad_spend_roas_calculatorOutputs {
  result: number;
  analysis: return_on_ad_spend_roas_calculatorAnalysis;
}
