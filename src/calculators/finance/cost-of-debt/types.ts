export interface CostOfDebtInputs {
  // Bond-based debt inputs
  bondFaceValue: number;
  bondCouponRate: number;
  bondMarketPrice: number;
  bondYearsToMaturity: number;
  bondCouponFrequency: number;

  // Bank loan inputs
  bankLoanAmount: number;
  bankLoanInterestRate: number;
  bankLoanTerm: number;
  bankLoanFees: number;

  // Credit facility inputs
  creditFacilityLimit: number;
  creditFacilityRate: number;
  creditFacilityCommitmentFee: number;
  creditFacilityUtilization: number;

  // Preferred stock inputs
  preferredStockDividend: number;
  preferredStockPrice: number;
  preferredStockParValue: number;

  // Tax inputs
  taxRate: number;
  taxLossCarryforwards: number;

  // Market data
  riskFreeRate: number;
  marketRiskPremium: number;
  companyBeta: number;
  creditRating: string;
  industry: string;

  // Company financials
  totalDebt: number;
  totalAssets: number;
  ebitda: number;
  interestExpense: number;
  debtToEquityRatio: number;
  debtToEbitdaRatio: number;

  // Calculation method
  calculationMethod: 'bond_yield' | 'loan_rate' | 'credit_spread' | 'synthetic_rating' | 'weighted_average';
  weightingMethod: 'book_value' | 'market_value' | 'equal_weight';
}

export interface CostOfDebtOutputs {
  // Bond-based calculations
  bondYieldToMaturity: number;
  bondCurrentYield: number;
  bondAfterTaxCost: number;

  // Bank loan calculations
  bankLoanAfterTaxCost: number;
  bankLoanEffectiveRate: number;

  // Credit facility calculations
  creditFacilityEffectiveCost: number;
  creditFacilityTotalCost: number;

  // Preferred stock calculations
  preferredStockCost: number;
  preferredStockAfterTaxCost: number;

  // Overall cost of debt
  weightedAverageCostOfDebt: number;
  marginalCostOfDebt: number;
  afterTaxWeightedAverageCostOfDebt: number;

  // Risk-adjusted calculations
  creditSpread: number;
  defaultRiskPremium: number;
  liquidityRiskPremium: number;

  // Synthetic rating calculations
  syntheticRating: string;
  syntheticRatingCost: number;

  // Industry comparisons
  industryAverageCostOfDebt: number;
  industryPercentile: number;

  // Break-even analysis
  breakEvenLeverageRatio: number;
  breakEvenInterestCoverage: number;

  // Tax shield calculations
  taxShieldValue: number;
  taxShieldPercentage: number;

  // Debt capacity analysis
  optimalDebtRatio: number;
  debtCapacityUtilization: number;

  // Scenario analysis
  baseCaseCostOfDebt: number;
  optimisticCaseCostOfDebt: number;
  pessimisticCaseCostOfDebt: number;

  // Component breakdown
  debtComponents: {
    bonds: number;
    bankLoans: number;
    creditFacilities: number;
    preferredStock: number;
    other: number;
  };

  // Cost sensitivity
  interestRateSensitivity: number;
  taxRateSensitivity: number;
  creditRatingSensitivity: number;

  // Regulatory compliance
  debtToEquityCompliance: boolean;
  interestCoverageCompliance: boolean;
  regulatoryConstraints: string[];

  // Forecasting
  projectedCostOfDebt1yr: number;
  projectedCostOfDebt3yr: number;
  projectedCostOfDebt5yr: number;

  // Risk metrics
  costOfDebtVolatility: number;
  refinancingRisk: number;
  interestRateRisk: number;

  // Capital structure implications
  waccImpact: number;
  valuationImpact: number;
  epsImpact: number;

  // Peer comparison
  peerGroupAverage: number;
  peerGroupMedian: number;
  peerGroupRange: { min: number; max: number };

  // Market conditions
  currentMarketConditions: string;
  costOfDebtTrend: 'increasing' | 'decreasing' | 'stable';
  rateEnvironment: 'high' | 'moderate' | 'low';

  // Sustainability metrics
  greenBondPremium: number;
  esgAdjustedCostOfDebt: number;
  sustainabilityLinkedDebt: boolean;
}