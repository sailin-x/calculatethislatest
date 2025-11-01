export interface RealEstateSyndicationInputs {
  // Deal basics
  propertyName: string;
  propertyAddress: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: 'Residential' | 'Commercial' | 'Mixed-Use' | 'Industrial' | 'Retail';

  // Acquisition details
  purchasePrice: number;
  acquisitionCosts: number;
  totalAcquisitionCost: number;
  acquisitionDate: string;

  // Capital structure
  totalEquity: number;
  sponsorEquity: number;
  limitedPartnerEquity: number;
  seniorDebt: number;
  mezzanineDebt: number;
  totalCapital: number;

  // Waterfall structure
  preferredReturn: number;
  profitSplitSponsor: number;
  profitSplitLimitedPartners: number;
  promoteStructure: 'Straight' | 'Curved' | 'Hybrid';

  // Financial projections
  year1Noi: number;
  year2Noi: number;
  year3Noi: number;
  year4Noi: number;
  year5Noi: number;
  exitCapRate: number;
  holdPeriodYears: number;

  // Operating expenses
  propertyManagementFee: number;
  maintenanceReserve: number;
  insurance: number;
  propertyTaxes: number;
  utilities: number;
  otherOperatingExpenses: number;

  // Financing terms
  seniorDebtInterestRate: number;
  seniorDebtTerm: number;
  mezzanineDebtInterestRate: number;
  mezzanineDebtTerm: number;

  // Sponsor information
  sponsorExperience: 'Beginner' | 'Intermediate' | 'Advanced';
  sponsorTrackRecord: number; // Success rate percentage
  sponsorManagementFee: number;
  sponsorAssetManagementFee: number;

  // Investor details
  minimumInvestment: number;
  targetRaiseAmount: number;
  currentRaisedAmount: number;
  numberOfInvestors: number;

  // Tax considerations
  depreciationSchedule: number[]; // Annual depreciation amounts
  taxBracket: number;
  depreciationBonus: number;

  // Market assumptions
  marketRentGrowth: number;
  expenseGrowth: number;
  propertyAppreciation: number;
  vacancyRate: number;

  // Exit strategy
  exitStrategy: 'Sale' | 'Refinance' | 'Hold';
  projectedExitValue: number;
  exitCosts: number;

  // Risk factors
  marketRisk: 'Low' | 'Medium' | 'High';
  propertyRisk: 'Low' | 'Medium' | 'High';
  executionRisk: 'Low' | 'Medium' | 'High';
  regulatoryRisk: 'Low' | 'Medium' | 'High';

  // Legal structure
  entityType: 'LLC' | 'LP' | 'Corporation';
  secFiling: 'Regulation D' | 'Regulation CF' | 'Regulation A';
  accreditedInvestorsOnly: boolean;

  // Fees and costs
  legalFees: number;
  accountingFees: number;
  marketingFees: number;
  dueDiligenceCosts: number;
  organizationalCosts: number;

  // Performance metrics
  targetIrr: number;
  targetEquityMultiple: number;
  targetCashOnCash: number;

  // Analysis options
  includeTaxAnalysis: boolean;
  includeSensitivityAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeWaterfallModeling: boolean;

  // Historical performance
  sponsorPreviousDeals: Array<{
    propertyType: string;
    irr: number;
    equityMultiple: number;
    holdPeriod: number;
  }>;

  // Comparable deals
  comparableDeals: Array<{
    propertyType: string;
    capRate: number;
    irr: number;
    equityMultiple: number;
  }>;

  // Distribution preferences
  distributionFrequency: 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual';
  reinvestmentOptions: boolean;
  distributionWaterfall: boolean;

  // Investor accreditation
  minimumNetWorth: number;
  minimumIncome: number;
  sophisticationLevel: 'Beginner' | 'Intermediate' | 'Advanced';

  // Deal timeline
  offeringPeriodMonths: number;
  dueDiligencePeriodDays: number;
  closingPeriodDays: number;
  stabilizationPeriodMonths: number;

  // Insurance and reserves
  insuranceReserve: number;
  capitalImprovementReserve: number;
  tenantImprovementReserve: number;
  leasingCommissionReserve: number;

  // Environmental considerations
  environmentalAssessment: boolean;
  phase1EsaCost: number;
  remediationRequired: boolean;
  remediationCost: number;

  // Property specifics
  squareFootage: number;
  numberOfUnits: number;
  yearBuilt: number;
  lastRenovation: number;
  occupancyRate: number;

  // Market analysis
  marketPopulation: number;
  marketGrowthRate: number;
  marketMedianIncome: number;
  marketVacancyRate: number;
  marketCapRate: number;

  // Competition
  competingProperties: number;
  marketPosition: 'Superior' | 'Comparable' | 'Inferior';
  uniqueSellingPoints: string[];

  // Management
  propertyManager: string;
  managementExperience: number;
  managementContract: string;

  // Tenant profile
  tenantCreditRating: 'A' | 'B' | 'C' | 'D';
  leaseTerms: string;
  tenantConcentration: number;
  leaseExpirationSchedule: number[];
}

