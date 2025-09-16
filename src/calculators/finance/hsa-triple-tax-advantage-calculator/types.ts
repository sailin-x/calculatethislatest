export interface HSATripleTaxInputs {
  annualContribution: number;
  currentBalance: number;
  age: number;
  coverageType: 'self-only' | 'family';
  contributionType: 'employee' | 'self-employed' | 'catch-up';
  investmentReturn: number;
  yearsToRetirement: number;
  qualifiedMedicalExpenses: number;
  nonQualifiedWithdrawals: number;
  incomeTaxRate: number;
  capitalGainsTaxRate: number;
  comparisonInvestmentReturn: number;
}

export interface HSATripleTaxResults {
  hsaTaxSavings: number;
  traditionalSavingsTaxSavings: number;
  taxableSavingsTaxSavings: number;
  hsaNetBenefit: number;
  traditionalSavingsNetBenefit: number;
  taxableSavingsNetBenefit: number;
  hsaVsTraditionalAdvantage: number;
  hsaVsTaxableAdvantage: number;
  breakEvenYears: number;
  lifetimeTaxSavings: number;
}

export interface HSATripleTaxMetrics {
  taxAdvantageRatio: number;
  efficiencyScore: number;
  riskAdjustedReturn: number;
  optimalStrategy: string;
}