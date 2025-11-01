export interface BadFaithInsuranceClaimInputs {
  // Claim details
  claimAmount: number;
  policyLimit: number;
  claimType: 'Property Damage' | 'Bodily Injury' | 'Business Interruption' | 'Medical Payments' | 'Other';
  claimComplexity: 'Simple' | 'Moderate' | 'Complex' | 'Highly Complex';

  // Insurance company information
  insurerSize: 'Small Regional' | 'Large Regional' | 'National' | 'Global';
  insurerFinancialStrength: 'A++' | 'A+' | 'A' | 'A-' | 'B++' | 'B+' | 'B' | 'B-' | 'C++' | 'C+' | 'C' | 'C-' | 'D' | 'E' | 'F';
  insurerReputation: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Terrible';

  // Policy details
  policyType: 'Auto' | 'Home' | 'Business' | 'Life' | 'Health' | 'Liability' | 'Other';
  policyPremium: number;
  policyDuration: number; // Years
  claimsHistory: 'Clean' | 'Minor Claims' | 'Moderate Claims' | 'Poor History';

  // Claim handling
  initialResponseTime: number; // Days
  adjusterExperience: 'Novice' | 'Experienced' | 'Expert';
  investigationThoroughness: 'Thorough' | 'Adequate' | 'Inadequate' | 'Superficial';
  documentationQuality: 'Excellent' | 'Good' | 'Poor' | 'Missing';

  // Bad faith indicators
  unreasonableDelay: boolean;
  inadequateInvestigation: boolean;
  lowballSettlement: boolean;
  policyMisinterpretation: boolean;
  unfairDenial: boolean;
  failureToCommunicate: boolean;
  discriminatoryPractices: boolean;
  violationOfStatute: boolean;

  // Legal factors
  jurisdiction: string;
  applicableLaws: string[];
  statuteOfLimitations: number; // Days remaining
  classActionPotential: boolean;

  // Damages assessment
  economicDamages: number;
  nonEconomicDamages: number;
  punitiveDamages: number;
  attorneyFees: number;
  courtCosts: number;

  // Evidence strength
  witnessTestimony: 'Strong' | 'Moderate' | 'Weak' | 'None';
  documentaryEvidence: 'Comprehensive' | 'Adequate' | 'Limited' | 'None';
  expertTestimony: 'Strong' | 'Moderate' | 'Weak' | 'None';
  photographicEvidence: 'Extensive' | 'Moderate' | 'Limited' | 'None';

  // Case complexity
  numberOfParties: number;
  legalPrecedents: 'Favorable' | 'Neutral' | 'Unfavorable';
  juryAppeal: 'High' | 'Medium' | 'Low';
  mediaAttention: 'High' | 'Medium' | 'Low';

  // Analysis options
  includeEconomicAnalysis: boolean;
  includeLegalAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeSettlementAnalysis: boolean;

  // Comparative analysis
  compareToSimilarCases: boolean;
  compareToIndustryStandards: boolean;
  compareToStateAverages: boolean;
  compareToNationalBenchmarks: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Goal alignment
  primaryGoal: 'Fair Compensation' | 'Policyholder Rights' | 'Industry Accountability' | 'Legal Precedent';
  secondaryGoal: 'Fair Compensation' | 'Policyholder Rights' | 'Industry Accountability' | 'Legal Precedent';

  // Behavioral factors
  insurerMotivation: 'Profit Maximization' | 'Risk Management' | 'Customer Service' | 'Legal Compliance';
  claimantMotivation: 'Fair Recovery' | 'Maximum Recovery' | 'Principle' | 'Revenge';
  attorneyMotivation: 'Client Service' | 'Financial Gain' | 'Reputation' | 'Justice';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  insuranceMarketConditions: 'Soft' | 'Hard' | 'Normal';
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';

  // Regulatory compliance
  insuranceRegulations: boolean;
  consumerProtectionLaws: boolean;
  unfairTradePractices: boolean;
  fiduciaryDuties: boolean;

  // Performance tracking
  reviewFrequency: 'Weekly' | 'Monthly' | 'Quarterly';
  milestoneTracking: boolean;
  deadlineMonitoring: boolean;

  // Education and communication
  legalKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  insuranceKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  stakeholderCommunication: boolean;

  // Documentation
  claimFile: boolean;
  correspondence: boolean;
  legalDocuments: boolean;

  // Timeline
  caseDuration: number; // Months
  settlementDeadline: string;

  // Contingency planning
  appealStrategy: boolean;
  alternativeDisputeResolution: boolean;

  // Quality of life
  stressLevel: 'High' | 'Medium' | 'Low';
  timeCommitment: 'High' | 'Medium' | 'Low';
  financialImpact: 'Severe' | 'Moderate' | 'Minimal';

  // Future flexibility
  settlementOptions: boolean;
  appealRights: boolean;
  classActionJoinder: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    successRate: number;
    timeToResolution: number;
    costEfficiency: 'High' | 'Medium' | 'Low';
  }>;

  // Historical performance
  caseHistory: number[];
  settlementHistory: number[];
  successRateHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  publicOpinion: string;
  industryPressure: string;
  regulatoryPressure: string;

  // Technological factors
  digitalEvidence: boolean;
  forensicAnalysis: boolean;
  dataAnalytics: boolean;

  // Regulatory changes
  pendingRegulations: boolean;
  legalPrecedents: boolean;

  // Market timing
  litigationClimate: 'Plaintiff Friendly' | 'Defendant Friendly' | 'Neutral';
  insuranceCycle: string;

  // Professional advice
  legalCounsel: boolean;
  insuranceExpert: boolean;
  economicExpert: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  independentAnalysis: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  stressTolerance: 'High' | 'Medium' | 'Low';
  patienceLevel: 'High' | 'Medium' | 'Low';

  // Financial readiness
  litigationBudget: number;
  contingencyFee: boolean;
  costBenefitRatio: number;

  // Knowledge assessment
  badFaithLawUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  insuranceLawUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  litigationUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  legalTeam: boolean;
  expertWitnesses: boolean;
  clientSupport: boolean;
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
  oneYearVision: string;
  threeYearVision: string;
  fiveYearVision: string;

  // Values alignment
  personalValues: string[];
  legalValues: string[];
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