export interface RealEstateSyndicationOutputs {
  // Capital structure analysis
  equitySplit: number;
  debtToEquityRatio: number;
  loanToValueRatio: number;
  loanToCostRatio: number;

  // Waterfall distributions
  sponsorDistributions: number[];
  limitedPartnerDistributions: number[];
  totalDistributions: number[];
  cumulativeDistributions: number[];

  // Return metrics
  internalRateOfReturn: number;
  equityMultiple: number;
  cashOnCashReturn: number;
  averageAnnualReturn: number;

  // Cash flow analysis
  year1CashFlow: number;
  year2CashFlow: number;
  year3CashFlow: number;
  year4CashFlow: number;
  year5CashFlow: number;
  totalCashFlow: number;

  // Profit splits
  sponsorProfitShare: number;
  limitedPartnerProfitShare: number;
  promoteAmount: number;
  carriedInterest: number;

  // Fee analysis
  totalFees: number;
  feeDrag: number;
  netToInvestors: number;
  feeEfficiency: number;

  // Risk analysis
  riskAdjustedIrr: number;
  probabilityOfSuccess: number;
  downsideProtection: number;
  upsidePotential: number;

  // Sensitivity analysis
  irrSensitivityToNoi: number;
  irrSensitivityToCapRate: number;
  irrSensitivityToCosts: number;
  irrSensitivityToDelay: number;

  // Scenario analysis
  baseCaseIrr: number;
  bestCaseIrr: number;
  worstCaseIrr: number;
  monteCarloAverageIrr: number;

  // Tax analysis
  depreciationBenefit: number;
  taxSavings: number;
  afterTaxIrr: number;
  taxEfficiency: number;

  // Deal metrics
  capRate: number;
  noiYield: number;
  cashOnCashYield: number;
  breakEvenOccupancy: number;

  // Performance vs targets
  irrVsTarget: number;
  equityMultipleVsTarget: number;
  cashOnCashVsTarget: number;
  performanceRating: 'Excellent' | 'Good' | 'Fair' | 'Poor';

  // Sponsor analysis
  sponsorQualityScore: number;
  sponsorAlignment: number;
  sponsorIncentiveAlignment: number;
  sponsorTrackRecordScore: number;

  // Market analysis
  marketTiming: 'Good' | 'Fair' | 'Poor';
  marketRiskPremium: number;
  marketPositionScore: number;
  competitiveAdvantage: number;

  // Property analysis
  propertyQualityScore: number;
  propertyRiskScore: number;
  propertyValueAdd: number;
  propertyStabilizationTime: number;

  // Investor analysis
  investorSuitabilityScore: number;
  riskSuitability: 'Low' | 'Medium' | 'High';
  returnSuitability: 'Low' | 'Medium' | 'High';
  diversificationBenefit: number;

  // Legal and regulatory
  regulatoryCompliance: boolean;
  legalStructureEfficiency: number;
  investorProtectionScore: number;
  secComplianceLevel: number;

  // Cost analysis
  totalAcquisitionCosts: number;
  totalOperatingCosts: number;
  costPerUnit: number;
  costEfficiency: number;

  // Exit analysis
  exitValue: number;
  exitCapRate: number;
  exitMultiple: number;
  exitTiming: number;

