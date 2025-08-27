export interface MortgageClosingCostInputs {
  purchasePrice: number;
  loanAmount: number;
  downPayment: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'manufactured';
  propertyLocation: string;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  lenderFees: {
    originationFee: number;
    underwritingFee: number;
    processingFee: number;
    applicationFee: number;
    creditReportFee: number;
    floodCertificationFee: number;
    taxServiceFee: number;
    otherLenderFees: number;
  };
  thirdPartyFees: {
    appraisalFee: number;
    inspectionFee: number;
    surveyFee: number;
    pestInspectionFee: number;
    titleSearchFee: number;
    titleInsuranceFee: number;
    attorneyFee: number;
    recordingFee: number;
    transferTax: number;
    otherThirdPartyFees: number;
  };
  prepaidItems: {
    propertyTaxes: number;
    homeownersInsurance: number;
    privateMortgageInsurance: number;
    prepaidInterest: number;
    escrowDeposit: number;
    otherPrepaidItems: number;
  };
  sellerConcessions: number;
  earnestMoney: number;
  rateLockFee: number;
  points: number;
  discountPoints: number;
  creditScore: number;
  debtToIncomeRatio: number;
}

export interface MortgageClosingCostMetrics {
  totalLenderFees: number;
  totalThirdPartyFees: number;
  totalPrepaidItems: number;
  totalClosingCosts: number;
  cashToClose: number;
  totalCost: number;
  closingCostPercentage: number;
  effectiveInterestRate: number;
  breakEvenMonths: number;
  monthlySavings: number;
  annualSavings: number;
  totalSavings: number;
  costBenefitRatio: number;
  roi: number;
  marketComparison: number;
}

export interface MortgageClosingCostAnalysis {
  costGrade: string;
  savingsAnalysis: string;
  recommendations: string;
  marketComparison: string;
  breakEvenAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface MortgageClosingCostOutputs extends MortgageClosingCostMetrics {
  analysis: MortgageClosingCostAnalysis;
}
