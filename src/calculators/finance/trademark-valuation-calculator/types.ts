export interface TrademarkValuationInputs {
  // Trademark information
  trademarkName: string;
  registrationNumber: string;
  registrationDate: string;
  renewalDate: string;
  trademarkClass: string;
  trademarkStatus: 'Active' | 'Pending' | 'Abandoned' | 'Expired';

  // Business information
  companyName: string;
  industry: string;
  businessSize: 'Small' | 'Medium' | 'Large';
  marketPosition: 'Leader' | 'Challenger' | 'Follower' | 'Niche';

  // Financial information
  annualRevenue: number;
  trademarkRelatedRevenue: number;
  royaltyRate: number;
  discountRate: number;
  terminalGrowthRate: number;

  // Market information
  marketSize: number;
  marketShare: number;
  geographicScope: 'Local' | 'Regional' | 'National' | 'International' | 'Global';
  targetMarket: string;

  // Brand strength
  brandRecognition: 'Low' | 'Medium' | 'High';
  brandLoyalty: 'Low' | 'Medium' | 'High';
  brandAwareness: number; // Percentage
  brandEquity: number;

  // Competitive landscape
  numberOfCompetitors: number;
  competitiveAdvantage: 'Strong' | 'Moderate' | 'Weak';
  marketConcentration: 'High' | 'Medium' | 'Low';

  // Legal protection
  registrationStatus: 'Registered' | 'Pending' | 'Common Law';
  internationalProtection: boolean;
  litigationHistory: boolean;
  infringementRisk: 'Low' | 'Medium' | 'High';

  // Economic factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  industryGrowthRate: number;
  inflationRate: number;
  currency: string;

  // Valuation method preferences
  primaryMethod: 'Income' | 'Market' | 'Cost';
  secondaryMethod: 'Income' | 'Market' | 'Cost';

  // Analysis options
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Comparative analysis
  compareToSimilarTrademarks: boolean;
  compareToIndustryAverages: boolean;
  compareToCompanyAssets: boolean;
  compareToMarketRates: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Risk factors
  marketRisk: 'Low' | 'Medium' | 'High';
  legalRisk: 'Low' | 'Medium' | 'High';
  obsolescenceRisk: 'Low' | 'Medium' | 'High';
  regulatoryRisk: 'Low' | 'Medium' | 'High';

  // Time horizon
  valuationPeriod: number; // Years
  projectionPeriod: number; // Years
  discountPeriod: number; // Years

  // Goal alignment
  primaryGoal: 'Sale' | 'Licensing' | 'Merger' | 'Tax Planning' | 'Asset Management';
  secondaryGoal: 'Sale' | 'Licensing' | 'Merger' | 'Tax Planning' | 'Asset Management';

  // Behavioral factors
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  timeHorizon: 'Short' | 'Medium' | 'Long';
  strategicImportance: 'High' | 'Medium' | 'Low';

  // External factors
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';
  technologyOutlook: 'Stable' | 'Disruptive' | 'Transformative';

  // Regulatory compliance
  trademarkLaws: boolean;
  internationalTreaties: boolean;
  complianceStatus: 'Compliant' | 'Non-compliant' | 'Under Review';

  // Performance tracking
  reviewFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly';

  // Education and communication
  valuationUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  stakeholderCommunication: boolean;
  documentationQuality: 'High' | 'Medium' | 'Low';

  // Documentation
  trademarkDocuments: boolean;
  financialStatements: boolean;
  marketResearch: boolean;

  // Timeline
  implementationTimeframe: number; // Months
  valuationDate: string;

  // Contingency planning
  backupStrategy: string;
  riskMitigation: boolean;

  // Quality of life
  businessImpact: 'High' | 'Medium' | 'Low';
  stakeholderSatisfaction: 'High' | 'Medium' | 'Low';
  strategicAlignment: 'High' | 'Medium' | 'Low';

  // Future flexibility
  transferability: boolean;
  divisibility: boolean;
  durability: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    expectedReturn: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    complexity: 'Low' | 'Medium' | 'High';
  }>;

  // Historical performance
  revenueHistory: number[];
  marketShareHistory: number[];
  brandValueHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  brandReputation: string;
  customerPerception: string;
  stakeholderExpectations: string;

  // Technological factors
  digitalPresence: boolean;
  onlineVisibility: number;
  socialMediaEngagement: number;

  // Regulatory changes
  pendingLegislation: boolean;
  trademarkLawChanges: boolean;

  // Market timing
  valuationTiming: 'Peak' | 'Normal' | 'Low';
  marketConditions: string;

  // Professional advice
  valuationExpert: boolean;
  legalCounsel: boolean;
  financialAdvisor: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  independentAnalysis: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  stakeholderAgreement: 'High' | 'Medium' | 'Low';
  strategicReadiness: 'High' | 'Medium' | 'Low';

  // Financial readiness
  liquidityPosition: number;
  capitalRequirements: number;
  fundingAvailability: 'High' | 'Medium' | 'Low';

  // Knowledge assessment
  trademarkUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  valuationUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  businessUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  managementSupport: boolean;
  boardApproval: boolean;
  stakeholderSupport: boolean;
  expertSupport: boolean;

  // Decision framework
  prosList: string[];
  consList: string[];
  decisionCriteria: string[];
  weightedCriteria: Array<{ criterion: string; weight: number }>;

  // Implementation plan
  actionSteps: string[];
  timeline: string[];
  responsibleParties: string[];
  successMetrics: string[];

  // Contingency plans
  bestCaseScenario: string;
  worstCaseScenario: string;
  mostLikelyScenario: string;
  riskMitigation: string[];

  // Long-term vision
  threeYearVision: string;
  fiveYearVision: string;
  tenYearVision: string;

  // Values alignment
  businessValues: string[];
  brandValues: string[];
  decisionAlignment: number;

  // Mindfulness and reflection
  strategicThinking: boolean;
  stakeholderConsideration: boolean;
  longTermPerspective: number;

  // External validation
  peerReview: boolean;
  expertValidation: boolean;
  marketValidation: boolean;

  // Final checklist
  allFactorsConsidered: boolean;
  stakeholderConsensus: boolean;
  professionalAdviceObtained: boolean;
  documentationComplete: boolean;
}

