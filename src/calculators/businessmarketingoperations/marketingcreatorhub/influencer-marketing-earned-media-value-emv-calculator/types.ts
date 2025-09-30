export interface influencer_marketing_earned_media_value_emv_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface influencer_marketing_earned_media_value_emv_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface influencer_marketing_earned_media_value_emv_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface influencer_marketing_earned_media_value_emv_calculatorOutputs {
  result: number;
  analysis: influencer_marketing_earned_media_value_emv_calculatorAnalysis;
}
