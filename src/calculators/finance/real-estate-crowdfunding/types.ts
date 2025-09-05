export interface RealEstateCrowdfundingInputs {
  investmentAmount: number;
  projectValue: number;
  expectedHoldPeriod: number;
  expectedAnnualReturn: number;
  managementFees: number;
  platformFees: number;
  exitFees: number;
  minimumInvestment: number;
  maximumInvestment: number;
  projectType: 'residential' | 'commercial' | 'industrial' | 'retail' | 'mixed-use';
  location: string;
  expectedAppreciation: number;
  expectedCashFlow: number;
  taxBenefits: number;
  liquidityPeriod: number;
}

export interface RealEstateCrowdfundingOutputs {
  totalFees: number;
  netInvestment: number;
  expectedAnnualCashFlow: number;
  expectedTotalReturn: number;
  expectedIRR: number;
  expectedMultiple: number;
  expectedExitValue: number;
  expectedNetProfit: number;
  annualizedReturn: number;
  riskMetrics: {
    leverageRatio: number;
    debtServiceCoverage: number;
    occupancyRate: number;
    capRate: number;
  };
  feeBreakdown: {
    managementFees: number;
    platformFees: number;
    exitFees: number;
    totalFees: number;
  };
  cashFlowProjection: {
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
  };
}

export interface RealEstateCrowdfundingValidation {
  investmentAmount: boolean;
  projectValue: boolean;
  expectedHoldPeriod: boolean;
  expectedAnnualReturn: boolean;
  managementFees: boolean;
  platformFees: boolean;
  exitFees: boolean;
  minimumInvestment: boolean;
  maximumInvestment: boolean;
  projectType: boolean;
  location: boolean;
  expectedAppreciation: boolean;
  expectedCashFlow: boolean;
  taxBenefits: boolean;
  liquidityPeriod: boolean;
}