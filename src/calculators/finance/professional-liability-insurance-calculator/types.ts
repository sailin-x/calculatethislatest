export interface ProfessionalLiabilityInsuranceInputs {
  // Professional information
  profession: 'Attorney' | 'Accountant' | 'Architect' | 'Engineer' | 'Consultant' | 'Financial Advisor' | 'Real Estate Agent' | 'Insurance Agent' | 'Other';
  specialty: string;
  yearsOfExperience: number;
  certifications: string[];
  continuingEducation: boolean;

  // Business information
  businessStructure: 'Solo Practitioner' | 'Partnership' | 'Professional Corporation' | 'LLC' | 'PLLC';
  numberOfProfessionals: number;
  annualRevenue: number;
  clientBase: number;
  geographicScope: 'Local' | 'Regional' | 'National' | 'International';

  // Claims history
  priorClaims: number;
  claimsSeverity: 'None' | 'Minor' | 'Moderate' | 'Severe' | 'Catastrophic';
  claimsFrequency: 'None' | 'Low' | 'Moderate' | 'High';
  yearsSinceLastClaim: number;

  // Coverage details
  coverageType: 'Claims-Made' | 'Occurrence' | 'Extended Reporting';
  coverageLimits: number;
  deductibleAmount: number;
  aggregateLimit: number;

  // Premium information
  currentPremium: number;
  premiumTrend: number; // Percentage change
  renewalDate: string;

  // Risk assessment
  riskProfile: 'Low' | 'Medium' | 'High' | 'Very High';
  riskFactors: string[];
  mitigationStrategies: string[];

  // Market conditions
  marketCycle: 'Soft' | 'Hard' | 'Normal';
  carrierConcentration: 'High' | 'Medium' | 'Low';
  alternativeMarkets: boolean;

  // Regulatory environment
  licensingRequirements: boolean;
  professionalStandards: boolean;
  mandatoryReporting: boolean;
  peerReview: boolean;

  // Economic factors
  industryGrowthRate: number;
  clientDemand: number;
  competitionLevel: 'Low' | 'Medium' | 'High';
  economicSensitivity: number;

  // Goal alignment
  primaryGoal: 'Risk Management' | 'Cost Control' | 'Compliance' | 'Business Continuity';
  secondaryGoal: 'Risk Management' | 'Cost Control' | 'Compliance' | 'Business Continuity';

  // Behavioral factors
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  decisionStyle: 'Analytical' | 'Intuitive' | 'Collaborative';
  negotiationStyle: 'Cooperative' | 'Competitive' | 'Avoidant';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  industryOutlook: 'Stable' | 'Changing' | 'Disruptive';
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';

  // Regulatory compliance
  professionalEthics: boolean;
  clientProtection: boolean;
  recordKeeping: boolean;
  confidentiality: boolean;

  // Performance tracking
  reviewFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly';
  claimsTracking: boolean;
  premiumTracking: boolean;

  // Education and communication
  insuranceLiteracy: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  riskEducation: 'Comprehensive' | 'Moderate' | 'Basic' | 'None';
  stakeholderCommunication: boolean;

  // Documentation
  policyDocuments: boolean;
  claimsHistory: boolean;
  riskAssessments: boolean;

  // Timeline
  policyPeriod: number; // Months
  renewalTimeline: number; // Months

  // Contingency planning
  claimsFund: boolean;
  reinsurance: boolean;

  // Quality of life
  stressLevel: 'High' | 'Medium' | 'Low';
  professionalSatisfaction: 'High' | 'Medium' | 'Low';
  workLifeBalance: 'Good' | 'Moderate' | 'Poor';

  // Future flexibility
  coverageAdjustability: boolean;
  carrierOptions: boolean;
  alternativeRiskTransfer: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    cost: number;
    coverage: number;
    riskLevel: 'Low' | 'Medium' | 'High';
  }>;

  // Historical performance
  premiumHistory: number[];
  claimsHistoryData: number[];
  lossRatioHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  professionalPressure: string;
  clientExpectations: string;
  industryStandards: string;

  // Technological factors
  digitalTools: boolean;
  cybersecurity: boolean;
  dataProtection: boolean;

  // Regulatory changes
  pendingRegulations: boolean;
  legalChanges: boolean;

  // Market timing
  renewalTiming: 'Optimal' | 'Good' | 'Poor';
  marketCyclePosition: string;

  // Professional advice
  insuranceBroker: boolean;
  riskManager: boolean;
  legalCounsel: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  independentAnalysis: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  riskComfort: 'High' | 'Medium' | 'Low';
  changeTolerance: 'High' | 'Medium' | 'Low';

  // Financial readiness
  budgetAvailability: number;
  cashReserves: number;
  financingOptions: 'High' | 'Medium' | 'Low';

  // Knowledge assessment
  professionalLiabilityUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  insuranceUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  riskUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  professionalNetwork: boolean;
  peerSupport: boolean;
  expertConsultants: boolean;
  industryAssociations: boolean;

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
  professionalValues: string[];
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

