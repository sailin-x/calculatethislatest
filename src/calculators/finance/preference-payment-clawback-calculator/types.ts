export interface PreferencePaymentClawbackInputs {
  // Debtor information
  debtorType: 'Individual' | 'Corporation' | 'Partnership' | 'LLC' | 'Trust';
  bankruptcyChapter: 'Chapter 7' | 'Chapter 11' | 'Chapter 13' | 'Chapter 15';
  filingDate: string;
  preferencePeriod: number; // Days (usually 90 or 1 year)

  // Creditor information
  creditorType: 'Insider' | 'Non-Insider';
  relationshipToDebtor: 'Family' | 'Business Partner' | 'Supplier' | 'Customer' | 'Lender' | 'Other';
  creditorStatus: 'Secured' | 'Unsecured' | 'Priority' | 'General';

  // Payment details
  paymentAmount: number;
  paymentDate: string;
  paymentMethod: 'Cash' | 'Check' | 'Wire Transfer' | 'ACH' | 'Credit Card' | 'Other';
  paymentPurpose: 'Goods' | 'Services' | 'Loan Repayment' | 'Settlement' | 'Other';

  // Transaction context
  antecedentDebt: boolean;
  contemporaneousExchange: boolean;
  ordinaryCourseOfBusiness: boolean;
  newValueProvided: boolean;

  // Insolvency indicators
  insolvencyTest: 'Balance Sheet' | 'Cash Flow' | 'Unable to Pay Debts';
  insolvencyDate: string;
  assetsVsLiabilities: number;
  cashFlowDeficit: number;

  // Preference defenses
  ordinaryBusinessTerms: boolean;
  subsequentNewCredit: boolean;
  contemporaneousExchange: boolean;
  statutoryExclusion: boolean;

  // Legal jurisdiction
  jurisdiction: string;
  applicableLaw: 'Federal' | 'State' | 'International';
  venue: string;

  // Case complexity
  numberOfCreditors: number;
  numberOfTransactions: number;
  documentAvailability: 'Complete' | 'Partial' | 'Limited' | 'None';
  witnessAvailability: 'Strong' | 'Moderate' | 'Weak' | 'None';

  // Analysis options
  includeEconomicAnalysis: boolean;
  includeLegalAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeSettlementAnalysis: boolean;

  // Comparative analysis
  compareToSimilarCases: boolean;
  compareToIndustryStandards: boolean;
  compareToJurisdictionalAverages: boolean;
  compareToNationalBenchmarks: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Goal alignment
  primaryGoal: 'Maximize Recovery' | 'Minimize Litigation' | 'Set Legal Precedent' | 'Business Relationship Preservation';
  secondaryGoal: 'Maximize Recovery' | 'Minimize Litigation' | 'Set Legal Precedent' | 'Business Relationship Preservation';

  // Behavioral factors
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  negotiationStyle: 'Cooperative' | 'Competitive' | 'Avoidant';
  decisionStyle: 'Analytical' | 'Intuitive' | 'Collaborative';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  bankruptcyClimate: 'Plaintiff Friendly' | 'Defendant Friendly' | 'Neutral';
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';

  // Regulatory compliance
  bankruptcyCodeCompliance: boolean;
  reportingRequirements: boolean;
  fiduciaryDuties: boolean;
  disclosureRequirements: boolean;

  // Performance tracking
  reviewFrequency: 'Weekly' | 'Monthly' | 'Quarterly';
  milestoneTracking: boolean;
  deadlineMonitoring: boolean;

  // Education and communication
  legalKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  bankruptcyKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  stakeholderCommunication: boolean;

  // Documentation
  transactionRecords: boolean;
  financialStatements: boolean;
  legalDocuments: boolean;

  // Timeline
  caseDuration: number; // Months
  statuteOfLimitations: string;

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
  classActionPotential: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    successRate: number;
    timeToResolution: number;
    costEfficiency: 'High' | 'Medium' | 'Low';
  }>;

  // Historical performance
  caseHistory: number[];
  recoveryHistory: number[];
  successRateHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  businessRelationships: string;
  industryPressure: string;
  communityStandards: string;

  // Technological factors
  digitalEvidence: boolean;
  forensicAnalysis: boolean;
  dataAnalytics: boolean;

  // Regulatory changes
  pendingRegulations: boolean;
  legalPrecedents: boolean;

  // Market timing
  litigationClimate: 'Favorable' | 'Unfavorable' | 'Neutral';
  bankruptcyTrends: string;

  // Professional advice
  legalCounsel: boolean;
  financialAdvisor: boolean;
  bankruptcyExpert: boolean;

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
  preferenceLawUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  bankruptcyLawUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  litigationUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  legalTeam: boolean;
  expertWitnesses: boolean;
  clientSupport: boolean;
  professionalNetwork: boolean;

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

