export interface DynastyTrustGrowthEstimatorInputs {
  // Trust information
  trustType: 'Dynasty Trust' | 'Perpetual Trust' | 'Generation-Skipping Trust';
  stateOfDomicile: string;
  trustEstablishmentDate: string;
  ruleAgainstPerpetuities: boolean;

  // Initial funding
  initialContribution: number;
  annualContributions: number;
  contributionFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly' | 'Monthly';
  contributionDuration: number; // Years

  // Beneficiary information
  numberOfGenerations: number;
  generationLifespan: number; // Years
  beneficiaryAges: number[];
  numberOfBeneficiariesPerGeneration: number[];

  // Investment assumptions
  expectedReturn: number;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  inflationRate: number;
  expenseRatio: number;

  // Tax considerations
  estateTaxRate: number;
  generationSkippingTaxRate: number;
  incomeTaxRate: number;
  capitalGainsTaxRate: number;

  // Trust structure
  trusteeType: 'Individual' | 'Corporate' | 'Family Office';
  trustProtector: boolean;
  decantingProvision: boolean;
  assetProtection: boolean;

  // Distribution rules
  distributionFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly' | 'Monthly';
  distributionAmount: number;
  distributionPercentage: number;
  discretionaryDistributions: boolean;

  // Asset allocation
  currentAllocation: {
    stocks: number;
    bonds: number;
    realEstate: number;
    privateEquity: number;
    cash: number;
    alternatives: number;
  };

  // Risk factors
  marketRisk: 'Low' | 'Medium' | 'High';
  longevityRisk: 'Low' | 'Medium' | 'High';
  regulatoryRisk: 'Low' | 'Medium' | 'High';
  inflationRisk: 'Low' | 'Medium' | 'High';

  // Analysis options
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Comparative analysis
  compareToWill: boolean;
  compareToRevocableTrust: boolean;
  compareToIrrevocableTrust: boolean;
  compareToFoundation: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Family information
  familySize: number;
  numberOfChildren: number;
  numberOfGrandchildren: number;
  familyWealth: number;

  // Goal alignment
  primaryGoal: 'Wealth Preservation' | 'Legacy Planning' | 'Tax Efficiency' | 'Asset Protection';
  secondaryGoal: 'Wealth Preservation' | 'Legacy Planning' | 'Tax Efficiency' | 'Asset Protection';

  // Behavioral factors
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  timeHorizon: 'Multi-Generational' | 'Long-Term' | 'Perpetual';
  familyHarmony: 'High' | 'Medium' | 'Low';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  taxLawOutlook: 'Stable' | 'Changing' | 'Uncertain';
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';

  // Regulatory compliance
  stateTrustLaws: boolean;
  federalTaxCompliance: boolean;
  fiduciaryDuty: boolean;

  // Performance tracking
  reviewFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly';

  // Education and communication
  trustUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  familyEducation: boolean;
  beneficiaryCommunication: boolean;

  // Documentation
  trustDocument: boolean;
  lettersOfWishes: boolean;
  familyGovernance: boolean;

  // Timeline
  implementationTimeframe: number; // Months
  reviewDate: string;

  // Contingency planning
  backupStrategy: string;
  successionPlanning: boolean;

  // Quality of life
  familySatisfaction: 'High' | 'Medium' | 'Low';
  legacyPreservation: 'High' | 'Medium' | 'Low';
  wealthTransferEfficiency: 'High' | 'Medium' | 'Low';

  // Future flexibility
  trustModification: boolean;
  jurisdictionChange: boolean;
  assetReallocation: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    expectedReturn: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    taxEfficiency: number;
  }>;

  // Historical performance
  trustPerformance: number[];
  marketPerformance: number[];
  familyWealthHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  familyExpectations: string;
  beneficiaryNeeds: string;
  societalImpact: string;

  // Technological factors
  digitalAssets: boolean;
  onlineBanking: boolean;
  automatedReporting: boolean;

  // Regulatory changes
  pendingTaxReform: boolean;
  trustLawChanges: boolean;

  // Market timing
  contributionTiming: 'Lump Sum' | 'Staged' | 'Annual';
  distributionTiming: string;

  // Professional advice
  estateAttorney: boolean;
  taxAdvisor: boolean;
  investmentAdvisor: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  familyConsensus: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  familyAgreement: 'High' | 'Medium' | 'Low';
  emotionalPreparedness: 'High' | 'Medium' | 'Low';

  // Financial readiness
  fundingReadiness: number;
  liquidityPosition: 'High' | 'Medium' | 'Low';
  cashFlowStability: 'High' | 'Medium' | 'Low';

  // Knowledge assessment
  estatePlanningUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  taxUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  trustUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  familySupport: boolean;
  professionalSupport: boolean;
  advisorSupport: boolean;
  communitySupport: boolean;

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
  fiveGenerationVision: string;
  tenGenerationVision: string;
  perpetualVision: string;

  // Values alignment
  familyValues: string[];
  legacyValues: string[];
  decisionAlignment: number;

  // Mindfulness and reflection
  meditationPractice: boolean;
  journaling: boolean;
  reflectionTime: number;

  // External validation
  peerReview: boolean;
  expertValidation: boolean;
  legalValidation: boolean;

  // Final checklist
  allFactorsConsidered: boolean;
  familyConsensusAchieved: boolean;
  professionalAdviceObtained: boolean;
  documentationComplete: boolean;
}

