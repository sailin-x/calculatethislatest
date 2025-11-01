export interface RefinanceInputs {
  currentLoanBalance: number;
  currentInterestRate: number;
  currentMonthlyPayment: number;
  newInterestRate: number;
  newLoanTerm: number;
  propertyValue: number;
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
  refinanceType: 'RateAndTerm' | 'cash-out' | 'streamline' | 'fha-streamline' | 'va-streamline';
  cashOutAmount: number;
  breakEvenMonths: number;
  creditScore: number;
  debtToIncomeRatio: number;
  loanToValueRatio: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'manufactured';
  propertyLocation: string;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
}

export interface RefinanceMetrics {
  newMonthlyPayment: number;
  monthlySavings: number;
  annualSavings: number;
  totalSavings: number;
  breakEvenMonths: number;
  totalCost: number;
  effectiveInterestRate: number;
  newLoanAmount: number;
  cashToBorrower: number;
  totalInterestPaid: number;
  interestSavings: number;
  paybackPeriod: number;
  roi: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  refinanceScore: number;
}

export interface RefinanceAnalysis {
  refinanceGrade: string;
  savingsAnalysis: string;
  recommendations: string;
  breakEvenAnalysis: string;
  marketComparison: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface RefinanceOutputs extends RefinanceMetrics {
  analysis: RefinanceAnalysis;
}