export interface ProfessionalLiabilityInsuranceOutputs {
  // Premium analysis
  recommendedPremium: number;
  premiumRange: { min: number; max: number };
  costSavings: number;
  costEfficiency: number;

  // Coverage optimization
  optimalCoverageLimit: number;
  recommendedDeductible: number;
  coverageGapAnalysis: number;
  riskRetentionStrategy: string;

  // Risk assessment
  overallRiskScore: number;
  claimsProbability: number;
  severityPotential: number;
  riskMitigationEffectiveness: number;

  // Scenario analysis
  bestCaseCost: number;
  worstCaseCost: number;
  baseCaseCost: number;
  probabilityOfLargeLoss: number;

  // Comparative analysis
  vsIndustryAverages: number;
  vsPeerGroup: number;
  vsStateAverages: number;
  vsNationalBenchmarks: number;

  // Cost analysis
  totalInsuranceCost: number;
  costPerClient: number;
  costPerRevenue: number;
  costBenefitRatio: number;

  // Efficiency metrics
  riskEfficiency: number;
  coverageEfficiency: number;
  administrativeEfficiency: number;
  overallEfficiency: number;

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
  cashFlowImpact: number;
  profitabilityEffect: number;
  capitalRequirements: number;
  financialStability: number;

  // Regulatory compliance
  complianceScore: number;
  regulatoryReadiness: number;
  reportingCompliance: number;
  legalCompliance: number;

  // Performance attribution
  underwritingAttribution: number;
  claimsAttribution: number;
  marketAttribution: number;
  managementAttribution: number;

  // Sustainability analysis
  insuranceSustainability: number;
  businessSustainability: number;
  financialSustainability: number;
  longTermViability: number;

  // Technology integration
  digitalEfficiency: number;
  dataAnalyticsBenefit: number;
  automationSavings: number;
  technologyROI: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  psychologicalWellness: number;

  // Market analysis
  marketPosition: number;
  competitivePositioning: number;
  carrierStrength: number;
  marketTiming: number;

  // Economic analysis
  industryGrowthSensitivity: number;
  clientDemandImpact: number;
  competitionEffect: number;
  economicCycleSensitivity: number;

  // Geographic analysis
  locationRisk: number;
  regionalTrends: number;
  jurisdictionalVariations: number;
  geographicOptimization: number;

  // Innovation opportunities
  insuranceInnovation: number;
  riskManagementInnovation: number;
  professionalInnovation: number;
  technologyInnovation: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  professionalSatisfaction: number;
  clientImpact: number;
  insurerRelations: number;
  communityEffect: number;

  // Success metrics
  riskManagementSuccess: number;
  costControlSuccess: number;
  complianceSuccess: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Maintain Current Coverage' | 'Increase Coverage' | 'Reduce Coverage' | 'Change Carrier';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  professionalLiabilityEducation: string[];
  insuranceEducation: string[];
  riskManagementEducation: string[];
  professionalDevelopmentEducation: string[];

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
  legalAdherence: number;
  professionalAdherence: number;
  reportingAdherence: number;

  // Performance tracking
  insuranceMetrics: string[];
  riskMetrics: string[];
  financialMetrics: string[];
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
  professionalEngagement: number;
  clientEngagement: number;
  insurerEngagement: number;
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
  operationalHealth: number;
  professionalHealth: number;
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
  finalRecommendation: 'Conservative Approach' | 'Balanced Strategy' | 'Aggressive Optimization' | 'Comprehensive Review';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  professionalPracticeEducation: string[];
  liabilityPreventionEducation: string[];
  riskMitigationEducation: string[];
  businessDevelopmentEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  premiumAttribution: number;
  coverageAttribution: number;
  riskAttribution: number;
  marketAttribution: number;

  // Stress testing results
  stressTestResults: {
    majorClaim: number;
    rateIncrease: number;
    regulatoryChange: number;
    marketHardening: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    selfInsurance: number;
    captiveInsurance: number;
    riskRetention: number;
    mutualInsurance: number;
  };

  // Portfolio impact
  insurancePortfolioOptimization: number;
  riskPortfolioEnhancement: number;
  financialPortfolioStability: number;
  professionalPortfolioProtection: number;

  // Legacy value
  insuranceLegacy: number;
  businessLegacy: number;
  professionalLegacy: number;
  lastingLegacy: number;

  // Innovation impact
  technologyAdvancement: number;
  processImprovement: number;
  clientService: number;
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
  professionalValue: number;
  reputationalValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}