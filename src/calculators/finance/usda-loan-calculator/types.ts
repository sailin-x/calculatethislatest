export interface USDALoanInputs {
  // Property Information
  propertyValue: number;
  purchasePrice: number;
  location: 'rural' | 'suburban' | 'small-town';

  // Borrower Information
  householdIncome: number;
  householdSize: number;
  creditScore: number;
  debtToIncomeRatio: number;

  // Loan Details
  downPayment: number;
  loanTerm: 30;
  interestRate: number;

  // Property Eligibility
  isPrimaryResidence: boolean;
  isModestHousing: boolean;
  meetsIncomeLimits: boolean;
  meetsLocationRequirements: boolean;

  // Additional Costs
  closingCosts: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  hoaFees: number;

  // Analysis Options
  includeTaxesInsurance: boolean;
  analysisPeriod: number;
}

export interface USDALoanResults {
  // Loan Qualification
  isEligible: boolean;
  eligibilityReasons: string[];
  maximumLoanAmount: number;
  requiredDownPayment: number;

  // Loan Details
  loanAmount: number;
  monthlyPrincipalInterest: number;
  monthlyTaxesInsurance: number;
  totalMonthlyPayment: number;

  // Financial Analysis
  loanToValueRatio: number;
  debtToIncomeRatio: number;
  frontEndRatio: number;
  backEndRatio: number;

  // Cost Analysis
  totalClosingCosts: number;
  totalMonthlyCosts: number;
  breakEvenPeriod: number;

  // Benefits Analysis
  guaranteedLoanFee: number;
  annualSubsidy: number;
  totalSubsidyOverTerm: number;

  // Recommendations
  recommendation: string;
  nextSteps: string[];
  alternativeOptions: string[];
}