export interface return_on_ad_spend_roas_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface return_on_ad_spend_roas_calculatorResults {
  result: number;
  analysis?: string;
}

export interface return_on_ad_spend_roas_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface return_on_ad_spend_roas_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
