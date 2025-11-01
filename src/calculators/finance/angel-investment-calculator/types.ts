export interface AngelInvestmentInputs {
  // Investment details
  investmentAmount: number;
  ownershipPercentage: number;
  valuation: number;
  postMoneyValuation: number;

  // Company information
  companyName: string;
  industry: string;
  stage: 'Pre-seed' | 'Seed' | 'Early' | 'Growth' | 'Expansion';
  location: string;
  foundingDate: string;

  // Financial projections
  currentRevenue: number;
  projectedRevenueYear1: number;
  projectedRevenueYear2: number;
  projectedRevenueYear3: number;
  currentBurnRate: number;
  runwayMonths: number;

  // Team information
  teamSize: number;
  founderExperience: 'High' | 'Medium' | 'Low';
  technicalExpertise: 'Strong' | 'Moderate' | 'Weak';
  marketKnowledge: 'Excellent' | 'Good' | 'Limited';

  // Market opportunity
  marketSize: number;
  marketGrowthRate: number;
  competitiveLandscape: 'Favorable' | 'Competitive' | 'Crowded';
  uniqueValueProposition: 'Strong' | 'Moderate' | 'Weak';

  // Product/Service
  productMaturity: 'MVP' | 'Beta' | 'GA' | 'Mature';
  customerAcquisition: 'Strong' | 'Moderate' | 'Weak';
  unitEconomics: 'Positive' | 'Break-even' | 'Negative';

  // Risk assessment
  technologyRisk: 'Low' | 'Medium' | 'High';
  marketRisk: 'Low' | 'Medium' | 'High';
  executionRisk: 'Low' | 'Medium' | 'High';
  regulatoryRisk: 'Low' | 'Medium' | 'High';

  // Exit strategy
  exitHorizon: number; // Years
  expectedExitMultiple: number;
  ipoPotential: 'High' | 'Medium' | 'Low';
  acquisitionInterest: 'High' | 'Medium' | 'Low';

  // Terms
  liquidationPreference: number;
  boardSeats: number;
  votingRights: 'Standard' | 'Enhanced' | 'Limited';
  antiDilution: boolean;

  // Analysis options
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Comparative analysis
  compareToIndustryAverages: boolean;
  compareToSimilarInvestments: boolean;
  compareToPortfolioCompanies: boolean;
  compareToMarketRates: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Portfolio considerations
  portfolioSize: number;
  diversificationNeeds: 'High' | 'Medium' | 'Low';
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';

  // Goal alignment
  primaryGoal: 'Financial Return' | 'Strategic Investment' | 'Portfolio Diversification' | 'Social Impact';
  secondaryGoal: 'Financial Return' | 'Strategic Investment' | 'Portfolio Diversification' | 'Social Impact';

  // Behavioral factors
  investmentExperience: 'Expert' | 'Experienced' | 'Novice';
  decisionStyle: 'Analytical' | 'Intuitive' | 'Collaborative';
  riskAppetite: 'Conservative' | 'Moderate' | 'Aggressive';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  interestRateEnvironment: 'Low' | 'Moderate' | 'High';
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';

  // Regulatory compliance
  secCompliance: boolean;
  accreditationStatus: boolean;
  taxImplications: boolean;
  reportingRequirements: boolean;

  // Performance tracking
  reviewFrequency: 'Quarterly' | 'Semi-Annual' | 'Annual';
  kpiMonitoring: boolean;
  milestoneTracking: boolean;

  // Education and communication
  investmentKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  stakeholderCommunication: boolean;
  dueDiligence: boolean;

  // Documentation
  termSheet: boolean;
  capTable: boolean;
  financials: boolean;

  // Timeline
  dueDiligencePeriod: number; // Weeks
  closingDate: string;

  // Contingency planning
  backupStrategy: string;
  exitStrategy: boolean;

  // Quality of life
  timeCommitment: 'High' | 'Medium' | 'Low';
  involvementLevel: 'Active' | 'Passive' | 'Observer';
  satisfactionLevel: 'High' | 'Medium' | 'Low';

  // Future flexibility
  followOnRights: boolean;
  proRataRights: boolean;
  transferability: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    expectedReturn: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    timeCommitment: 'Low' | 'Medium' | 'High';
  }>;

  // Historical performance
  investmentHistory: number[];
  portfolioPerformance: number[];
  exitHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  networkEffects: string;
  reputationImpact: string;
  communityInfluence: string;

  // Technological factors
  innovationLevel: 'High' | 'Medium' | 'Low';
  scalability: 'High' | 'Medium' | 'Low';
  technologyAdoption: 'Early' | 'Mainstream' | 'Late';

  // Regulatory changes
  pendingRegulations: boolean;
  investmentLaws: boolean;

  // Market timing
  marketCycle: 'Peak' | 'Normal' | 'Bottom';
  sectorTiming: string;

  // Professional advice
  investmentAdvisor: boolean;
  legalCounsel: boolean;
  taxAdvisor: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  independentAnalysis: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  excitementLevel: 'High' | 'Medium' | 'Low';
  anxietyLevel: 'Low' | 'Medium' | 'High';

  // Financial readiness
  liquidityPosition: number;
  capitalCommitment: number;
  diversificationLevel: 'High' | 'Medium' | 'Low';

  // Knowledge assessment
  startupUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  investmentUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  riskUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  mentorNetwork: boolean;
  investorNetwork: boolean;
  advisoryBoard: boolean;
  expertNetwork: boolean;

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
  personalValues: string[];
  investmentValues: string[];
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

