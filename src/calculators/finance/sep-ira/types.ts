export interface SEPIRAInputs {
  selfEmploymentIncome: number;
  employerContribution: number;
  employeeContribution: number;
  expectedAnnualReturn: number;
  yearsToContribute: number;
  currentBalance: number;
  taxBracket: number;
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately';
  numberOfEmployees: number;
  businessType: 'sole_proprietorship' | 'partnership' | 'corporation';
}

export interface SEPIRAOutputs {
  totalEmployerContribution: number;
  totalEmployeeContribution: number;
  futureValue: number;
  totalContributions: number;
  totalEarnings: number;
  taxSavings: number;
  effectiveReturn: number;
  contributionLimit: number;
  eligibilityStatus: string;
  projectedBalanceByYear: Array<{ year: number; balance: number; contributions: number }>;
}