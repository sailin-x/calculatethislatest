export interface tv_ad_gross_rating_point_grp_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface tv_ad_gross_rating_point_grp_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface tv_ad_gross_rating_point_grp_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface tv_ad_gross_rating_point_grp_calculatorOutputs {
  result: number;
  analysis: tv_ad_gross_rating_point_grp_calculatorAnalysis;
}
