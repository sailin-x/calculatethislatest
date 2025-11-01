export interface DefinedBenefitPlanInputs {
  // Personal information
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  gender: 'Male' | 'Female';

  // Plan details
  planType: 'Traditional DB' | 'Cash Balance' | 'Hybrid';
  vestingSchedule: 'Immediate' | 'Graded' | 'Cliff';
  benefitFormula: 'Final Average Pay' | 'Career Average' | 'Flat Benefit';
  benefitMultiplier: number;

  // Compensation details
  currentSalary: number;
  finalAverageSalary: number;
  yearsOfService: number;
  expectedYearsOfService: number;

  // Plan funding
  fundingStatus: 'Overfunded' | 'Fully Funded' | 'Underfunded';
  fundingRatio: number;
  employerContribution: number;
  employeeContribution: number;

  // Investment assumptions
  expectedReturn: number;
  discountRate: number;
  inflationRate: number;
  salaryGrowthRate: number;

  // Financial situation
  annualIncome: number;
  annualExpenses: number;
  currentSavings: number;
  otherRetirementSavings: number;

  // Tax considerations
  taxBracket: number;
  marginalTaxRate: number;
  lumpSumTaxRate: number;
  qualifiedStatus: boolean;

  // Risk factors
  marketRisk: 'Low' | 'Medium' | 'High';
  longevityRisk: 'Low' | 'Medium' | 'High';
  employerRisk: 'Low' | 'Medium' | 'High';
  inflationRisk: 'Low' | 'Medium' | 'High';

  // Analysis options
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Comparative analysis
  compareToDefinedContribution: boolean;
  compareToSocialSecurity: boolean;
  compareToPersonalSavings: boolean;
  compareToAnnuities: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Beneficiary information
  hasBeneficiaries: boolean;
  beneficiaryAge: number;
  survivorBenefit: boolean;

  // Pension options
  payoutOptions: 'Single Life' | 'Joint Life' | 'Period Certain' | 'Lump Sum';
  colaAdjustment: boolean;
  earlyRetirementReduction: number;
  lateRetirementIncrease: number;

  // Employer information
  employerSize: 'Small' | 'Medium' | 'Large';
  industry: string;
  unionStatus: boolean;
  pbgcInsurance: boolean;

  // Goal alignment
  primaryGoal: 'Income Security' | 'Legacy Planning' | 'Employer Retention' | 'Tax Efficiency';
  secondaryGoal: 'Income Security' | 'Legacy Planning' | 'Employer Retention' | 'Tax Efficiency';

  // Behavioral factors
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  timeHorizon: 'Short' | 'Medium' | 'Long';
  loyaltyToEmployer: 'High' | 'Medium' | 'Low';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  interestRateOutlook: 'Rising' | 'Stable' | 'Falling';
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';

  // Regulatory compliance
  erisaCompliance: boolean;
  fundingCompliance: boolean;
  reportingCompliance: boolean;

  // Performance tracking
  reviewFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly';

  // Education and communication
  planUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  advisorInvolvement: boolean;
  familyInput: boolean;

  // Documentation
  planDocument: boolean;
  summaryPlanDescription: boolean;
  annualReports: boolean;

  // Timeline
  implementationTimeframe: number; // Months
  decisionDeadline: string;

  // Contingency planning
  backupStrategy: string;
  exitStrategy: string;

  // Quality of life
  stressLevel: 'Low' | 'Medium' | 'High';
  jobSatisfaction: 'High' | 'Medium' | 'Low';
  financialSecurity: 'High' | 'Medium' | 'Low';

  // Future flexibility
  portability: boolean;
  rolloverOptions: boolean;
  withdrawalFlexibility: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    expectedReturn: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    employerCost: number;
  }>;

  // Historical performance
  planPerformance: number[];
  marketPerformance: number[];
  salaryHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  peerBenefits: string;
  industryStandards: string;
  competitivePositioning: string;

  // Technological factors
  onlineAccess: boolean;
  digitalLiteracy: 'High' | 'Medium' | 'Low';
  automatedReporting: boolean;

  // Regulatory changes
  pendingLegislation: boolean;
  erisaUpdates: boolean;

  // Market timing
  contributionTiming: 'Regular' | 'Lump Sum' | 'Matched';
  retirementTiming: string;

  // Professional advice
  financialAdvisor: boolean;
  actuary: boolean;
  legalCounsel: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  independentAnalysis: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  anxietyLevel: 'Low' | 'Medium' | 'High';
  excitementLevel: 'High' | 'Medium' | 'Low';

  // Financial readiness
  emergencyFund: number;
  debtLevel: 'Low' | 'Medium' | 'High';
  cashFlowStability: 'High' | 'Medium' | 'Low';

  // Knowledge assessment
  pensionUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  retirementUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  investmentUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  spouseSupport: boolean;
  familySupport: boolean;
  friendSupport: boolean;
  professionalSupport: boolean;

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
  retirementVision: string;

  // Values alignment
  personalValues: string[];
  employerValues: string[];
  decisionAlignment: number;

  // Mindfulness and reflection
  meditationPractice: boolean;
  journaling: boolean;
  reflectionTime: number;

  // External validation
  peerReview: boolean;
  expertValidation: boolean;
  regulatoryApproval: boolean;

  // Final checklist
  allFactorsConsidered: boolean;
  emotionsManaged: boolean;
  informationComplete: boolean;
  adviceSought: boolean;
}

