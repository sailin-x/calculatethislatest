export interface RealEstateCrowdfundingInputs {
  // Investment details
  totalProjectCost: number;
  investorEquity: number;
  investorPercentage: number;
  minimumInvestment: number;
  maximumInvestment: number;
  targetRaiseAmount: number;
  currentRaisedAmount: number;

  // Property details
  propertyValue: number;
  propertyType: 'Residential' | 'Commercial' | 'Mixed-Use' | 'Industrial' | 'Retail';
  propertyAddress: string;
  city: string;
  state: string;
  zipCode: string;
  squareFootage: number;
  yearBuilt: number;
  numberOfUnits: number;

  // Financial projections
  projectedNoi: number;
  projectedCapRate: number;
  projectedIrr: number;
  projectedCashOnCash: number;
  holdPeriodYears: number;
  exitCapRate: number;

  // Investment terms
  preferredReturn: number;
  profitShare: number;
  investmentTerm: number;
  distributionFrequency: 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual';
  waterfallStructure: 'American' | 'European' | 'Hybrid';

  // Fees and costs
  platformFees: number;
  managementFees: number;
  acquisitionFees: number;
  dispositionFees: number;
  operatingExpenses: number;

  // Risk factors
  locationRisk: 'Low' | 'Medium' | 'High';
  marketRisk: 'Low' | 'Medium' | 'High';
  propertyRisk: 'Low' | 'Medium' | 'High';
  sponsorRisk: 'Low' | 'Medium' | 'High';
  regulatoryRisk: 'Low' | 'Medium' | 'High';

  // Market data
  localMarketGrowth: number;
  localVacancyRate: number;
  localCapRate: number;
  localAppreciationRate: number;

  // Investor profile
  investorExperience: 'Beginner' | 'Intermediate' | 'Advanced';
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  investmentGoal: 'Income' | 'Growth' | 'Balanced';
  taxBracket: 'Low' | 'Medium' | 'High';

  // Analysis options
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeComparisonAnalysis: boolean;

  // Historical performance
  sponsorTrackRecord: {
    totalProjects: number;
    successfulExits: number;
    averageIrr: number;
    averageHoldPeriod: number;
  };

  // Regulatory compliance
  secRegulation: 'Regulation D' | 'Regulation CF' | 'Regulation A';
  accreditedInvestorRequired: boolean;
  minimumNetWorth: number;
  minimumIncome: number;

  // Platform details
  platformName: string;
  platformRating: number;
  platformFees: number;
  platformTrackRecord: number;

  // Deal structure
  seniorDebtAmount: number;
  mezzanineDebtAmount: number;
  equityAmount: number;
  loanToValueRatio: number;
  debtServiceCoverageRatio: number;

  // Projections
  year1Noi: number;
  year2Noi: number;
  year3Noi: number;
  year4Noi: number;
  year5Noi: number;
  exitValue: number;

  // Investor commitment
  investmentAmount: number;
  investmentDate: string;
  expectedFirstDistribution: string;
}

export interface RealEstateCrowdfundingOutputs {
  // Investment returns
  projectedAnnualReturn: number;
  projectedTotalReturn: number;
  cashOnCashYield: number;
  internalRateOfReturn: number;
  equityMultiple: number;

  // Cash flow analysis
  annualCashFlow: number;
  monthlyCashFlow: number;
  cumulativeCashFlow: number;
  cashFlowStability: number;

  // Risk metrics
  riskAdjustedReturn: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maximumDrawdown: number;
  valueAtRisk: number;

  // Deal metrics
  equityCheck: number;
  loanToValueRatio: number;
  debtServiceCoverageRatio: number;
  breakEvenOccupancy: number;

  // Fee analysis
  totalFees: number;
  feeDrag: number;
  netToInvestor: number;
  feeEfficiency: number;

  // Tax implications
  taxableIncome: number;
  depreciationDeduction: number;
  capitalGainsTax: number;
  taxEfficiency: number;

  // Scenario analysis
  bestCaseReturn: number;
  worstCaseReturn: number;
  baseCaseReturn: number;
  probabilityOfSuccess: number;

  // Comparison analysis
  vsStockMarket: number;
  vsBondMarket: number;
  vsRealEstateIndex: number;
  peerComparison: number;