export interface DynastyTrustGrowthEstimatorOutputs {
  // Trust projections
  projectedValue: number;
  totalContributions: number;
  investmentGrowth: number;
  generationsCovered: number;

  // Generation analysis
  generation1Value: number;
  generation2Value: number;
  generation3Value: number;
  generation4Value: number;
  generation5Value: number;

  // Tax savings
  estateTaxSavings: number;
  generationSkippingTaxSavings: number;
  totalTaxSavings: number;
  taxEfficiency: number;

  // Distribution analysis
  annualDistributions: number;
  cumulativeDistributions: number;
  distributionEfficiency: number;
  beneficiarySatisfaction: number;

  // Investment performance
  compoundAnnualGrowthRate: number;
  riskAdjustedReturn: number;
  volatility: number;
  sharpeRatio: number;

  // ROI analysis
  returnOnInvestment: number;
  costPerDollarPreserved: number;
  legacyEfficiency: number;
  wealthTransferLeverage: number;

  // Scenario analysis
  bestCaseProjection: number;
  worstCaseProjection: number;
  baseCaseProjection: number;
  probabilityOfSuccess: number;

  // Comparative analysis
  vsWill: number;
  vsRevocableTrust: number;
  vsIrrevocableTrust: number;
  vsFoundation: number;

  // Risk analysis
  trustRisk: number;
  regulatoryRisk: number;
  familyRisk: number;
  totalRiskScore: number;

  // Stress testing
  marketCrashScenario: number;
  taxLawChangeScenario: number;
  familyDisputeScenario: number;
  regulatoryChangeScenario: number;

  // Sensitivity analysis
  sensitivityToReturns: number;
  sensitivityToInflation: number;
  sensitivityToTaxes: number;
  sensitivityToGenerations: number;

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

  // Long-term projections
  year50Projection: number;
  year100Projection: number;
  year200Projection: number;
  year500Projection: number;

  // Family impact
  familyWealthPreservation: number;
  intergenerationalEquity: number;
  familyLegacyStrength: number;
  dynastySustainability: number;

  // Regulatory compliance
  stateLawCompliance: number;
  federalTaxCompliance: number;
  fiduciaryCompliance: number;
  overallCompliance: number;

  // Performance attribution
  contributionEffect: number;
  investmentEffect: number;
  taxEffect: number;
  distributionEffect: number;

  // Sustainability analysis
  trustSustainability: number;
  longTermViability: number;
  familyCommitment: number;
  sustainableStrategy: number;

  // Technology integration
  digitalTools: number;
  automatedReporting: number;
  onlineAccess: number;
  mobileApps: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  familyWellness: number;

  // Demographic analysis
  generationDistribution: number;
  beneficiaryDistribution: number;
  wealthDistribution: number;
  legacyDistribution: number;

  // Economic analysis
  businessCycleSensitivity: number;
  interestRateSensitivity: number;
  inflationSensitivity: number;
  taxLawSensitivity: number;

  // Geographic analysis
  jurisdictionOptimization: number;
  stateTaxBenefits: number;
  regulatoryAdvantages: number;
  geographicEfficiency: number;

  // Innovation opportunities
  fintechIntegration: number;
  blockchainApplications: number;
  aiPersonalization: number;
  predictiveAnalytics: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  grantorSatisfaction: number;
  beneficiarySatisfaction: number;
  trusteeSatisfaction: number;
  familySatisfaction: number;

  // Success metrics
  wealthPreservation: number;
  legacyAchievement: number;
  taxEfficiency: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Strong Implement Dynasty Trust' | 'Implement Dynasty Trust' | 'Consider Alternatives' | 'Do Not Implement';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  dynastyTrustEducation: string[];
  estatePlanningEducation: string[];
  taxEducation: string[];
  planningEducation: string[];

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
  fiduciaryCompliance: number;
  reportingCompliance: number;

  // Performance tracking
  trustMetrics: string[];
  familyMetrics: string[];
  legacyMetrics: string[];
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
  grantorEngagement: number;
  beneficiaryEngagement: number;
  trusteeEngagement: number;
  familyEngagement: number;

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
  familyHealth: number;
  legacyHealth: number;
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
  finalRecommendation: 'Establish Dynasty Trust' | 'Consider Perpetual Trust' | 'Focus on Generation-Skipping' | 'Alternative Strategy';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  dynastyTrustEducation: string[];
  estatePlanningEducation: string[];
  taxOptimizationEducation: string[];
  familyLegacyEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  contributionAttribution: number;
  investmentAttribution: number;
  taxAttribution: number;
  planningAttribution: number;

  // Stress testing results
  stressTestResults: {
    severeMarketDecline: number;
    highEstateTaxes: number;
    familyConflict: number;
    regulatoryOverhaul: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    revocableTrust: number;
    irrevocableTrust: number;
    foundation: number;
    directBequests: number;
  };

  // Portfolio impact
  portfolioDiversification: number;
  portfolioReturnEnhancement: number;
  portfolioRiskReduction: number;
  portfolioEfficiency: number;

  // Legacy value
  generationalWealth: number;
  familyLegacy: number;
  societalImpact: number;
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
  wealthValue: number;
  legacyValue: number;
  familyValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}