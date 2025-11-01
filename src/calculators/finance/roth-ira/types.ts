export interface RothIRAInputs {
  currentAge: number;
  annualContribution: number;
  expectedAnnualReturn: number;
  yearsToContribute: number;
  currentBalance: number;
  taxBracket: number;
  inflationRate: number;
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household';
  income: number;
}

export interface RothIRAOutputs {
  futureValue: number;
  totalContributions: number;
  totalEarnings: number;
  taxSavings: number;
  effectiveReturn: number;
  contributionLimitReached: boolean;
  eligibilityStatus: string;
  projectedBalanceByAge: Array<{ age: number; balance: number }>;
}