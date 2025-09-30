export interface ad_agency_commission_vs_fee_model_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ad_agency_commission_vs_fee_model_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface ad_agency_commission_vs_fee_model_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ad_agency_commission_vs_fee_model_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
