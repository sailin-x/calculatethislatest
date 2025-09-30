export interface './finance/grantor-retained-annuity-trust-grat-calculator/GrantorRetainedAnnuityTrustGratCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/grantor-retained-annuity-trust-grat-calculator/GrantorRetainedAnnuityTrustGratCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/grantor-retained-annuity-trust-grat-calculator/GrantorRetainedAnnuityTrustGratCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/grantor-retained-annuity-trust-grat-calculator/GrantorRetainedAnnuityTrustGratCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
