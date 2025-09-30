export interface GrantorRetainedAnnuityTrustGratCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface GrantorRetainedAnnuityTrustGratCalculatorResults {
  result: number;
  analysis?: string;
}

export interface GrantorRetainedAnnuityTrustGratCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface GrantorRetainedAnnuityTrustGratCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
