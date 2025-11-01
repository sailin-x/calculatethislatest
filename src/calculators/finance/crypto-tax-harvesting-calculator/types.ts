export interface CryptoTaxHarvestingInputs {
  // Portfolio information
  totalPortfolioValue: number;
  numberOfCryptocurrencies: number;
  portfolioDiversification: 'Low' | 'Medium' | 'High';
  holdingPeriod: 'Short-term' | 'Long-term' | 'Mixed';

  // Tax situation
  taxBracket: '10%' | '12%' | '22%' | '24%' | '32%' | '35%' | '37%';
  stateTaxRate: number;
  capitalGainsTax: number;
  ordinaryIncomeTax: number;

  // Transaction history
  annualTransactions: number;
  averageTransactionSize: number;
  realizedGains: number;
  realizedLosses: number;

  // Market conditions
  marketVolatility: 'Low' | 'Medium' | 'High' | 'Extreme';
  cryptoMarketTrend: 'Bull' | 'Bear' | 'Sideways';
  bitcoinDominance: number;

  // Strategy preferences
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  timeHorizon: 'Short-term' | 'Medium-term' | 'Long-term';
  automationPreference: 'Manual' | 'Semi-automated' | 'Fully-automated';

  // Cost considerations
  transactionFees: number;
  platformFees: number;
  taxPreparationCosts: number;
  advisoryFees: number;

  // Regulatory compliance
  taxReportingCompliance: 'Full' | 'Partial' | 'None';
  kycStatus: 'Complete' | 'Pending' | 'Not Started';
  jurisdiction: string;

  // Technology and tools
  tradingPlatform: string;
  taxSoftware: string;
  portfolioTracking: 'Basic' | 'Advanced' | 'Professional';

  // Analysis options
  includeTaxOptimization: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Comparative analysis
  compareToTraditionalInvesting: boolean;
  compareToOtherCryptoStrategies: boolean;
  compareToIndexFunds: boolean;
  compareToActiveTrading: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Goal alignment
  primaryGoal: 'Tax Minimization' | 'Portfolio Growth' | 'Risk Reduction' | 'Cash Flow';
  secondaryGoal: 'Tax Minimization' | 'Portfolio Growth' | 'Risk Reduction' | 'Cash Flow';

  // Behavioral factors
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';
  technologyOutlook: 'Stable' | 'Disruptive' | 'Transformative';

  // Regulatory compliance
  cryptoTaxLaws: boolean;
  reportingRequirements: boolean;
  internationalCompliance: boolean;
  auditRisk: 'Low' | 'Medium' | 'High';

  // Performance tracking
  reviewFrequency: 'Monthly' | 'Quarterly' | 'Annually';
  performanceMetrics: boolean;
  taxEfficiencyTracking: boolean;

  // Education and communication
  cryptoKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  taxKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  strategyCommunication: boolean;

  // Documentation
  transactionRecords: boolean;
  taxDocuments: boolean;
  strategyDocumentation: boolean;

  // Timeline
  implementationTimeframe: number; // Months
  reviewPeriod: number; // Months

  // Contingency planning
  marketDownturnPlan: boolean;
  regulatoryChangePlan: boolean;

  // Quality of life
  timeCommitment: 'High' | 'Medium' | 'Low';
  stressLevel: 'High' | 'Medium' | 'Low';
  satisfactionLevel: 'High' | 'Medium' | 'Low';

  // Future flexibility
  strategyAdaptability: boolean;
  technologyUpgrades: boolean;
  regulatoryAdaptation: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    taxEfficiency: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    complexity: 'Low' | 'Medium' | 'High';
  }>;

  // Historical performance
  portfolioReturns: number[];
  taxSavings: number[];
  strategyPerformance: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  communityInfluence: string;
  peerComparison: string;
  expertInfluence: string;

  // Technological factors
  automationLevel: 'High' | 'Medium' | 'Low';
  dataAnalytics: boolean;
  aiAssistance: boolean;

  // Regulatory changes
  pendingRegulations: boolean;
  taxLawChanges: boolean;

  // Market timing
  marketTiming: 'Optimal' | 'Good' | 'Poor';
  entryExitTiming: string;

  // Professional advice
  taxAdvisor: boolean;
  financialPlanner: boolean;
  cryptoSpecialist: boolean;

  // Documentation completeness
  allRecordsComplete: boolean;
  professionalReview: boolean;
  independentAudit: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  riskComfort: 'High' | 'Medium' | 'Low';
  strategyCommitment: 'High' | 'Medium' | 'Low';

  // Financial readiness
  capitalAvailable: number;
  liquidityNeeds: number;
  riskCapital: 'High' | 'Medium' | 'Low';

  // Knowledge assessment
  cryptoUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  taxUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  strategyUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  advisorNetwork: boolean;
  communitySupport: boolean;
  professionalNetwork: boolean;
  technologySupport: boolean;

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
  oneYearVision: string;
  threeYearVision: string;
  fiveYearVision: string;

  // Values alignment
  personalValues: string[];
  financialValues: string[];
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
  dueDiligenceComplete: boolean;
  professionalAdviceObtained: boolean;
  documentationComplete: boolean;
}

