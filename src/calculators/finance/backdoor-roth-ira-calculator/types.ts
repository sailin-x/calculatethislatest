export interface BackdoorRothIraInputs {
  // Personal information
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  filingStatus: 'Single' | 'Married Filing Jointly' | 'Married Filing Separately' | 'Head of Household';

  // Income and tax information
  annualIncome: number;
  taxBracket: number; // Federal tax bracket percentage
  stateTaxRate: number; // State tax rate percentage
  effectiveTaxRate: number;

  // IRA details
  currentTraditionalIraBalance: number;
  currentRothIraBalance: number;
  annualContribution: number;
  contributionFrequency: 'Annual' | 'Monthly' | 'Quarterly';

  // Investment assumptions
  expectedReturn: number; // Annual return percentage
  inflationRate: number;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';

  // Time horizon
  yearsToRetirement: number;
  yearsInRetirement: number;

  // Tax considerations
  capitalGainsTaxRate: number;
  qualifiedDividendTaxRate: number;
  rothConversionTaxRate: number;

  // Beneficiary information
  hasSpouse: boolean;
  spouseAge: number;
  numberOfChildren: number;
  beneficiaryAges: number[];

  // Healthcare costs
  healthcareInflation: number;
  retireeHealthcareCost: number;

  // Social Security
  socialSecurityBenefit: number;
  socialSecurityStartAge: number;

  // Pension benefits
  pensionBenefit: number;
  pensionStartAge: number;

  // Other income sources
  rentalIncome: number;
  dividendIncome: number;
  partTimeWorkIncome: number;

  // Estate planning
  estateSize: number;
  inheritanceGoals: number;
  charitableIntentions: boolean;

  // Risk factors
  marketRisk: 'Low' | 'Medium' | 'High';
  longevityRisk: 'Low' | 'Medium' | 'High';
  inflationRisk: 'Low' | 'Medium' | 'High';
  regulatoryRisk: 'Low' | 'Medium' | 'High';

  // Analysis options
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Monte Carlo inputs
  simulationRuns: number;
  confidenceLevel: number;

  // Comparative analysis
  compareToTraditionalIra: boolean;
  compareTo401k: boolean;
  compareToRoth401k: boolean;

  // Goal alignment
  primaryGoal: 'Tax-Free Growth' | 'Legacy Planning' | 'Income Security' | 'Wealth Preservation';
  secondaryGoal: 'Tax-Free Growth' | 'Legacy Planning' | 'Income Security' | 'Wealth Preservation';

  // Behavioral factors
  emotionalAttachment: 'High' | 'Medium' | 'Low';
  trustInStrategy: 'High' | 'Medium' | 'Low';
  complexityPreference: 'Simple' | 'Moderate' | 'Complex';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  interestRateOutlook: 'Rising' | 'Stable' | 'Falling';
  marketOutlook: 'Bull' | 'Neutral' | 'Bear';

  // Advanced options
  includeLongevityInsurance: boolean;
  includeAnnuityPurchase: boolean;
  includeQualifiedLongevityAnnuityContract: boolean;

  // Regulatory compliance
  incomeLimitsCheck: boolean;
  contributionLimitsCheck: boolean;
  requiredMinimumDistributions: boolean;

  // Performance tracking
  planReviewFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly';
  rebalancingFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly';

  // Education and communication
  participantEducation: boolean;
  financialLiteracy: boolean;
  retirementReadiness: boolean;

  // Support system
  financialAdvisor: boolean;
  taxAdvisor: boolean;
  estatePlanningAdvisor: boolean;

  // Documentation
  taxReturns: boolean;
  accountStatements: boolean;
  beneficiaryDesignations: boolean;

  // Timeline
  implementationTimeframe: number; // Months
  decisionDeadline: string;

  // Contingency planning
  backupStrategy: string;
  exitStrategy: string;

  // Quality of life
  stressLevel: 'Low' | 'Medium' | 'High';
  financialSecurity: 'High' | 'Medium' | 'Low';
  overallWellbeing: 'High' | 'Medium' | 'Low';

  // Future flexibility
  withdrawalFlexibility: boolean;
  contributionFlexibility: boolean;
  investmentFlexibility: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    expectedReturn: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    taxEfficiency: number;
  }>;

  // Historical performance
  iraPerformance: number[];
  marketPerformance: number[];
  personalInvestmentHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  peerDecisions: string;
  familyExpectations: string;
  socialProof: string;

  // Technological factors
  onlineAccess: boolean;
  digitalLiteracy: 'High' | 'Medium' | 'Low';
  roboAdvising: boolean;

  // Regulatory changes
  pendingTaxLawChanges: boolean;
  retirementPlanRegulations: boolean;

  // Market timing
  marketTimingStrategy: 'Buy and Hold' | 'Market Timing' | 'Dollar Cost Averaging';
  entryTiming: string;

  // Professional advice
  fiduciaryAdvice: boolean;
  secondOpinions: boolean;

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
  iraUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  taxUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
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
  financialValues: string[];
  decisionAlignment: number;

  // Mindfulness and reflection
  meditationPractice: boolean;
  journaling: boolean;
  reflectionTime: number;

  // External validation
  peerReview: boolean;
  expertValidation: boolean;
  communityFeedback: boolean;

  // Final checklist
  allFactorsConsidered: boolean;
  emotionsManaged: boolean;
  informationComplete: boolean;
  adviceSought: boolean;
}

