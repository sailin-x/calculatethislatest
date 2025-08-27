export interface JumboLoanInputs {
  propertyValue: number;
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'co-op';
  propertyLocation: string;
  borrowerIncome: number;
  creditScore: number;
  debtToIncomeRatio: number;
  loanToValueRatio: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  privateMortgageInsurance: number;
  closingCosts: number;
  prepaidItems: number;
  sellerConcessions: number;
  earnestMoney: number;
  inspectionCosts: number;
  appraisalCosts: number;
  titleInsurance: number;
  escrowAccount: boolean;
  escrowAmount: number;
  jumboLimit: number;
  conformingLimit: number;
}

export interface JumboLoanMetrics {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalCost: number;
  effectiveInterestRate: number;
  loanToValueRatio: number;
  paymentToIncomeRatio: number;
  debtServiceCoverageRatio: number;
  breakEvenMonths: number;
  totalFees: number;
  upfrontCosts: number;
  monthlyEscrowPayment: number;
  totalMonthlyPayment: number;
  jumboPremium: number;
  conformingComparison: number;
  savingsVsConforming: number;
}

export interface JumboLoanAnalysis {
  eligibilityStatus: string;
  loanGrade: string;
  riskAssessment: string;
  recommendations: string;
  comparisonAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface JumboLoanOutputs extends JumboLoanMetrics {
  analysis: JumboLoanAnalysis;
}