export interface TrademarkValuationOutputs {
  // Valuation results
  trademarkValue: number;
  incomeApproachValue: number;
  marketApproachValue: number;
  costApproachValue: number;

  // Income analysis
  royaltyIncome: number;
  discountedCashFlow: number;
  profitSplitAnalysis: number;
  reliefFromRoyalty: number;

  // Market analysis
  comparableTransactions: number;
  marketMultiples: number;
  industryBenchmarks: number;
  marketPremium: number;

  // Cost analysis
  replacementCost: number;
  reproductionCost: number;
  developmentCost: number;
  maintenanceCost: number;

  // Brand strength metrics
  brandStrengthIndex: number;
  brandValueIndex: number;
  brandEquityScore: number;
  brandRiskScore: number;

  // Financial projections
  year1Projection: number;
  year3Projection: number;
  year5Projection: number;
  year10Projection: number;

  // Risk analysis
  valuationRisk: number;
  marketRisk: number;
  legalRisk: number;
  totalRiskScore: number;

  // Scenario analysis
  bestCaseValue: number;
  worstCaseValue: number;
  baseCaseValue: number;
  probabilityOfSuccess: number;

  // Comparative analysis
  vsSimilarTrademarks: number;
  vsIndustryAverages: number;
  vsCompanyAssets: number;
  vsMarketRates: number;

  // Tax implications
  taxEfficiency: number;
  capitalGainsTax: number;
  depreciationBenefits: number;
  taxOptimization: number;

  // ROI analysis
  returnOnInvestment: number;
  valueCreation: number;
  strategicValue: number;
  financialLeverage: number;

  // Sensitivity analysis
  sensitivityToRevenue: number;
  sensitivityToRoyalty: number;
  sensitivityToDiscount: number;
  sensitivityToGrowth: number;

  // Decision quality metrics
  informationCompleteness: number;
  analysisRigor: number;
  decisionConfidence: number;
  decisionQualityScore: number;

  // Behavioral insights
  cognitiveBiases: string[];
  emotionalFactors: string[];
  socialInfluences: string[];
  behavioralRecommendations: string[];

  // Business impact
  revenueContribution: number;
  profitContribution: number;
  marketShareImpact: number;
  competitiveAdvantage: number;

  // Regulatory compliance
  legalCompliance: number;
  trademarkCompliance: number;
  internationalCompliance: number;
  overallCompliance: number;

  // Performance attribution
  brandEffect: number;
  marketEffect: number;
  legalEffect: number;
  businessEffect: number;

  // Sustainability analysis
  brandSustainability: number;
  longTermViability: number;
  marketPosition: number;
  sustainableStrategy: number;

  // Technology integration
  digitalTools: number;
  onlineAnalytics: number;
  brandMonitoring: number;
  automatedReporting: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  stakeholderWellness: number;

  // Market analysis
  marketPosition: number;
  competitiveLandscape: number;
  growthPotential: number;
  marketRisk: number;