export interface CryptoTaxHarvestingOutputs {
  // Tax calculations
  totalTaxLiability: number;
  taxSavings: number;
  effectiveTaxRate: number;
  afterTaxReturns: number;

  // Harvesting efficiency
  harvestingEfficiency: number;
  lossUtilizationRate: number;
  taxAlpha: number;
  costBasisOptimization: number;

  // Portfolio performance
  portfolioReturn: number;
  riskAdjustedReturn: number;
  sharpeRatio: number;
  maximumDrawdown: number;

  // Risk analysis
  portfolioVolatility: number;
  valueAtRisk: number;
  expectedShortfall: number;
  tailRisk: number;

  // Scenario analysis
  bestCaseReturn: number;
  worstCaseReturn: number;
  baseCaseReturn: number;
  probabilityOfPositiveReturn: number;

  // Comparative analysis
  vsTraditionalInvesting: number;
  vsBuyAndHold: number;
  vsActiveTrading: number;
  vsIndexFunds: number;

  // Cost analysis
  totalTransactionCosts: number;
  taxPreparationCosts: number;
  platformFees: number;
  netCostOfStrategy: number;

  // Efficiency metrics
  taxEfficiency: number;
  costEfficiency: number;
  timeEfficiency: number;
  automationEfficiency: number;

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

  // Financial impact
  netWealthIncrease: number;
  cashFlowImprovement: number;
  riskReduction: number;
  diversificationBenefit: number;

  // Regulatory compliance
  complianceScore: number;
  auditReadiness: number;
  reportingAccuracy: number;
  regulatoryAdherence: number;

  // Performance attribution
  taxStrategyAttribution: number;
  marketTimingAttribution: number;
  assetSelectionAttribution: number;
  riskManagementAttribution: number;

  // Sustainability analysis
  strategySustainability: number;
  longTermViability: number;
  marketAdaptability: number;
  regulatoryResilience: number;

  // Technology integration
  automationBenefits: number;
  dataAnalyticsValue: number;
  aiAssistanceValue: number;
  platformEfficiency: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  investorWellness: number;

  // Market analysis
  marketTimingEfficiency: number;
  sectorAllocation: number;
  assetCorrelation: number;
  alphaGeneration: number;

  // Economic analysis
  inflationSensitivity: number;
  interestRateSensitivity: number;
  currencyRisk: number;
  economicCycleSensitivity: number;

  // Geographic analysis
  jurisdictionalEfficiency: number;
  taxArbitrage: number;
  regulatoryArbitrage: number;
  geographicDiversification: number;

  // Innovation opportunities
  strategyInnovation: number;
  technologyInnovation: number;
  processInnovation: number;
  productInnovation: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  investorSatisfaction: number;
  advisorSatisfaction: number;
  platformSatisfaction: number;
  regulatorSatisfaction: number;

  // Success metrics
  strategySuccess: number;
  taxOptimization: number;
  riskManagement: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Implement Tax Harvesting' | 'Modify Strategy' | 'Alternative Approach' | 'Reevaluate Goals';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  taxHarvestingEducation: string[];
  cryptoTaxEducation: string[];
  strategyEducation: string[];
  riskEducation: string[];

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
  taxCompliance: number;
  reportingCompliance: number;

  // Performance tracking
  portfolioMetrics: string[];
  taxMetrics: string[];
  riskMetrics: string[];
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
  investorEngagement: number;
  advisorEngagement: number;
  platformEngagement: number;
  communityEngagement: number;

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
  strategicHealth: number;
  operationalHealth: number;
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
  finalRecommendation: 'Aggressive Tax Harvesting' | 'Conservative Approach' | 'Balanced Strategy' | 'Defer Implementation';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  cryptocurrencyEducation: string[];
  taxOptimizationEducation: string[];
  portfolioManagementEducation: string[];
  riskManagementEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  taxAttribution: number;
  marketAttribution: number;
  strategyAttribution: number;
  riskAttribution: number;

  // Stress testing results
  stressTestResults: {
    marketCrash: number;
    regulatoryChange: number;
    taxLawChange: number;
    platformFailure: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    traditionalTaxLossHarvesting: number;
    buyAndHold: number;
    activeTrading: number;
    diversifiedPortfolio: number;
  };

  // Portfolio impact
  portfolioOptimization: number;
  taxEfficiencyEnhancement: number;
  riskReduction: number;
  returnEnhancement: number;

  // Legacy value
  strategyLegacy: number;
  portfolioLegacy: number;
  knowledgeLegacy: number;
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
  financialValue: number;
  taxValue: number;
  riskValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}