  // Benchmarking
  vsIndustryAverageIrr: number;
  vsIndustryAverageEquityMultiple: number;
  vsComparableDeals: number;
  percentileRanking: number;

  // Value creation
  totalValueCreated: number;
  valuePerInvestor: number;
  valueCreationEfficiency: number;
  returnOnEffort: number;

  // Stakeholder returns
  sponsorReturn: number;
  limitedPartnerReturn: number;
  lenderReturn: number;
  overallStakeholderSatisfaction: number;

  // Operational metrics
  occupancyStabilization: number;
  rentCollectionRate: number;
  expenseControl: number;
  managementEfficiency: number;

  // Risk metrics
  marketRiskScore: number;
  propertyRiskScore: number;
  executionRiskScore: number;
  totalRiskScore: number;

  // Sustainability metrics
  environmentalScore: number;
  socialImpact: number;
  governanceScore: number;
  esgRating: 'A' | 'B' | 'C' | 'D';

  // Innovation metrics
  technologyIntegration: number;
  processInnovation: number;
  dealStructureInnovation: number;
  marketDisruption: number;

  // Deal quality metrics
  dealQualityScore: number;
  executionQualityScore: number;
  valueCreationScore: number;
  riskManagementScore: number;

  // Recommendation
  investmentRecommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyRisks: string[];
  keyOpportunities: string[];

  // Educational content
  syndicationFacts: string[];
  riskEducation: string[];
  strategyTips: string[];

  // Performance tracking
  milestoneAchievement: number;
  timelineAdherence: number;
  budgetAdherence: number;
  qualityAchievement: number;

  // Attribution analysis
  returnAttribution: {
    noiGrowth: number;
    propertyAppreciation: number;
    costControl: number;
    marketTiming: number;
  };

  // Stress testing
  stressTestResults: {
    recessionScenario: number;
    highInterestScenario: number;
    lowOccupancyScenario: number;
    costOverrunScenario: number;
  };

  // Alternative structures
  alternativeStructures: {
    directOwnership: number;
    jointVenture: number;
    crowdfunding: number;
  };

  // Portfolio impact
  portfolioDiversification: number;
  portfolioReturnEnhancement: number;
  portfolioRiskAdjustment: number;

  // Legacy value
  longTermAppreciation: number;
  generationalWealth: number;
  communityImpact: number;

  // Technology impact
  syndicationPlatformEfficiency: number;
  digitalReportingBenefits: number;
  automationSavings: number;

  // International considerations
  crossBorderImplications: string[];
  currencyRisk: number;
  regulatoryComplexity: number;

  // Succession planning
  transferability: number;
  liquidityOptions: number;
  estatePlanningEfficiency: number;

  // Economic analysis
  inflationHedge: number;
  economicCycleSensitivity: number;
  interestRateSensitivity: number;

  // Benchmarking details
  industryComparables: Array<{
    name: string;
    irr: number;
    equityMultiple: number;
    riskLevel: string;
  }>;

  // Deal sourcing
  dealSourceQuality: number;
  marketIntelligence: number;
  competitiveAnalysis: number;

  // Long-term value
  valuePreservation: number;
  valueEnhancement: number;
  legacyCreation: number;

  // Innovation opportunities
  emergingTrends: string[];
  technologyAdoption: number;
  processOptimization: number;

  // Stakeholder analysis
  investorSatisfaction: number;
  sponsorSatisfaction: number;
  communityRelations: number;
  regulatoryRelations: number;

  // Performance metrics
  goalsAchievement: number;
  targetsMet: number;
  expectationsExceeded: number;
  overallSuccess: number;

  // Future outlook
  marketTrends: string[];
  regulatoryChanges: string[];
  technologyEvolution: string[];

  // Action items
  immediateActions: string[];
  shortTermPlanning: string[];
  longTermStrategy: string[];

  // Compliance monitoring
  regulatoryAdherence: number;
  reportingAccuracy: number;
  transparencyLevel: number;

  // Value creation metrics
  economicValueAdded: number;
  socialValueCreated: number;
  environmentalValue: number;

  // Innovation impact
  processImprovement: number;
  efficiencyGains: number;
  competitiveAdvantage: number;
}