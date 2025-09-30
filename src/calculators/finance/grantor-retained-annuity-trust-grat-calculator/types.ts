export interface GrantorRetainedAnnuityTrustGratCalculatorInputs {
  initialValue: number;
  annuityRate: number;
  termYears: number;
  growthRate: number;
  discountRate: number;
  isZeroedOut: boolean;
}

export interface GrantorRetainedAnnuityTrustGratCalculatorMetrics {
  annualAnnuityPayment: number;
  totalAnnuityPayments: number;
  remainingValue: number;
  taxSavings: number;
  effectiveTransfer: number;
}

export interface GrantorRetainedAnnuityTrustGratCalculatorAnalysis {
  gratEfficiency: string;
  riskAssessment: string;
  planningConsiderations: string[];
  alternativeStrategies: string[];
}

export interface GrantorRetainedAnnuityTrustGratCalculatorOutputs {
  annualAnnuityPayment: number;
  totalAnnuityPayments: number;
  remainingValue: number;
  taxSavings: number;
  effectiveTransfer: number;
  analysis: GrantorRetainedAnnuityTrustGratCalculatorAnalysis;
}