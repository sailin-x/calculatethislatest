export interface RothVsTraditionalInputs {
  currentAge: number;
  retirementAge: number;
  currentIncome: number;
  expectedIncomeGrowth: number;
  currentTaxBracket: number;
  retirementTaxBracket: number;
  expectedReturn: number;
  annualContribution: number;
  employerMatch: number;
  employerMatchLimit: number;
  timeHorizon: number;
  inflationRate: number;
  rothConversionAmount: number;
  fiveYearRule: boolean;
}

export interface RothVsTraditionalResults {
  traditional401kValue: number;
  roth401kValue: number;
  traditionalTaxSavings: number;
  rothTaxSavings: number;
  traditionalNetValue: number;
  rothNetValue: number;
  breakevenTaxRate: number;
  recommendedStrategy: string;
  taxEfficiency: number;
  riskAdjustedReturn: number;
}

export interface RothVsTraditionalMetrics {
  contributionEfficiency: number;
  taxAdvantage: 'roth' | 'traditional' | 'neutral';
  retirementIncome: number;
  legacyValue: number;
  riskLevel: 'low' | 'medium' | 'high';
}