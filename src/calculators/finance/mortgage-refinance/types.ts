export interface MortgageRefinanceInputs {
  // Current Loan Information
  currentLoanBalance: number;
  currentRate: number;
  currentTermRemaining: number;

  // New Loan Information
  newLoanAmount: number;
  newRate: number;
  newTerm: number;

  // Refinance Costs
  closingCosts: number;
  originationFee: number;
  appraisalFee: number;
  titleInsurance: number;

  // Additional Options
  cashOut: number;
  points: number;
  pointCost: number;

  // Analysis Options
  homeValue: number;
  yearsToStay: number;
}

export interface MortgageRefinanceResults {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  totalRefinanceCosts: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  totalSavings5Years: number;
  totalSavings10Years: number;
  totalSavingsRemaining: number;
  roiPercentage: number;
  newLoanToValue: number;
  recommendation: string;
}

