export interface influencer_marketing_earned_media_value_emv_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface influencer_marketing_earned_media_value_emv_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface influencer_marketing_earned_media_value_emv_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface influencer_marketing_earned_media_value_emv_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
