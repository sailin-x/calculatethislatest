export interface HomeEquityLoanInputs {
  propertyValue: number;
  firstMortgageBalance: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'manufactured';
  propertyLocation: string;
  loanType: 'heloc' | 'home-equity-loan' | 'cash-out-refinance';
  creditScore: number;
  debtToIncomeRatio: number;
  loanToValueRatio: number;
  combinedLoanToValueRatio: number;
  closingCosts: number;
  appraisalFee: number;
  titleInsurance: number;
  recordingFees: number;
  otherFees: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  escrowAccount: boolean;
  escrowAmount: number;
  purpose: 'home-improvement' | 'debt-consolidation' | 'education' | 'medical' | 'business' | 'investment' | 'other';
  monthlyIncome: number;
  monthlyDebtPayments: number;
  employmentStatus: 'employed' | 'self-employed' | 'retired' | 'unemployed';
  employmentLength: number;
  bankruptcy: boolean;
  foreclosure: boolean;
  shortSale: boolean;
}

export interface HomeEquityLoanMetrics {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalCost: number;
  effectiveInterestRate: number;
  combinedLoanToValueRatio: number;
  paymentToIncomeRatio: number;
  debtServiceCoverageRatio: number;
  breakEvenMonths: number;
  totalFees: number;
  upfrontCosts: number;
  monthlyEscrowPayment: number;
  totalMonthlyPayment: number;
  availableEquity: number;
  equityUtilization: number;
  loanEligibility: boolean;
  maximumLoanAmount: number;
}

export interface HomeEquityLoanAnalysis {
  eligibilityStatus: string;
  loanGrade: string;
  riskAssessment: string;
  recommendations: string;
  equityAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface HomeEquityLoanOutputs extends HomeEquityLoanMetrics {
  analysis: HomeEquityLoanAnalysis;
}
