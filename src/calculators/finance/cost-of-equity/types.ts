export interface CostOfEquityInputs {
  // CAPM Model inputs
  riskFreeRate: number;
  marketRiskPremium: number;
  beta: number;

  // Dividend Discount Model inputs
  currentDividend: number;
  expectedDividendGrowthRate: number;
  currentStockPrice: number;

  // Earnings Capitalization Model inputs
  earningsPerShare: number;
  priceToEarningsRatio: number;

  // Bond Yield Plus Risk Premium inputs
  bondYield: number;
  equityRiskPremium: number;

  // Company financials
  totalEquity: number;
  netIncome: number;
  dividendsPaid: number;
  retainedEarnings: number;

  // Market data
  marketIndexReturn: number;
  industryBeta: number;
  companySize: 'large' | 'mid' | 'small';
  companyGrowthStage: 'mature' | 'growth' | 'declining';

  // Risk factors
  businessRisk: number;
  financialRisk: number;
  liquidityRisk: number;
  exchangeRateRisk: number;

  // Industry and sector
  industry: string;
  sector: string;

  // Calculation method
  calculationMethod: 'capm' | 'dividend_discount' | 'earnings_capitalization' | 'bond_yield_plus' | 'multi_factor';

  // Historical data
  historicalReturns?: number[];
  marketReturns?: number[];

  // Forward-looking inputs
  expectedGrowthRate: number;
  payoutRatio: number;
  returnOnEquity: number;

  // Tax considerations
  taxRate: number;
  taxLossCarryforwards: number;

  // Market conditions
  marketVolatility: number;
  interestRateEnvironment: 'low' | 'moderate' | 'high';

  // Company-specific factors
  competitiveAdvantage: number;
  managementQuality: number;
  governanceScore: number;
}

export interface CostOfEquityOutputs {
  // CAPM results
  capmCostOfEquity: number;
  systematicRisk: number;
  totalRisk: number;

  // Dividend Discount Model results
  ddmCostOfEquity: number;
  dividendGrowthRate: number;
  terminalValue: number;

  // Earnings Capitalization results
  earningsCapCostOfEquity: number;
  earningsCapSustainableGrowthRate: number;

  // Bond Yield Plus results
  bondYieldPlusCostOfEquity: number;
  bondYieldRiskPremium: number;

  // Multi-factor model results
  multiFactorCostOfEquity: number;
  sizePremium: number;
  valuePremium: number;
  multiFactorMomentumPremium: number;

  // Overall cost of equity
  weightedCostOfEquity: number;
  recommendedCostOfEquity: number;

  // Risk-adjusted returns
  requiredReturn: number;
  expectedReturn: number;
  riskAdjustedReturn: number;

  // Sensitivity analysis
  betaSensitivity: number;
  growthRateSensitivity: number;
  marketPremiumSensitivity: number;

  // Scenario analysis
  baseCaseCostOfEquity: number;
  optimisticCaseCostOfEquity: number;
  pessimisticCaseCostOfEquity: number;

  // Industry comparisons
  industryAverageCostOfEquity: number;
  industryPercentile: number;
  peerGroupComparison: {
    average: number;
    median: number;
    range: { min: number; max: number };
  };

  // Valuation implications
  impliedPE: number;
  impliedPB: number;
  impliedDividendYield: number;

  // Capital structure implications
  optimalCapitalStructure: number;
  waccImpact: number;

  // Performance metrics
  sharpeRatio: number;
  sortinoRatio: number;
  informationRatio: number;

  // Risk metrics
  betaRelativeToMarket: number;
  trackingError: number;
  valueAtRisk: number;

  // Growth and sustainability
  overallSustainableGrowthRate: number;
  plowbackRatio: number;
  overallReturnOnEquity: number;

  // Tax-adjusted calculations
  afterTaxCostOfEquity: number;
  taxEfficiency: number;

  // Market timing
  marketTimingPremium: number;
  sentimentIndicator: number;

  // ESG factors
  esgAdjustedCostOfEquity: number;
  sustainabilityPremium: number;

  // Forecasting
  projectedCostOfEquity1yr: number;
  projectedCostOfEquity3yr: number;
  projectedCostOfEquity5yr: number;

  // Model validation
  modelFit: number;
  rSquared: number;
  standardError: number;

  // Alternative models
  famaFrench3Factor: number;
  carhart4Factor: number;
  famaFrench5Factor: number;

  // Behavioral factors
  behavioralPremium: number;
  sentimentAdjustment: number;

  // International factors
  countryRiskPremium: number;
  currencyAdjustment: number;

  // Liquidity factors
  liquidityPremium: number;
  sizeAdjustment: number;

  // Momentum and trend
  overallMomentumPremium: number;
  trendAdjustment: number;

  // Quality factors
  qualityPremium: number;
  profitabilityAdjustment: number;

  // Investment style
  valueVsGrowth: number;
  styleAdjustment: number;

  // Sector rotation
  sectorMomentum: number;
  sectorAllocation: number;

  // Macro factors
  inflationAdjustment: number;
  gdpGrowthAdjustment: number;
  monetaryPolicyImpact: number;

  // Regulatory factors
  regulatoryRiskPremium: number;
  complianceCost: number;

  // Technological factors
  technologyAdoptionPremium: number;
  digitalTransformationBenefit: number;

  // Demographic factors
  demographicDividend: number;
  populationAgingImpact: number;

  // Environmental factors
  carbonRiskPremium: number;
  climateChangeAdjustment: number;

  // Social factors
  socialResponsibilityPremium: number;
  stakeholderCapitalAdjustment: number;

  // Governance factors
  governancePremium: number;
  boardQualityAdjustment: number;
}