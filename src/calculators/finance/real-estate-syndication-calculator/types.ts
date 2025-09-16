export interface RealEstateSyndicationInputs {
  totalProjectCost: number;
  sponsorEquity: number;
  investorEquity: number;
  loanAmount: number;
  totalUnits: number;
  averageRentPerUnit: number;
  vacancyRate: number;
  operatingExpensesRate: number;
  capRate: number;
  holdingPeriodYears: number;
  sponsorProfitSplit: number;
  investorProfitSplit: number;
  preferredReturn: number;
  promoteStructure: 'straight' | 'waterfall';
  promotePercentage: number;
}

export interface RealEstateSyndicationResults {
  totalEquity: number;
  sponsorEquityPercentage: number;
  investorEquityPercentage: number;
  loanToValueRatio: number;
  grossAnnualRent: number;
  effectiveGrossIncome: number;
  netOperatingIncome: number;
  debtServiceCoverageRatio: number;
  exitValue: number;
  totalCashFlow: number;
  sponsorCashFlow: number;
  investorCashFlow: number;
  internalRateOfReturn: number;
  equityMultiple: number;
  cashOnCashReturn: number;
  sponsorIRR: number;
  investorIRR: number;
  totalSponsorProfit: number;
  totalInvestorProfit: number;
}