export interface PreferencePaymentClawbackOutputs {
  // Recovery valuation
  recoverableAmount: number;
  totalClaimValue: number;
  netRecovery: number;
  recoveryPercentage: number;

  // Preference analysis
  preferenceScore: number;
  avoidanceProbability: number;
  defenseStrength: number;
  legalViability: number;

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
  vsJurisdictionalAverages: number;
  vsNationalBenchmarks: number;

  // Cost analysis
  totalLitigationCosts: number;
  costBenefitRatio: number;
  costPerDollarRecovered: number;
  roiOnLegalFees: number;

  // Efficiency metrics
  caseEfficiency: number;
  timeToResolution: number;
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
  immediateCashFlow: number;
  longTermFinancialHealth: number;
  businessRelationshipImpact: number;
  opportunityCost: number;

  // Regulatory compliance
  complianceScore: number;
  legalCompliance: number;
  bankruptcyCompliance: number;
  fiduciaryCompliance: number;

  // Performance attribution
  legalStrategyAttribution: number;
  evidenceQualityAttribution: number;
  negotiationSkillAttribution: number;
  timingAttribution: number;

  // Sustainability analysis
  caseSustainability: number;
  longTermViability: number;
  precedentSetting: number;
  businessImpact: number;

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
  bankruptcyTrends: number;
  regulatoryClimate: number;
  marketTiming: number;

  // Economic analysis
  economicDamages: number;
  presentValueCalculation: number;
  inflationAdjustment: number;
  economicImpactAssessment: number;

  // Geographic analysis
  jurisdictionalAdvantage: number;
  venueSelection: number;
  localLegalTrends: number;
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
  creditorSatisfaction: number;
  debtorImpact: number;
  trusteeRelations: number;
  courtPerception: number;

  // Success metrics
  recoverySuccess: number;
  legalSuccess: number;
  businessSuccess: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Pursue Clawback' | 'Negotiate Settlement' | 'Drop Claim' | 'Alternative Resolution';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  preferenceLawEducation: string[];
  bankruptcyLawEducation: string[];
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
  bankruptcyTrends: string[];
  evolutionPotential: string[];

  // Action items
  immediateActions: string[];
  shortTermPlanning: string[];
  longTermStrategy: string[];
  monitoringRequirements: string[];

  // Compliance monitoring
  regulatoryAdherence: number;
  legalAdherence: number;
  bankruptcyAdherence: number;
  reportingAdherence: number;

  // Performance tracking
  caseMetrics: string[];
  recoveryMetrics: string[];
  legalMetrics: string[];
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
  creditorEngagement: number;
  legalTeamEngagement: number;
  trusteeEngagement: number;
  courtEngagement: number;

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
  finalRecommendation: 'Aggressive Pursuit' | 'Conservative Approach' | 'Strategic Negotiation' | 'Strategic Withdrawal';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  bankruptcyLawEducation: string[];
  preferenceActionsEducation: string[];
  creditorRightsEducation: string[];
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
    unfavorableRuling: number;
    regulatoryChanges: number;
    debtorBankruptcy: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    mediation: number;
    arbitration: number;
    settlement: number;
    administrativeClaim: number;
  };

  // Portfolio impact
  recoveryPortfolioOptimization: number;
  legalPortfolioEnhancement: number;
  riskPortfolioReduction: number;
  creditorPortfolioContribution: number;

  // Legacy value
  legalLegacy: number;
  recoveryLegacy: number;
  businessLegacy: number;
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
  legalValue: number;
  strategicValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}