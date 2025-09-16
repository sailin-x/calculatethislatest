export interface RealEstateDevelopmentInputs {
  calculationType: 'development_costs' | 'revenue_projections' | 'financing' | 'investment_returns' | 'sensitivity_analysis' | 'comprehensive';
  landCost: number;
  constructionCostPerSqFt: number;
  totalSqFt: number;
  softCostsPercentage: number;
  contingencyPercentage: number;
  marketingCost: number;
  financingCost: number;
  rentalRatePerSqFt: number;
  occupancyRate: number;
  annualRentIncrease: number;
  holdingPeriodYears: number;
  exitCapRate: number;
  equityPercentage: number;
  interestRate: number;
  loanTermYears: number;
  constructionPeriodMonths: number;
  interestOnlyPeriodMonths: number;
  costVariance: string;
  revenueVariance: string;
  capRateVariance: string;
}

export interface RealEstateDevelopmentResults {
  calculationType: string;
  landCost: number;
  constructionCost: number;
  totalDevelopmentCost: number;
  costPerSqFt: number;
  grossAnnualRent: number;
  effectiveGrossIncome: number;
  netOperatingIncome: number;
  exitValue: number;
  loanAmount: number;
  equityAmount: number;
  monthlyDebtService: number;
  annualDebtService: number;
  debtServiceCoverageRatio: number;
  loanToValueRatio: number;
  totalCashFlow: number;
  equityMultiple: number;
  internalRateOfReturn: number;
  cashOnCashReturn: number;
  profit: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
}