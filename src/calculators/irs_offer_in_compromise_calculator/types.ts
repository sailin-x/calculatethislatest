export interface irs_offer_in_compromise_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface irs_offer_in_compromise_calculatorResults {
  result: number;
  analysis?: string;
}

export interface irs_offer_in_compromise_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface irs_offer_in_compromise_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
