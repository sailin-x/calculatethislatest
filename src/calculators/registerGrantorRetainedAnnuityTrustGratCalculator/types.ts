export interface registerGrantorRetainedAnnuityTrustGratCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerGrantorRetainedAnnuityTrustGratCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerGrantorRetainedAnnuityTrustGratCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerGrantorRetainedAnnuityTrustGratCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
