export interface PropertyTaxAppealSavingsInputs {
  // Property information
  propertyValue: number;
  assessedValue: number;
  propertyType: 'Residential' | 'Commercial' | 'Industrial' | 'Vacant Land' | 'Agricultural';
  propertySize: number; // Square feet or acres
  location: string;
  zipCode: string;

  // Assessment details
  assessmentYear: number;
  taxYear: number;
  taxRate: number; // Per $100 or $1000 of assessed value
  currentTaxes: number;

  // Appeal information
  appealDeadline: string;
  appealType: 'Informal Review' | 'Formal Appeal' | 'Arbitration' | 'Litigation';
  appealBasis: 'Overvaluation' | 'Unequal Assessment' | 'Classification Error' | 'Exemption Denial';

  // Comparable properties
  comparableSales: Array<{
    address: string;
    salePrice: number;
    saleDate: string;
    size: number;
    condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    proximity: number; // Miles from subject property
  }>;

  // Property condition
  propertyCondition: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Needs Repair';
  recentImprovements: Array<{
    description: string;
    cost: number;
    date: string;
  }>;

  // Market analysis
  marketTrends: 'Appreciating' | 'Stable' | 'Declining';
  neighborhoodComparison: 'Better' | 'Similar' | 'Worse';
  marketValueEstimate: number;

  // Assessment ratio
  assessmentRatio: number; // Percentage
  jurisdictionalAverage: number;

  // Appeal costs
  appraisalCost: number;
  attorneyFees: number;
  filingFees: number;
  expertWitnessFees: number;

  // Success probability
  caseStrength: 'Very Strong' | 'Strong' | 'Moderate' | 'Weak' | 'Very Weak';
  assessorCooperation: 'High' | 'Medium' | 'Low';
  evidenceQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';

  // Goal alignment
  primaryGoal: 'Tax Savings' | 'Fair Assessment' | 'Property Value Protection' | 'Investment Optimization';
  secondaryGoal: 'Tax Savings' | 'Fair Assessment' | 'Property Value Protection' | 'Investment Optimization';

  // Behavioral factors
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  timeCommitment: 'Low' | 'Medium' | 'High';
  costSensitivity: 'High' | 'Medium' | 'Low';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  localEconomy: 'Strong' | 'Stable' | 'Weak';
  realEstateMarket: 'Hot' | 'Balanced' | 'Cold';

  // Regulatory compliance
  appealDeadlines: boolean;
  documentationRequirements: boolean;
  proceduralCompliance: boolean;
  jurisdictionalRules: boolean;

  // Performance tracking
  reviewFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly';
  assessmentTracking: boolean;
  taxBillMonitoring: boolean;

  // Education and communication
  taxLawKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  appealProcessKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  stakeholderCommunication: boolean;

  // Documentation
  assessmentNotice: boolean;
  propertyRecords: boolean;
  comparableData: boolean;

  // Timeline
  appealProcessDuration: number; // Months
  potentialRefundPeriod: number; // Years

  // Contingency planning
  alternativeStrategies: boolean;
  backupAppeals: boolean;

  // Quality of life
  stressLevel: 'High' | 'Medium' | 'Low';
  administrativeBurden: 'High' | 'Medium' | 'Low';
  opportunityCost: 'High' | 'Medium' | 'Low';

  // Future flexibility
  reassessmentProtection: boolean;
  ongoingMonitoring: boolean;
  appealReadiness: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    savings: number;
    timeToComplete: number;
    costEfficiency: 'High' | 'Medium' | 'Low';
  }>;

  // Historical performance
  appealHistory: number[];
  successRateHistory: number[];
  savingsHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  neighborhoodPressure: string;
  communityStandards: string;
  localPolitics: string;

  // Technological factors
  onlineAppealSystems: boolean;
  digitalDocumentation: boolean;
  dataAnalytics: boolean;

  // Regulatory changes
  pendingTaxChanges: boolean;
  assessmentReforms: boolean;

  // Market timing
  appealSeason: 'Optimal' | 'Good' | 'Poor';
  assessmentCycle: string;

  // Professional advice
  taxConsultant: boolean;
  propertyAppraiser: boolean;
  taxAttorney: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  independentAnalysis: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  patienceLevel: 'High' | 'Medium' | 'Low';
  persistenceLevel: 'High' | 'Medium' | 'Low';

  // Financial readiness
  budgetAvailability: number;
  cashReserves: number;
  financingOptions: 'High' | 'Medium' | 'Low';

  // Knowledge assessment
  propertyTaxUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  assessmentUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  appealUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  professionalNetwork: boolean;
  communitySupport: boolean;
  expertConsultants: boolean;
  peerSupport: boolean;

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

export interface PropertyTaxAppealSavingsOutputs {
  // Savings analysis
  potentialSavings: number;
  annualSavings: number;
  totalSavings: number;
  savingsPercentage: number;