export interface DefinedBenefitPlanOutputs {
  // Benefit projections
  monthlyBenefit: number;
  annualBenefit: number;
  lumpSumValue: number;
  totalLifetimeBenefit: number;

  // Plan valuation
  vestedBenefit: number;
  accruedBenefit: number;
  projectedBenefit: number;
  benefitAtRetirement: number;

  // Funding analysis
  currentFundingLevel: number;
  requiredFunding: number;
  fundingDeficit: number;
  pbgcGuarantee: number;

  // Cost analysis
  employerCost: number;
  employeeCost: number;
  totalPlanCost: number;
  costEfficiency: number;

  // Investment performance
  planReturn: number;
  benchmarkReturn: number;
  alpha: number;
  trackingError: number;

  // Risk analysis
  planRisk: number;
  employerRisk: number;
  employeeRisk: number;
  totalRiskScore: number;

  // Scenario analysis
  bestCaseProjection: number;
  worstCaseProjection: number;
  baseCaseProjection: number;
  probabilityOfSuccess: number;

  // Comparative analysis
  vsDefinedContribution: number;
  vsSocialSecurity: number;
  vsPersonalSavings: number;
  vsAnnuities: number;

  // Tax analysis
  taxDeferredGrowth: number;
  taxSavings: number;
  lumpSumTaxImpact: number;
  taxEfficiency: number;

  // Replacement ratio
  incomeReplacement: number;
  targetReplacement: number;
  gapAnalysis: number;
  bridgeStrategy: number;

  // Cash flow analysis
  annualCashFlow: number;
  cumulativeCashFlow: number;
  cashFlowStability: number;
  cashFlowEfficiency: number;

  // Sensitivity analysis
  sensitivityToSalary: number;
  sensitivityToService: number;
  sensitivityToReturns: number;
  sensitivityToLongevity: number;

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
  year15Projection: number;
  year20Projection: number;

  // Employer analysis
  employerCommitment: number;
  planSustainability: number;
  competitivePosition: number;
  retentionValue: number;

  // Employee analysis
  employeeValue: number;
  satisfactionLevel: number;
  loyaltyImpact: number;
  productivityEffect: number;

  // Regulatory compliance
  erisaCompliance: number;
  fundingCompliance: number;
  reportingCompliance: number;
  overallCompliance: number;

  // Performance attribution
  salaryGrowthEffect: number;
  serviceTimeEffect: number;
  investmentEffect: number;
  demographicEffect: number;

  // Sustainability analysis
  planSustainability: number;
  longTermViability: number;
  intergenerationalEquity: number;
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
  financialWellness: number;

  // Demographic analysis
  ageDistribution: number;
  serviceDistribution: number;
  salaryDistribution: number;
  retirementDistribution: number;

  // Economic analysis
  businessCycleSensitivity: number;
  interestRateSensitivity: number;
  inflationSensitivity: number;
  unemploymentSensitivity: number;

  // Industry analysis
  industryComparison: number;
  competitiveBenchmarking: number;
  bestPractices: string[];
  innovationOpportunities: string[];

  // Innovation opportunities
  fintechIntegration: number;
  predictiveAnalytics: number;
  personalizedPlanning: number;
  automatedOptimization: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  employeeSatisfaction: number;
  employerSatisfaction: number;
  beneficiarySatisfaction: number;
  regulatorSatisfaction: number;

  // Success metrics
  planPerformance: number;
  participantEngagement: number;
  financialSecurity: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Strong Maintain Plan' | 'Maintain Plan' | 'Consider Changes' | 'Terminate Plan';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  pensionEducation: string[];
  retirementEducation: string[];
  investmentEducation: string[];
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
  benefitMetrics: string[];
  fundingMetrics: string[];
  participantMetrics: string[];
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
  employeeEngagement: number;
  employerEngagement: number;
  beneficiaryEngagement: number;
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
  organizationalHealth: number;
  participantHealth: number;
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
  finalRecommendation: 'Maintain Traditional DB Plan' | 'Convert to Cash Balance' | 'Hybrid Approach' | 'Terminate and Replace';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  definedBenefitEducation: string[];
  retirementPlanningEducation: string[];
  employerResponsibilitiesEducation: string[];
  employeeRightsEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  benefitAttribution: number;
  fundingAttribution: number;
  riskAttribution: number;
  performanceAttribution: number;

  // Stress testing results
  stressTestResults: {
    marketCrash: number;
    interestRateShock: number;
    longevityIncrease: number;
    regulatoryChange: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    cashBalance: number;
    definedContribution: number;
    hybridPlan: number;
    termination: number;
  };

  // Portfolio impact
  planDiversification: number;
  riskDistribution: number;
  returnEnhancement: number;
  costEfficiency: number;

  // Legacy value
  retirementSecurity: number;
  employeeLoyalty: number;
  organizationalStability: number;
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
  retirementValue: number;
  employeeValue: number;
  employerValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}