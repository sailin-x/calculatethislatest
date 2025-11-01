export interface SimpleIRAInputs {
  annualSalary: number;
  employeeContribution: number;
  employerMatch: number;
  expectedAnnualReturn: number;
  yearsToContribute: number;
  currentBalance: number;
  taxBracket: number;
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately';
  numberOfEmployees: number;
  vestingSchedule: 'immediate' | 'graded' | 'cliff';
}

export interface SimpleIRAOutputs {
  totalEmployeeContribution: number;
  totalEmployerContribution: number;
  futureValue: number;
  totalContributions: number;
  totalEarnings: number;
  taxSavings: number;
  effectiveReturn: number;
  contributionLimit: number;
  employerMatchAmount: number;
  eligibilityStatus: string;
  projectedBalanceByYear: Array<{ year: number; balance: number; contributions: number; employerMatch: number }>;
}