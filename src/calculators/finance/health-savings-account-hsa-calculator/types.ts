export interface HSAInputs {
  annualContribution: number;
  currentBalance: number;
  age: number;
  coverageType: 'self-only' | 'family';
  contributionType: 'employee' | 'self-employed' | 'catch-up';
  investmentReturn: number;
  inflationRate: number;
  yearsUntilRetirement: number;
  qualifiedExpenses: number;
  nonQualifiedWithdrawals: number;
  penaltyRate: number;
  incomeTaxRate: number;
}

export interface HSAResults {
  totalContributions: number;
  investmentGrowth: number;
  totalBalance: number;
  qualifiedWithdrawals: number;
  nonQualifiedWithdrawals: number;
  penaltiesPaid: number;
  taxesPaid: number;
  netBenefit: number;
  taxSavings: number;
  futureValue: number;
  breakEvenAge: number;
}

export interface HSAMetrics {
  contributionUtilization: number;
  taxEfficiency: number;
  riskAssessment: 'low' | 'medium' | 'high';
  savingsPotential: number;
}