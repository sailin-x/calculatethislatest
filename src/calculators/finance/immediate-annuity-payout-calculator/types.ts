export interface ImmediateAnnuityInputs {
  principalAmount: number;
  age: number;
  gender: 'male' | 'female';
  payoutType: 'single-life' | 'joint-life' | 'period-certain';
  payoutFrequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  annuityType: 'fixed' | 'variable' | 'inflation-adjusted';
  guaranteePeriod: number;
  jointAge?: number;
  jointGender?: 'male' | 'female';
  inflationRate: number;
  interestRate: number;
  lifeExpectancy: number;
}

export interface ImmediateAnnuityResults {
  monthlyPayout: number;
  annualPayout: number;
  totalPayments: number;
  totalPayoutAmount: number;
  payoutDuration: number;
  remainingPrincipal: number;
  effectiveYield: number;
  breakEvenPoint: number;
  survivorBenefit: number;
}

export interface ImmediateAnnuityMetrics {
  payoutEfficiency: number;
  longevityProtection: number;
  inflationProtection: number;
  riskAssessment: 'low' | 'medium' | 'high';
}