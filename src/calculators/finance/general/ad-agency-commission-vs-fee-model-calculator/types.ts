export interface ad_agency_commission_vs_fee_model_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface ad_agency_commission_vs_fee_model_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface ad_agency_commission_vs_fee_model_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ad_agency_commission_vs_fee_model_calculatorOutputs {
  result: number;
  analysis: ad_agency_commission_vs_fee_model_calculatorAnalysis;
}
