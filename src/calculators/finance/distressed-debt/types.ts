export interface distressed_debtCalculatorInputs {
  totalFundingGoal: number;
  minimumInvestment: number;
  maximumInvestment?: number;
  currentFunding: number;
  numberOfInvestors: number;
  valuation: number;
  equityPercentageOffered: number;
  platformFees: number;
  legalFees: number;
  marketingFees: number;
  campaignDuration: number; // in days
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  industry: string;
  companyStage: 'pre-seed' | 'seed' | 'early-stage' | 'growth';
  investorAccreditationRequired: boolean;
}

export interface distressed_debtCalculatorOutputs {
  totalEquityOffered: number;
  pricePerShare: number;
  sharesOffered: number;
  fundingProgress: number;
  remainingFundingNeeded: number;
  averageInvestmentPerInvestor: number;
  totalFees: number;
  netProceeds: number;
  postMoneyValuation: number;
  ownershipDilution: number;
  breakEvenInvestors: number;
  projectedROI: number;
  riskAdjustedReturn: number;
  successProbability: number;
}

export interface distressed_debtCalculatorMetrics {
  result: number;
}

export interface distressed_debtCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}