export interface USDALoanInputs {
  propertyValue: number;
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  propertyType: 'single-family' | 'multi-family' | 'manufactured' | 'condo' | 'townhouse';
  propertyLocation: 'rural' | 'suburban' | 'urban';
  borrowerIncome: number;
  householdSize: number;
  areaMedianIncome: number;
  creditScore: number;
  debtToIncomeRatio: number;
  upfrontGuaranteeFee: number;
  annualGuaranteeFee: number;
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
}

export interface USDALoanMetrics {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalCost: number;
  effectiveInterestRate: number;
  loanToValueRatio: number;
  paymentToIncomeRatio: number;
  debtServiceCoverageRatio: number;
  breakEvenMonths: number;
  totalSavings: number;
  monthlySavings: number;
  annualSavings: number;
  totalFees: number;
  upfrontCosts: number;
  monthlyEscrowPayment: number;
  totalMonthlyPayment: number;
}

export interface USDALoanAnalysis {
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

export interface USDALoanOutputs extends USDALoanMetrics {
  analysis: USDALoanAnalysis;
}
