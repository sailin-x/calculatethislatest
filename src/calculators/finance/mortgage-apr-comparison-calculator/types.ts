export interface MortgageAprComparisonInputs {
  loanAmount: number;
  loanTerm: number;
  propertyValue: number;
  creditScore: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda';
  propertyState: string;
  propertyZipCode: string;
  firstTimeHomebuyer: boolean;
  veteranStatus: boolean;
  currentMarketRates: {
    '30_year_fixed': number;
    '15_year_fixed': number;
    '5_1_arm': number;
    '7_1_arm': number;
    '10_1_arm': number;
  };
  closingCosts: {
    originationFees: number;
    appraisalFee: number;
    titleInsurance: number;
    escrowFees: number;
    otherFees: number;
  };
  discountPoints: number;
  lenderCredits: number;
}

export interface MortgageAprComparisonOutputs {
  aprComparison: {
    loanType: string;
    interestRate: number;
    apr: number;
    monthlyPayment: number;
    totalPayments: number;
    totalInterest: number;
    totalCost: number;
    breakEvenPoint: number;
  }[];
  recommendedLoan: {
    loanType: string;
    reason: string;
    savings: number;
  };
  costBreakdown: {
    principal: number;
    interest: number;
    fees: number;
    total: number;
  };
  sensitivityAnalysis: {
    rateIncrease: number;
    paymentImpact: number;
    totalCostImpact: number;
  }[];
}