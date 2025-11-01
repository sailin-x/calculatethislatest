export interface CarriedInterestWaterfallModelInputs {
  totalCapital: number;
  managementFee: number;
  carriedInterest: number;
  hurdleRate: number;
  catchUpPercentage: number;
  investmentPeriod: number;
  totalReturn: number;
  preferredReturn: number;
  distributionWaterfall: 'american' | 'european';
  clawbackProvision: boolean;
  gpCommitment: number;
  lpCommitment: number;
}

export interface CarriedInterestWaterfallModelOutputs {
  managementFeesPaid: number;
  preferredReturnPaid: number;
  carriedInterestEarned: number;
  totalDistributions: {
    lp: number;
    gp: number;
  };
  waterfallTiers: {
    tier1: number; // Return of capital
    tier2: number; // Preferred return
    tier3: number; // Catch-up
    tier4: number; // Carried interest split
  };
  irr: number;
  multipleOfInvestedCapital: number;
  gpProfitShare: number;
  lpProfitShare: number;
  netToGp: number;
  clawbackAmount: number;
}