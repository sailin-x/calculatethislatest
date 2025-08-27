export interface FHALoanInputs {
  propertyValue: number;
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  propertyType: 'single-family' | 'multi-family' | 'manufactured' | 'condo' | 'townhouse';
  propertyLocation: string;
  borrowerIncome: number;
  householdSize: number;
  areaMedianIncome: number;
  creditScore: number;
  debtToIncomeRatio: number;
  upfrontMortgageInsurancePremium: number;
  annualMortgageInsurancePremium: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  closingCosts: number;
  prepaidItems: number;
  sellerConcessions: number;
  earnestMoney: number;
  inspectionCosts: number;
  appraisalCosts: number;
  titleInsurance: number;
  escrowAccount: boolean;
  escrowAmount: number;
  fhaLimit: number;
  conventionalLimit: number;
}

export interface FHALoanMetrics {
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
  mortgageInsuranceCost: number;
  conventionalComparison: number;
  savingsVsConventional: number;
}

export interface FHALoanAnalysis {
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

export interface FHALoanOutputs extends FHALoanMetrics {
  analysis: FHALoanAnalysis;
}