  // Economic analysis
  businessCycleSensitivity: number;
  industrySensitivity: number;
  economicSensitivity: number;
  currencySensitivity: number;

  // Geographic analysis
  geographicValue: number;
  internationalPotential: number;
  marketExpansion: number;
  geographicRisk: number;

  // Innovation opportunities
  brandInnovation: number;
  technologyIntegration: number;
  marketExpansion: number;
  strategicPartnerships: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  ownerSatisfaction: number;
  managementSatisfaction: number;
  investorSatisfaction: number;
  customerSatisfaction: number;

  // Success metrics
  valuationAccuracy: number;
  strategicAlignment: number;
  financialPerformance: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Maintain Current Strategy' | 'Enhance Brand Value' | 'Monetize Trademark' | 'Reevaluate Position';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  trademarkEducation: string[];
  valuationEducation: string[];
  brandEducation: string[];
  strategyEducation: string[];

  // Success metrics
  goalAchievement: number;
  strategyEffectiveness: number;
  implementationSuccess: number;
  overallAchievement: number;

  // Future considerations
  regulatoryOutlook: string[];
  marketTrends: string[];
  technologyImpact: string[];
  evolutionPotential: string[];

  // Action items
  immediateActions: string[];
  shortTermPlanning: string[];
  longTermStrategy: string[];
  monitoringRequirements: string[];

  // Compliance monitoring
  regulatoryAdherence: number;
  legalCompliance: number;
  trademarkCompliance: number;
  reportingCompliance: number;

  // Performance tracking
  brandMetrics: string[];
  valuationMetrics: string[];
  marketMetrics: string[];
  overallMetrics: string[];

  // Risk monitoring
  riskIndicators: string[];
  earlyWarningSignals: string[];
  mitigationStrategies: string[];
  contingencyPlans: string[];

  // Value optimization
  optimizationOpportunities: string[];
  efficiencyImprovements: string[];
  costReductions: string[];
  valueEnhancements: string[];

  // Stakeholder engagement
  ownerEngagement: number;
  managementEngagement: number;
  investorEngagement: number;
  customerEngagement: number;

  // Innovation metrics
  technologicalInnovation: number;
  processInnovation: number;
  serviceInnovation: number;
  overallInnovation: number;

  // Sustainability analysis
  longTermSustainability: number;
  environmentalImpact: number;
  socialImpact: number;
  governanceImpact: number;

  // Holistic assessment
  financialHealth: number;
  brandHealth: number;
  businessHealth: number;
  overallHealth: number;

  // Decision validation
  peerValidation: number;
  expertValidation: number;
  dataValidation: number;
  intuitiveValidation: number;

  // Future vision alignment
  visionAlignment: number;
  goalAlignment: number;
  valueAlignment: number;
  purposeAlignment: number;

  // Mindfulness metrics
  presentMomentAwareness: number;
  decisionClarity: number;
  emotionalBalance: number;
  mindfulChoice: number;

  // Comprehensive recommendation
  finalRecommendation: 'Aggressive Brand Building' | 'Conservative Protection' | 'Strategic Monetization' | 'Portfolio Diversification';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  trademarkValuationEducation: string[];
  brandStrategyEducation: string[];
  intellectualPropertyEducation: string[];
  businessStrategyEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  brandAttribution: number;
  marketAttribution: number;
  legalAttribution: number;
  businessAttribution: number;

  // Stress testing results
  stressTestResults: {
    marketDownturn: number;
    brandCrisis: number;
    legalChallenge: number;
    regulatoryChange: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    licensing: number;
    franchising: number;
    brandExtension: number;
    assetSale: number;
  };

  // Portfolio impact
  portfolioDiversification: number;
  portfolioReturnEnhancement: number;
  portfolioRiskReduction: number;
  portfolioEfficiency: number;

  // Legacy value
  brandLegacy: number;
  businessLegacy: number;
  marketLegacy: number;
  lastingLegacy: number;

  // Innovation impact
  technologyAdvancement: number;
  processImprovement: number;
  userExperience: number;
  competitiveAdvantage: number;

  // Future outlook
  trendAnalysis: string[];
  opportunityAssessment: string[];
  riskAssessment: string[];
  strategicDirection: string[];

  // Action planning
  immediateActions: string[];
  shortTermGoals: string[];
  mediumTermObjectives: string[];
  longTermVision: string[];

  // Monitoring and evaluation
  keyPerformanceIndicators: string[];
  successMetrics: string[];
  reviewFrequency: string;
  adjustmentTriggers: string[];

  // Value creation
  brandValue: number;
  businessValue: number;
  intellectualValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}