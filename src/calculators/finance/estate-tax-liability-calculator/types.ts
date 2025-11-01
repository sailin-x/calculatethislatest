export interface EstateTaxLiabilityInputs {
  // Personal information
  currentAge: number;
  lifeExpectancy: number;
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  numberOfChildren: number;
  stateOfResidence: string;

  // Estate value
  totalEstateValue: number;
  realEstateValue: number;
  investmentValue: number;
  businessValue: number;
  retirementAccounts: number;
  lifeInsuranceValue: number;
  personalProperty: number;
  otherAssets: number;

  // Liabilities
  mortgageDebt: number;
  creditCardDebt: number;
  personalLoans: number;
  businessDebt: number;
  otherLiabilities: number;

  // Exemptions and credits
  federalExemption: number;
  stateExemption: number;
  portabilityElection: boolean;
  deceasedSpouseExemption: number;

  // Tax rates
  federalEstateTaxRate: number;
  stateEstateTaxRate: number;
  generationSkippingTaxRate: number;

  // Beneficiaries
  primaryBeneficiaries: Array<{
    name: string;
    relationship: string;
    percentage: number;
    age: number;
  }>;

  // Charitable giving
  charitableBequests: number;
  qualifiedCharities: boolean;

  // Life insurance
  ownedPolicies: number;
  beneficiaryDesignations: boolean;
  irrevocableTrust: boolean;

  // Retirement accounts
  iraValue: number;
  four01kValue: number;
  beneficiaryDesignations: boolean;

  // Business interests
  businessOwnership: number;
  successionPlan: boolean;
  keyPersonInsurance: boolean;

  // Real estate
  primaryResidence: number;
  investmentProperties: number;
  vacationProperties: number;

  // Trusts and planning
  revocableTrust: boolean;
  irrevocableTrust: boolean;
  lifeInsuranceTrust: boolean;
  charitableRemainderTrust: boolean;

  // Annual exclusions
  annualGiftTaxExclusion: number;
  lifetimeExemptionUsed: number;

  // Generation skipping
  generationSkippingTransfer: boolean;
  gstExemptionUsed: number;

  // International assets
  foreignAssets: number;
  foreignTaxCredits: number;

  // Special valuations
  minorityDiscount: number;
  marketabilityDiscount: number;

  // Administrative costs
  executorFees: number;
  attorneyFees: number;
  accountingFees: number;

  // Analysis options
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Comparative analysis
  compareToWills: boolean;
  compareToTrusts: boolean;
  compareToLifeInsurance: boolean;
  compareToGifting: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Family information
  survivingSpouse: boolean;
  minorChildren: boolean;
  specialNeedsBeneficiaries: boolean;

  // Goal alignment
  primaryGoal: 'Minimize Taxes' | 'Asset Protection' | 'Legacy Planning' | 'Family Harmony';
  secondaryGoal: 'Minimize Taxes' | 'Asset Protection' | 'Legacy Planning' | 'Family Harmony';

  // Behavioral factors
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  familyDynamics: 'Harmonious' | 'Complex' | 'Challenging';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  taxLawOutlook: 'Stable' | 'Changing' | 'Uncertain';

  // Regulatory compliance
  estateTaxLaws: boolean;
  fiduciaryDuty: boolean;
  reportingRequirements: boolean;

  // Performance tracking
  reviewFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly';

  // Education and communication
  estatePlanningKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  familyCommunication: boolean;
  beneficiaryEducation: boolean;

  // Documentation
  will: boolean;
  trustDocuments: boolean;
  beneficiaryDesignations: boolean;

  // Timeline
  implementationTimeframe: number; // Months
  reviewDate: string;

  // Contingency planning
  backupStrategy: string;
  successionPlanning: boolean;

  // Quality of life
  familySatisfaction: 'High' | 'Medium' | 'Low';
  peaceOfMind: 'High' | 'Medium' | 'Low';
  legacyPreservation: 'High' | 'Medium' | 'Low';

  // Future flexibility
  estateModification: boolean;
  beneficiaryChanges: boolean;
  assetReallocation: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    taxSavings: number;
    complexity: 'Low' | 'Medium' | 'High';
    cost: number;
  }>;

  // Historical performance
  estateGrowth: number[];
  taxLawChanges: string[];
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
  estatePlanningSoftware: boolean;

  // Regulatory changes
  pendingTaxReform: boolean;
  estateTaxChanges: boolean;

  // Market timing
  assetTransferTiming: 'Immediate' | 'Staged' | 'At Death';
  giftingStrategy: string;

  // Professional advice
  estateAttorney: boolean;
  taxAdvisor: boolean;
  financialPlanner: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  familyConsensus: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  familyAgreement: 'High' | 'Medium' | 'Low';
  emotionalPreparedness: 'High' | 'Medium' | 'Low';

  // Financial readiness
  liquidityPosition: number;
  cashReserves: number;
  insuranceCoverage: number;

  // Knowledge assessment
  estateTaxUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  planningUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  taxUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  spouseSupport: boolean;
  familySupport: boolean;
  professionalSupport: boolean;
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
  fiveYearVision: string;
  tenYearVision: string;
  legacyVision: string;

  // Values alignment
  personalValues: string[];
  familyValues: string[];
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

