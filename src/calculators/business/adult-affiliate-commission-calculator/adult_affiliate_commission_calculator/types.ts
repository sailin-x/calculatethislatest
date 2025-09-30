export interface adult_affiliate_commission_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface adult_affiliate_commission_calculatorResults {
  result: number;
  analysis?: string;
}

export interface adult_affiliate_commission_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface adult_affiliate_commission_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