export interface BadFaithInsuranceClaimOutputs {
  // Claim valuation
  totalClaimValue: number;
  compensatoryDamages: number;
  punitiveDamages: number;
  attorneyFees: number;
  totalRecovery: number;

  // Bad faith assessment
  badFaithScore: number;
  badFaithProbability: number;
  badFaithSeverity: 'Minor' | 'Moderate' | 'Severe' | 'Extreme';
  violationTypes: string[];

  // Legal analysis
  caseStrength: number;
  winningProbability: number;
  settlementRange: { min: number; max: number };
  litigationCosts: number;

  // Risk analysis
  totalRiskScore: number;
  legalRisk: number;
  financialRisk: number;
  reputationalRisk: number;

  // Scenario analysis
  bestCaseRecovery: number;
  worstCaseRecovery: number;
  baseCaseRecovery: number;
  probabilityOfSuccess: number;

  // Comparative analysis
  vsSimilarCases: number;
  vsIndustryStandards: number;
  vsStateAverages: number;
  vsNationalBenchmarks: number;

  // Cost analysis
  totalLitigationCosts: number;
  costBenefitRatio: number;
  netRecovery: number;
  roiOnLegalFees: number;

  // Efficiency metrics
  caseEfficiency: number;
  timeToResolution: number;
  costPerDollarRecovered: number;
  successEfficiency: number;

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
  insurancePremiumImpact: number;
  creditImpact: number;

  // Regulatory compliance
  regulatoryCompliance: number;
  legalCompliance: number;
  ethicalCompliance: number;
  professionalStandards: number;

  // Performance attribution
  legalStrategyAttribution: number;
  evidenceQualityAttribution: number;
  expertTestimonyAttribution: number;
  negotiationSkillAttribution: number;

  // Sustainability analysis
  caseSustainability: number;
  longTermViability: number;
  precedentSetting: number;
  industryImpact: number;

  // Technology integration
  digitalEvidenceValue: number;
  forensicAnalysisBenefit: number;
  dataAnalyticsAdvantage: number;
  technologyEfficiency: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  psychologicalWellness: number;

  // Market analysis
  litigationMarketPosition: number;
  insuranceIndustryTrends: number;
  regulatoryClimate: number;
  marketTiming: number;

  // Economic analysis
  economicDamages: number;
  presentValueCalculation: number;
  inflationAdjustment: number;
  economicLossAssessment: number;

  // Geographic analysis
  jurisdictionalAdvantage: number;
  venueSelection: number;
  localJuryTrends: number;
  geographicRiskFactors: number;

  // Innovation opportunities
  legalInnovation: number;
  technologyInnovation: number;
  processInnovation: number;
  strategyInnovation: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  claimantSatisfaction: number;
  attorneySatisfaction: number;
  insurerAccountability: number;
  publicInterest: number;

  // Success metrics
  caseSuccess: number;
  justiceAchievement: number;
  industryReform: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Pursue Litigation' | 'Negotiate Settlement' | 'Drop Claim' | 'Alternative Resolution';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  badFaithLawEducation: string[];
  insuranceLawEducation: string[];
  litigationStrategyEducation: string[];
  riskManagementEducation: string[];

  // Success metrics
  goalAchievement: number;
  strategyEffectiveness: number;
  implementationSuccess: number;
  overallAchievement: number;

  // Future considerations
  regulatoryOutlook: string[];
  legalTrends: string[];
  insuranceTrends: string[];
  evolutionPotential: string[];

  // Action items
  immediateActions: string[];
  shortTermPlanning: string[];
  longTermStrategy: string[];
  monitoringRequirements: string[];

  // Compliance monitoring
  regulatoryAdherence: number;
  legalAdherence: number;
  ethicalAdherence: number;
  professionalAdherence: number;

  // Performance tracking
  caseMetrics: string[];
  legalMetrics: string[];
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
  claimantEngagement: number;
  attorneyEngagement: number;
  expertEngagement: number;
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
  legalHealth: number;
  personalHealth: number;
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
  finalRecommendation: 'Full Litigation Pursuit' | 'Aggressive Negotiation' | 'Conservative Approach' | 'Strategic Withdrawal';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  insuranceFraudEducation: string[];
  consumerRightsEducation: string[];
  legalSystemEducation: string[];
  decisionMakingEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  legalAttribution: number;
  evidenceAttribution: number;
  strategyAttribution: number;
  executionAttribution: number;

  // Stress testing results
  stressTestResults: {
    prolongedLitigation: number;
    unfavorableJury: number;
    regulatoryChanges: number;
    insurerBankruptcy: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    mediation: number;
    arbitration: number;
    classAction: number;
    regulatoryComplaint: number;
  };

  // Portfolio impact
  legalPortfolioOptimization: number;
  financialPortfolioEnhancement: number;
  riskPortfolioReduction: number;
  justicePortfolioContribution: number;

  // Legacy value
  legalLegacy: number;
  justiceLegacy: number;
  industryLegacy: number;
  lastingLegacy: number;

  // Innovation impact
  legalInnovation: number;
  technologyImprovement: number;
  processEnhancement: number;
  systemicChange: number;

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
  justiceValue: number;
  precedentValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}