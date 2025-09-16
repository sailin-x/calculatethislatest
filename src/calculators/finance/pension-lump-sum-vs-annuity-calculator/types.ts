export interface PensionInputs {
  lumpSumAmount: number;
  annualAnnuityPayment: number;
  currentAge: number;
  lifeExpectancy: number;
  expectedReturn: number;
  inflationRate: number;
  taxBracket: number;
  annuityType: 'fixed' | 'variable' | 'inflation_adjusted';
  includeSpouse: boolean;
  spouseAge: number;
  spouseLifeExpectancy: number;
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface PensionResults {
  lumpSumPresentValue: number;
  annuityPresentValue: number;
  netBenefit: number;
  breakEvenYears: number;
  lumpSumMonthlyIncome: number;
  annuityMonthlyIncome: number;
  riskAdjustedValue: number;
  recommendedChoice: string;
}

export interface PensionMetrics {
  lumpSumEfficiency: number;
  annuityEfficiency: number;
  longevityRisk: 'low' | 'medium' | 'high';
  marketRisk: 'low' | 'medium' | 'high';
  inflationProtection: 'low' | 'medium' | 'high';
}