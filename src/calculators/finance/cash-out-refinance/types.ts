export interface CashOutRefinanceInputs {
  currentLoanBalance: number;
  currentInterestRate: number;
  currentMonthlyPayment: number;
  propertyValue: number;
  newLoanAmount: number;
  newInterestRate: number;
  newLoanTerm: number;
  cashOutAmount: number;
  closingCosts: number;
  points: number;
  appraisalFee: number;
  titleInsurance: number;
  recordingFees: number;
  otherFees: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  privateMortgageInsurance: number;
  escrowAccount: boolean;
  escrowAmount: number;
  refinanceType: 'RateAndTerm' | 'cash-out' | 'streamline';
  creditScore: number;
  debtToIncomeRatio: number;
  loanToValueRatio: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'manufactured';
  propertyLocation: string;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  purpose: 'home-improvement' | 'debt-consolidation' | 'investment' | 'business' | 'education' | 'medical' | 'other';
}

export interface CashOutRefinanceMetrics {
  newMonthlyPayment: number;
  monthlySavings: number;
  annualSavings: number;
  totalSavings: number;
  breakEvenMonths: number;
  totalCost: number;
  effectiveInterestRate: number;
  cashToBorrower: number;
  totalInterestPaid: number;
  interestSavings: number;
  paybackPeriod: number;
  roi: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  refinanceScore: number;
  combinedLoanToValueRatio: number;
  paymentToIncomeRatio: number;
}

export interface CashOutRefinanceAnalysis {
  refinanceGrade: string;
  savingsAnalysis: string;
  recommendations: string;
  breakEvenAnalysis: string;
  cashOutAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface CashOutRefinanceOutputs extends CashOutRefinanceMetrics {
  analysis: CashOutRefinanceAnalysis;
}
