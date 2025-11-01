export interface CDInterestInputs {
  principalAmount: number;
  annualInterestRate: number;
  termInMonths: number;
  compoundingFrequency: 'daily' | 'monthly' | 'quarterly' | 'annually';
  cdType: 'traditional' | 'high_yield' | 'bump_up' | 'step_up' | 'callable';
  earlyWithdrawalPenalty: number;
  federalInsurance: 'fdic' | 'ncua';
  taxRate: number;
  inflationRate: number;
  comparisonRate?: number;
}

export interface CDInterestOutputs {
  totalInterestEarned: number;
  finalAmount: number;
  effectiveAnnualRate: number;
  afterTaxInterest: number;
  afterTaxFinalAmount: number;
  monthlyInterest: number;
  annualPercentageYield: number;
  breakEvenMonths: number;
  inflationAdjustedReturn: number;
  comparisonAnalysis: {
    vsComparisonRate: number;
    opportunityCost: number;
  };
  penaltyAnalysis: {
    earlyWithdrawalAmount: number;
    penaltyPercentage: number;
  };
}