  // Platform analysis
  platformValueAdd: number;
  platformRiskAdjustment: number;
  platformFeeJustification: number;

  // Sponsor analysis
  sponsorQualityScore: number;
  sponsorRiskAdjustment: number;
  sponsorAlignment: number;

  // Market analysis
  marketTiming: 'Good' | 'Fair' | 'Poor';
  marketCyclePosition: string;
  marketRiskPremium: number;

  // Property analysis
  propertyQualityScore: number;
  propertyRiskScore: number;
  propertyValueAdd: number;

  // Investment suitability
  suitabilityScore: number;
  riskSuitability: 'Low' | 'Medium' | 'High';
  returnSuitability: 'Low' | 'Medium' | 'High';

  // Diversification analysis
  portfolioFit: number;
  correlationToPortfolio: number;
  diversificationBenefit: number;

  // Liquidity analysis
  liquidityScore: number;
  secondaryMarketAvailable: boolean;
  exitTimeline: number;

  // Regulatory compliance
  complianceScore: number;
  regulatoryRisk: 'Low' | 'Medium' | 'High';
  legalProtection: number;

  // Performance projections
  year1Return: number;
  year2Return: number;
  year3Return: number;
  year4Return: number;
  year5Return: number;

  // Distribution analysis
  totalDistributions: number;
  distributionStability: number;
  distributionGrowth: number;

  // Capital analysis
  capitalPreservation: number;
  capitalAppreciation: number;
  totalCapitalReturn: number;

  // Benchmarking
  benchmarkComparison: {
    vsCrowdfundingAverage: number;
    vsPrivateEquity: number;
    vsPublicREITs: number;
  };

  // Risk-adjusted metrics
  alpha: number;
  beta: number;
  rSquared: number;
  trackingError: number;

  // Sustainability metrics
  esgScore: number;
  environmentalImpact: number;
  socialImpact: number;
  governanceScore: number;

  // Deal quality metrics
  dealQualityScore: number;
  valueCreationPotential: number;
  competitiveAdvantage: number;

  // Investor experience
  learningOpportunity: number;
  networkAccess: number;
  dealFlowAccess: number;

  // Exit analysis
  exitStrategy: string[];
  exitProbability: number;
  exitTiming: number;

  // Cost analysis
  totalInvestmentCost: number;
  costPerUnit: number;
  costEfficiency: number;

  // Value analysis
  valueCreation: number;
  valuePreservation: number;
  valueEnhancement: number;

  // Recommendation
  investmentRecommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  actionItems: string[];

  // Educational content
  crowdfundingFacts: string[];
  riskEducation: string[];
  strategyTips: string[];

  // Performance tracking
  performanceVsExpectation: number;
  performanceVsPeers: number;
  performanceVsMarket: number;

  // Attribution analysis
  returnAttribution: {
    incomeReturn: number;
    capitalReturn: number;
    currencyReturn: number;
  };

  // Stress testing
  stressTestResults: {
    recessionScenario: number;
    highInflationScenario: number;
    interestRateHikeScenario: number;
  };

  // Sensitivity analysis
  sensitivityToNoi: number;
  sensitivityToCapRate: number;
  sensitivityToExitValue: number;

  // Monte Carlo analysis
  monteCarloResults: {
    expectedReturn: number;
    standardDeviation: number;
    confidenceInterval95: [number, number];
  };

  // Alternative investments comparison
  alternativeComparison: {
    vsDirectRealEstate: number;
    vsREITs: number;
    vsPrivateEquity: number;
  };

  // Portfolio impact
  portfolioImpact: {
    expectedReturnChange: number;
    riskChange: number;
    correlationChange: number;
  };

  // Tax optimization
  taxOptimizationTips: string[];
  taxLossHarvesting: number;
  taxDeferralOpportunities: number;

  // Due diligence checklist
  dueDiligenceScore: number;
  missingInformation: string[];
  recommendedDueDiligence: string[];

  // Deal sourcing
  dealSourceQuality: number;
  sponsorNetworkStrength: number;
  marketIntelligence: number;

  // Long-term value
  longTermAppreciation: number;
  generationalWealthCreation: number;
  legacyValue: number;
}