export interface BackdoorRothIraOutputs {
  // Contribution analysis
  totalContributions: number;
  rothContributions: number;
  traditionalContributions: number;
  taxDeferredContributions: number;

  // Conversion analysis
  conversionAmount: number;
  conversionTax: number;
  afterTaxConversionValue: number;
  conversionEfficiency: number;

  // Growth projections
  projectedRothBalance: number;
  projectedTraditionalBalance: number;
  totalProjectedValue: number;
  compoundAnnualGrowthRate: number;

  // Tax benefits
  taxSavings: number;
  afterTaxValue: number;
  taxEfficiency: number;
  marginalTaxRate: number;

  // Retirement income
  annualRetirementIncome: number;
  monthlyRetirementIncome: number;
  incomeReplacementRatio: number;
  sustainableWithdrawalRate: number;

  // Risk analysis
  riskAdjustedReturn: number;
  volatility: number;
  sharpeRatio: number;
  maximumDrawdown: number;

  // Scenario analysis
  bestCaseProjection: number;
  worstCaseProjection: number;
  baseCaseProjection: number;
  probabilityOfSuccess: number;

  // Comparative analysis
  vsTraditionalIra: number;
  vs401k: number;
  vsRoth401k: number;
  bestAlternative: string;

  // Beneficiary analysis
  beneficiaryBenefit: number;
  estateTaxImpact: number;
  stretchIraPotential: number;
  generationSkippingEfficiency: number;

  // Cost analysis
  setupCosts: number;
  annualCosts: number;
  totalCosts: number;
  costEfficiency: number;

  // Liquidity analysis
  liquidityScore: number;
  emergencyAccess: number;
  withdrawalPenalties: number;
  accessEfficiency: number;

  // Goal alignment
  taxFreeGrowthAchievement: number;
  legacyPlanningAchievement: number;
  incomeSecurityAchievement: number;
  wealthPreservationAchievement: number;

  // Performance vs benchmarks
  vsMarketReturn: number;
  alpha: number;
  beta: number;
  trackingError: number;

  // Monte Carlo results
  monteCarloMean: number;
  monteCarloMedian: number;
  monteCarloStandardDeviation: number;
  monteCarloConfidenceInterval: [number, number];

  // Stress testing
  marketCrashScenario: number;
  inflationSpikeScenario: number;
  regulatoryChangeScenario: number;
  longevityIncreaseScenario: number;

  // Sensitivity analysis
  sensitivityToReturns: number;
  sensitivityToInflation: number;
  sensitivityToTaxes: number;
  sensitivityToLifeExpectancy: number;

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

