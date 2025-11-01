export interface MortgageClosingCostInputs {
  loanAmount: number;
  propertyValue: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda';
  propertyState: string;
  propertyCounty: string;
  propertyZipCode: string;
  firstTimeHomebuyer: boolean;
  veteranStatus: boolean;
  creditScore: number;
  loanTerm: number;
  interestRate: number;
  discountPoints: number;
  lenderCredits: number;
  // Closing cost components
  originationFees: number;
  appraisalFee: number;
  titleInsurance: number;
  escrowFees: number;
  recordingFees: number;
  transferTaxes: number;
  homeownersInsurance: number;
  floodInsurance: number;
  propertyTaxes: number;
  prepaidInterest: number;
  otherFees: number;
  // Seller concessions
  sellerConcessions: number;
  // Cash requirements
  downPayment: number;
  earnestMoneyDeposit: number;
  cashReserves: number;
}

export interface MortgageClosingCostOutputs {
  totalClosingCosts: number;
  lenderFees: number;
  thirdPartyFees: number;
  prepaidItems: number;
  escrowDeposits: number;
  totalCashToClose: number;
  cashFromBorrower: number;
  cashFromSeller: number;
  costBreakdown: {
    category: string;
    amount: number;
    percentage: number;
    description: string;
  }[];
  affordabilityAnalysis: {
    frontEndRatio: number;
    backEndRatio: number;
    affordability: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    recommendations: string[];
  };
  comparisonScenarios: {
    scenario: string;
    totalCosts: number;
    cashToClose: number;
    monthlyPayment: number;
  }[];
}