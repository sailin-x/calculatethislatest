export interface influencer_marketing_earned_media_value_emv_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface influencer_marketing_earned_media_value_emv_calculatorResults {
  result: number;
  analysis?: string;
}

export interface influencer_marketing_earned_media_value_emv_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface influencer_marketing_earned_media_value_emv_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