  // Cash flow analysis
  annualSavings: number;
  cumulativeSavings: number;
  savingsRate: number;
  savingsEfficiency: number;

  // Investment allocation
  optimalAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
    alternatives: number;
  };

  // Rebalancing analysis
  rebalancingEfficiency: number;
  portfolioDrift: number;
  riskRebalancing: number;
  returnOptimization: number;

  // Tax optimization
  taxLossHarvesting: number;
  capitalGainManagement: number;
  rothConversionOptimization: number;
  qualifiedDividendStrategy: number;

  // Withdrawal optimization
  systematicWithdrawal: number;
  bucketStrategy: number;
  requiredMinimumDistribution: number;
  taxEfficientWithdrawals: number;

  // Healthcare optimization
  medicareOptimization: number;
  supplementalInsurance: number;
  healthSavingsAccount: number;
  longTermCarePlanning: number;

  // Legacy optimization
  estatePlanning: number;
  charitableRemainderTrust: number;
  familyLimitedPartnership: number;
  dynastyTrust: number;

  // Risk management
  downsideProtection: number;
  tailRiskHedging: number;
  portfolioInsurance: number;
  dynamicAssetAllocation: number;

  // Performance attribution
  assetAllocationEffect: number;
  securitySelectionEffect: number;
  marketTimingEffect: number;
  taxEffect: number;

  // Sustainability analysis
  esgIntegration: number;
  impactInvesting: number;
  sustainableFunds: number;
  carbonFootprint: number;

  // Technology integration
  roboAdvising: number;
  digitalTools: number;
  mobileApps: number;
  automationBenefits: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  financialWellness: number;

  // Demographic analysis
  generationalDifferences: number;
  lifeStageOptimization: number;
  careerStagePlanning: number;
  retirementPhaseManagement: number;

  // Economic analysis
  businessCycleSensitivity: number;
  interestRateSensitivity: number;
  inflationSensitivity: number;
  unemploymentSensitivity: number;

  // Global considerations
  currencyDiversification: number;
  internationalExposure: number;
  geopoliticalRisk: number;
  emergingMarkets: number;

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
  individualValue: number;
  familyValue: number;
  advisorValue: number;
  societyValue: number;

  // Success metrics
  retirementReadiness: number;
  financialLiteracy: number;
  planUtilization: number;
  outcomeSatisfaction: number;

  // Recommendation
  investmentRecommendation: 'Strong Implement' | 'Implement' | 'Consider Alternatives' | 'Do Not Implement';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  rothIraEducation: string[];
  backdoorRothEducation: string[];
  taxStrategyEducation: string[];
  retirementPlanningEducation: string[];

  // Success metrics
  goalAchievement: number;
  strategyEffectiveness: number;
  riskManagement: number;
  overallSuccess: number;

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
  contributionMetrics: string[];
  growthMetrics: string[];
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
  individualEngagement: number;
  familyEngagement: number;
  advisorEngagement: number;
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
  emotionalHealth: number;
  socialHealth: number;
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
  finalRecommendation: 'Strong Implement Backdoor Roth' | 'Implement Backdoor Roth' | 'Consider Traditional IRA' | 'Do Not Implement';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  iraEducation: string[];
  rothEducation: string[];
  backdoorStrategyEducation: string[];
  implementationEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  contributionImpact: number;
  investmentImpact: number;
  taxImpact: number;
  planningImpact: number;

  // Stress testing results
  stressTestResults: {
    severeMarketDecline: number;
    highInflation: number;
    taxLawChange: number;
    healthEmergency: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    traditionalIra: number;
    roth401k: number;
    taxableBrokerage: number;
    annuity: number;
  };

  // Portfolio impact
  portfolioDiversification: number;
  portfolioReturnEnhancement: number;
  portfolioRiskReduction: number;
  portfolioEfficiency: number;

  // Legacy value
  intergenerationalWealth: number;
  charitableImpact: number;
  communityBenefit: number;
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
  wealthCreation: number;
  taxValue: number;
  legacyValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}