  // Appeal valuation
  fairMarketValue: number;
  recommendedAssessment: number;
  assessmentReduction: number;
  taxReduction: number;

  // Cost analysis
  totalAppealCosts: number;
  costBenefitRatio: number;
  paybackPeriod: number;
  roiOnAppealCosts: number;

  // Success probability
  appealSuccessProbability: number;
  expectedOutcome: number;
  confidenceInterval: { min: number; max: number };
  riskAdjustedSavings: number;

  // Scenario analysis
  bestCaseSavings: number;
  worstCaseSavings: number;
  baseCaseSavings: number;
  probabilityOfSuccess: number;

  // Comparative analysis
  vsSimilarProperties: number;
  vsNeighborhoodAverage: number;
  vsJurisdictionalAverage: number;
  vsMarketTrends: number;

  // Timeline analysis
  timeToComplete: number;
  refundTimeline: number;
  ongoingSavings: number;
  totalBenefitPeriod: number;

  // Efficiency metrics
  appealEfficiency: number;
  costEfficiency: number;
  timeEfficiency: number;
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
  immediateCashFlow: number;
  longTermFinancialHealth: number;
  propertyValueImpact: number;
  investmentReturns: number;

  // Regulatory compliance
  complianceScore: number;
  proceduralReadiness: number;
  documentationCompliance: number;
  legalCompliance: number;

  // Performance attribution
  strategyAttribution: number;
  evidenceAttribution: number;
  timingAttribution: number;
  executionAttribution: number;

  // Sustainability analysis
  savingsSustainability: number;
  longTermViability: number;
  reassessmentRisk: number;
  marketStability: number;

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
  propertyMarketPosition: number;
  assessmentMarketTrends: number;
  localTaxClimate: number;
  marketTiming: number;

  // Economic analysis
  economicSensitivity: number;
  inflationImpact: number;
  interestRateEffect: number;
  economicCycleSensitivity: number;

  // Geographic analysis
  locationAdvantage: number;
  jurisdictionalFactors: number;
  neighborhoodTrends: number;
  geographicOptimization: number;

  // Innovation opportunities
  appealInnovation: number;
  technologyInnovation: number;
  processInnovation: number;
  strategyInnovation: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  propertyOwnerSatisfaction: number;
  communityImpact: number;
  assessorRelations: number;
  localGovernmentEffect: number;

  // Success metrics
  appealSuccess: number;
  savingsAchievement: number;
  processEfficiency: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Pursue Appeal' | 'Negotiate Reduction' | 'Accept Assessment' | 'Alternative Strategy';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  propertyTaxEducation: string[];
  assessmentEducation: string[];
  appealProcessEducation: string[];
  taxSavingsEducation: string[];

  // Success metrics
  goalAchievement: number;
  strategyEffectiveness: number;
  implementationSuccess: number;
  overallAchievement: number;

  // Future considerations
  regulatoryOutlook: string[];
  marketTrends: string[];
  assessmentTrends: string[];
  evolutionPotential: string[];

  // Action items
  immediateActions: string[];
  shortTermPlanning: string[];
  longTermStrategy: string[];
  monitoringRequirements: string[];

  // Compliance monitoring
  regulatoryAdherence: number;
  proceduralAdherence: number;
  legalAdherence: number;
  reportingAdherence: number;

  // Performance tracking
  appealMetrics: string[];
  savingsMetrics: string[];
  taxMetrics: string[];
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
  propertyOwnerEngagement: number;
  assessorEngagement: number;
  communityEngagement: number;
  expertEngagement: number;

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
  legalHealth: number;
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
  finalRecommendation: 'Aggressive Appeal' | 'Conservative Approach' | 'Strategic Negotiation' | 'Strategic Acceptance';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  propertyAssessmentEducation: string[];
  taxAppealEducation: string[];
  localTaxLawEducation: string[];
  decisionMakingEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  strategyAttribution: number;
  evidenceAttribution: number;
  executionAttribution: number;
  marketAttribution: number;

  // Stress testing results
  stressTestResults: {
    assessmentIncrease: number;
    appealFailure: number;
    regulatoryChanges: number;
    marketDecline: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    informalReview: number;
    professionalAppraisal: number;
    classAction: number;
    legislativeAction: number;
  };

  // Portfolio impact
  propertyPortfolioOptimization: number;
  taxPortfolioEnhancement: number;
  financialPortfolioStability: number;
  investmentPortfolioProtection: number;

  // Legacy value
  taxLegacy: number;
  propertyLegacy: number;
  financialLegacy: number;
  lastingLegacy: number;

  // Innovation impact
  technologyAdvancement: number;
  processImprovement: number;
  assessmentAccuracy: number;
  communityBenefit: number;

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
  propertyValue: number;
  communityValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}