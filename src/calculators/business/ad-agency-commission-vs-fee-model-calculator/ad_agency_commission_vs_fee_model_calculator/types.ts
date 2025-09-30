export interface ad_agency_commission_vs_fee_model_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ad_agency_commission_vs_fee_model_calculatorResults {
  result: number;
  analysis?: string;
}

export interface ad_agency_commission_vs_fee_model_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ad_agency_commission_vs_fee_model_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
