export interface HealthSavingsAccountHsaCalculatorInputs {
  coverageType: 'self-only' | 'family';
  age: number;
  currentBalance: number;
  annualContribution: number;
  expectedGrowthRate: number;
  yearsToRetirement: number;
  qualifiedWithdrawals: number;
  nonQualifiedWithdrawals: number;
}

export interface HealthSavingsAccountHsaCalculatorMetrics {
  annualContributionLimit: number;
  totalContributions: number;
  investmentGrowth: number;
  qualifiedWithdrawalTaxSavings: number;
  nonQualifiedWithdrawalTax: number;
  netTaxAdvantage: number;
}

export interface HealthSavingsAccountHsaCalculatorAnalysis {
  contributionEfficiency: string;
  taxAdvantageSummary: string;
  retirementReadiness: string[];
  strategyRecommendations: string[];
}

export interface HealthSavingsAccountHsaCalculatorOutputs {
  annualContributionLimit: number;
  totalContributions: number;
  investmentGrowth: number;
  qualifiedWithdrawalTaxSavings: number;
  nonQualifiedWithdrawalTax: number;
  netTaxAdvantage: number;
  analysis: HealthSavingsAccountHsaCalculatorAnalysis;
}