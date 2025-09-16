export interface MegaBackdoorRothInputs {
  currentAge: number;
  annualSalary: number;
  employerMatch: number;
  current401kBalance: number;
  currentRothBalance: number;
  expectedReturn: number;
  yearsToRetirement: number;
  taxBracket: number;
  stateTaxRate: number;
  inflationRate: number;
  includeAfterTaxContributions: boolean;
  includeEmployerMatch: boolean;
  recharacterizationStrategy: boolean;
}

export interface MegaBackdoorRothResults {
  maxAnnualContribution: number;
  afterTaxContribution: number;
  rothConversionAmount: number;
  taxSavings: number;
  futureRothValue: number;
  futureTraditionalValue: number;
  netBenefit: number;
  breakEvenYears: number;
  effectiveTaxRate: number;
  retirementIncome: number;
}

export interface MegaBackdoorRothMetrics {
  contributionEfficiency: number;
  taxOptimizationScore: number;
  retirementReadiness: 'low' | 'medium' | 'high';
  strategyViability: 'low' | 'medium' | 'high';
}