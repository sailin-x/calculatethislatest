export interface celebrity_endorsement_deal_valuationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface celebrity_endorsement_deal_valuationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface celebrity_endorsement_deal_valuationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface celebrity_endorsement_deal_valuationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
