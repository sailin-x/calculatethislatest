export interface return_on_ad_spend_roas_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface return_on_ad_spend_roas_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface return_on_ad_spend_roas_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface return_on_ad_spend_roas_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