export interface EstateTaxLiabilityOutputs {
  // Tax calculations
  federalEstateTax: number;
  stateEstateTax: number;
  totalEstateTax: number;
  generationSkippingTax: number;

  // Net estate value
  grossEstateValue: number;
  totalLiabilities: number;
  netEstateValue: number;
  taxableEstate: number;

  // Exemptions and credits
  federalExemptionUsed: number;
  stateExemptionUsed: number;
  totalExemptions: number;
  remainingExemption: number;

  // Beneficiary distributions
  beneficiaryShares: Array<{
    name: string;
    grossAmount: number;
    taxAmount: number;
    netAmount: number;
  }>;

  // Charitable deductions
  charitableDeduction: number;
  taxSavingsFromCharity: number;

  // Administrative costs
  totalAdministrativeCosts: number;
  percentageOfEstate: number;

  // Asset analysis
  assetAllocation: {
    realEstate: number;
    investments: number;
    business: number;
    retirement: number;
    insurance: number;
    other: number;
  };

  // Tax efficiency
  taxEfficiencyRatio: number;
  effectiveTaxRate: number;
  taxSavingsOpportunities: number;

  // Scenario analysis
  bestCaseTax: number;
  worstCaseTax: number;
  baseCaseTax: number;
  probabilityOfTax: number;

  // Comparative analysis
  vsWills: number;
  vsTrusts: number;
  vsLifeInsurance: number;
  vsGifting: number;

  // Risk analysis
  taxRisk: number;
  valuationRisk: number;
  regulatoryRisk: number;
  totalRiskScore: number;

  // Stress testing
  marketCrashScenario: number;
  taxLawChangeScenario: number;
  valuationDisputeScenario: number;
  familyDisputeScenario: number;

  // Sensitivity analysis
  sensitivityToValue: number;
  sensitivityToExemptions: number;
  sensitivityToRates: number;
  sensitivityToCharity: number;

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
  year5Projection: number;
  year10Projection: number;
  year20Projection: number;
  year30Projection: number;

  // Family impact
  familyTaxBurden: number;
  beneficiaryImpact: number;
  generationalImpact: number;
  overallFamilyWellbeing: number;

  // Regulatory compliance
  federalCompliance: number;
  stateCompliance: number;
  fiduciaryCompliance: number;
  overallCompliance: number;

  // Performance attribution
  assetEffect: number;
  exemptionEffect: number;
  planningEffect: number;
  taxEffect: number;

  // Sustainability analysis
  estateSustainability: number;
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
  ageDistribution: number;
  beneficiaryDistribution: number;
  assetDistribution: number;
  taxDistribution: number;

  // Economic analysis
  businessCycleSensitivity: number;
  interestRateSensitivity: number;
  inflationSensitivity: number;
  taxLawSensitivity: number;

  // Geographic analysis
  stateTaxOptimization: number;
  jurisdictionComparison: number;
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
  individualSatisfaction: number;
  familySatisfaction: number;
  beneficiarySatisfaction: number;
  advisorSatisfaction: number;

  // Success metrics
  taxMinimization: number;
  estatePreservation: number;
  legacyAchievement: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Implement Comprehensive Estate Plan' | 'Focus on Tax Planning' | 'Consider Asset Protection' | 'Reevaluate Strategy';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  estateTaxEducation: string[];
  planningEducation: string[];
  taxEducation: string[];
  legacyEducation: string[];

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
  estateMetrics: string[];
  taxMetrics: string[];
  beneficiaryMetrics: string[];
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
  individualEngagement: number;
  familyEngagement: number;
  beneficiaryEngagement: number;
  advisorEngagement: number;

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
  finalRecommendation: 'Comprehensive Estate Plan with Trusts' | 'Tax-Efficient Gifting Strategy' | 'Life Insurance Trust Approach' | 'Alternative Planning Methods';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  estateTaxEducation: string[];
  estatePlanningEducation: string[];
  taxOptimizationEducation: string[];
  familyLegacyEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  assetAttribution: number;
  exemptionAttribution: number;
  planningAttribution: number;
  taxAttribution: number;

  // Stress testing results
  stressTestResults: {
    severeMarketDecline: number;
    highEstateTax: number;
    valuationChallenge: number;
    familyConflict: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    annualGifting: number;
    irrevocableTrust: number;
    lifeInsurance: number;
    charitablePlanning: number;
  };

  // Portfolio impact
  estateDiversification: number;
  taxEfficiencyEnhancement: number;
  riskReduction: number;
  legacyOptimization: number;

  // Legacy value
  familyWealthPreservation: number;
  beneficiarySecurity: number;
  societalBenefit: number;
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
  taxValue: number;
  legacyValue: number;
  familyValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}