export interface AngelInvestmentOutputs {
  // Investment returns
  expectedReturn: number;
  internalRateOfReturn: number;
  multipleOfInvestedCapital: number;
  paybackPeriod: number; // Years

  // Valuation analysis
  preMoneyValuation: number;
  postMoneyValuation: number;
  ownershipPercentage: number;
  dilutionImpact: number;

  // Financial projections
  year1Revenue: number;
  year3Revenue: number;
  year5Revenue: number;
  profitabilityTimeline: number; // Years

  // Risk analysis
  totalRiskScore: number;
  probabilityOfSuccess: number;
  riskAdjustedReturn: number;
  downsideProtection: number;

  // Scenario analysis
  bestCaseReturn: number;
  worstCaseReturn: number;
  baseCaseReturn: number;
  breakEvenPoint: number;

  // Comparative analysis
  vsIndustryAverages: number;
  vsSimilarInvestments: number;
  vsPortfolioCompanies: number;
  vsMarketRates: number;

  // ROI analysis
  returnOnInvestment: number;
  capitalEfficiency: number;
  valueCreation: number;
  strategicValue: number;

  // Sensitivity analysis
  sensitivityToValuation: number;
  sensitivityToRevenue: number;
  sensitivityToExit: number;
  sensitivityToRisk: number;

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

  // Portfolio impact
  diversificationBenefit: number;
  portfolioReturnEnhancement: number;
  riskDistribution: number;
  correlationImpact: number;

  // Regulatory compliance
  secCompliance: number;
  taxCompliance: number;
  reportingCompliance: number;
  overallCompliance: number;

  // Performance attribution
  companyEffect: number;
  marketEffect: number;
  timingEffect: number;
  strategyEffect: number;

  // Sustainability analysis
  investmentSustainability: number;
  longTermViability: number;
  marketPosition: number;
  sustainableStrategy: number;

  // Technology integration
  innovationPotential: number;
  scalabilityAssessment: number;
  technologyAdoption: number;
  competitiveAdvantage: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  investorWellness: number;

  // Market analysis
  sectorPerformance: number;
  marketTiming: number;
  competitivePositioning: number;
  growthPotential: number;

  // Economic analysis
  economicSensitivity: number;
  interestRateImpact: number;
  inflationSensitivity: number;
  currencyRisk: number;

  // Geographic analysis
  locationAdvantage: number;
  marketAccess: number;
  regulatoryEnvironment: number;
  geographicDiversification: number;

  // Innovation opportunities
  productInnovation: number;
  businessModelInnovation: number;
  marketInnovation: number;
  technologyInnovation: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  founderSatisfaction: number;
  teamSatisfaction: number;
  investorSatisfaction: number;
  communitySatisfaction: number;

  // Success metrics
  investmentSuccess: number;
  portfolioEnhancement: number;
  strategicAlignment: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Invest' | 'Pass' | 'Follow-on' | 'Reevaluate';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  angelInvestmentEducation: string[];
  startupEducation: string[];
  riskEducation: string[];
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
  taxCompliance: number;
  reportingCompliance: number;

  // Performance tracking
  investmentMetrics: string[];
  portfolioMetrics: string[];
  companyMetrics: string[];
  overallMetrics: string[];

  // Risk monitoring
  riskIndicators: string[];
  earlyWarningSignals: string[];
  mitigationStrategies: string[];
  contingencyPlans: string[];

  // Value optimization
  optimizationOpportunities: string[];
  efficiencyImprovements: string[];
  riskReductions: string[];
  valueEnhancements: string[];

  // Stakeholder engagement
  founderEngagement: number;
  teamEngagement: number;
  investorEngagement: number;
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
  finalRecommendation: 'Strong Invest' | 'Moderate Invest' | 'Pass with Regret' | 'Clear Pass';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  angelInvestingEducation: string[];
  dueDiligenceEducation: string[];
  portfolioManagementEducation: string[];
  exitStrategyEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  companyAttribution: number;
  marketAttribution: number;
  timingAttribution: number;
  strategyAttribution: number;

  // Stress testing results
  stressTestResults: {
    marketCrash: number;
    companyFailure: number;
    regulatoryChange: number;
    economicDownturn: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    syndicateInvestment: number;
    followOnInvestment: number;
    convertibleNote: number;
    equityCrowdfunding: number;
  };

  // Portfolio impact
  portfolioDiversification: number;
  portfolioReturnEnhancement: number;
  portfolioRiskReduction: number;
  portfolioOptimization: number;

  // Legacy value
  investmentLegacy: number;
  portfolioLegacy: number;
  impactLegacy: number;
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
  strategicValue: number;
  networkValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}