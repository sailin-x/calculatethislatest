export interface FHALoanInputs {
  propertyValue: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  borrowerIncome: number;
  coBorrowerIncome?: number;
  monthlyDebt: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  hoaFees?: number;
  fhaCaseNumber?: string;
  creditScore: number;
  occupancyType: string;
}

export interface FHALoanOutputs {
  monthlyPayment: number;
  upfrontMIP: number;
  monthlyMIP: number;
  totalMonthlyPayment: number;
  loanToValueRatio: number;
  debtToIncomeRatio: number;
  fhaEligibility: string;
  totalClosingCosts: number;
  cashToClose: number;
}
