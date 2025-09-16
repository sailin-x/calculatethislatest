export interface RealEstateWaterfallModelInputs {
  totalProjectCost: number;
  sponsorEquity: number;
  investorEquity: number;
  loanAmount: number;
  preferredReturn: number;
  sponsorProfitSplit: number;
  investorProfitSplit: number;
  totalCashFlow: number;
  totalAppreciation: number;
  totalPrincipalPaydown: number;
  holdingPeriodYears: number;
  waterfallType: 'american' | 'european' | 'tiered';
  promoteStructure: 'straight' | 'catch_up';
  irrTarget: number;
}

export interface RealEstateWaterfallModelResults {
  totalEquity: number;
  sponsorOwnershipPercentage: number;
  investorOwnershipPercentage: number;
  totalDistributions: number;
  sponsorDistributions: number;
  investorDistributions: number;
  sponsorPromote: number;
  investorPreferredReturn: number;
  sponsorPreferredReturn: number;
  totalSponsorProfit: number;
  totalInvestorProfit: number;
  sponsorIRR: number;
  investorIRR: number;
  equityMultiple: number;
  waterfallTiers: Array<{
    tier: number;
    description: string;
    threshold: number;
    distribution: number;
    recipient: string;
  }>;
}