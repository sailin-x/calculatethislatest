export interface SocialSecurityOptimizationInputs {
  currentAge: number;
  retirementAge: number;
  spouseCurrentAge?: number;
  spouseRetirementAge?: number;
  primaryInsuranceAmount: number;
  spousePrimaryInsuranceAmount?: number;
  filingStrategy: 'single' | 'married_filing_jointly' | 'married_filing_separately';
  expectedLifespan: number;
  spouseExpectedLifespan?: number;
  inflationRate: number;
  discountRate: number;
  currentSavings: number;
  monthlyRetirementExpenses: number;
  otherIncomeSources: number;
  taxBracket: number;
}

export interface SocialSecurityOptimizationOutputs {
  optimalClaimingAge: number;
  spouseOptimalClaimingAge?: number;
  monthlyBenefit: number;
  spouseMonthlyBenefit?: number;
  totalLifetimeBenefits: number;
  spouseTotalLifetimeBenefits?: number;
  combinedMonthlyBenefit: number;
  breakEvenAge: number;
  netPresentValue: number;
  spouseNetPresentValue?: number;
  combinedNetPresentValue: number;
  benefitIncreasePercentage: number;
  spouseBenefitIncreasePercentage?: number;
  yearsToBreakEven: number;
  recommendedStrategy: string;
  strategyComparison: Array<{
    strategy: string;
    monthlyBenefit: number;
    totalBenefits: number;
    netPresentValue: number;
  }>;
}