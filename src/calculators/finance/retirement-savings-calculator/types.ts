export interface RetirementSavingsInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  inflationRate: number;
  retirementIncomeNeeded: number;
  socialSecurityBenefit: number;
  taxBracket: number;
  contributionFrequency: 'monthly' | 'annual';
  accountType: 'traditional_ira' | 'roth_ira' | '401k' | 'taxable';
  employerMatch: number;
  employerMatchLimit: number;
}

export interface RetirementSavingsResults {
  totalSavingsAtRetirement: number;
  monthlySavingsNeeded: number;
  annualSavingsNeeded: number;
  savingsGap: number;
  yearsToRetirement: number;
  retirementReadinessScore: number;
  projectedAnnualIncome: number;
  replacementRatio: number;
  savingsStrategy: string;
}

export interface RetirementSavingsMetrics {
  savingsRate: number;
  investmentEfficiency: number;
  riskLevel: 'low' | 'medium' | 'high';
  timeHorizon: number;
  goalAchievement: 'behind' | 'on_track' | 'ahead';
}