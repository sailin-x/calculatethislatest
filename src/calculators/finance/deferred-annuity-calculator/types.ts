export interface DeferredAnnuityInputs {
  // Personal information
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  gender: 'Male' | 'Female';

  // Annuity details
  initialInvestment: number;
  monthlyPremium: number;
  premiumPaymentPeriod: number; // Years
  annuityStartAge: number;
  deferralPeriod: number; // Years

  // Annuity type
  annuityType: 'Fixed' | 'Variable' | 'Indexed' | 'Immediate' | 'Longevity';
  payoutType: 'Single Life' | 'Joint Life' | 'Period Certain' | 'Life with Period Certain';
  survivorBenefit: boolean;

  // Investment assumptions
  guaranteedInterestRate: number;
  expectedReturn: number;
  inflationRate: number;
  expenseRatio: number;

  // Financial situation
  annualIncome: number;
  annualExpenses: number;
  currentSavings: number;
  retirementSavings: number;

  // Tax considerations
  taxBracket: number;
  capitalGainsTaxRate: number;
  annuityTaxation: 'LIFO' | 'FIFO' | 'Average';
  qualifiedStatus: boolean;

  // Risk factors
  marketRisk: 'Low' | 'Medium' | 'High';
  longevityRisk: 'Low' | 'Medium' | 'High';
  inflationRisk: 'Low' | 'Medium' | 'High';
  interestRateRisk: 'Low' | 'Medium' | 'High';

  // Analysis options
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Comparative analysis
  compareToImmediateAnnuity: boolean;
  compareToSocialSecurity: boolean;
  compareToPensions: boolean;
  compareToInvestments: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Beneficiary information
  hasBeneficiaries: boolean;
  beneficiaryAge: number;
  beneficiaryRelationship: 'Spouse' | 'Child' | 'Other';

  // Healthcare considerations
  healthcareInflation: number;
  retireeHealthcareCost: number;
  longTermCare: boolean;

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

  // Goal alignment
  primaryGoal: 'Income Security' | 'Legacy Planning' | 'Tax Deferral' | 'Growth';
  secondaryGoal: 'Income Security' | 'Legacy Planning' | 'Tax Deferral' | 'Growth';

  // Behavioral factors
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  timeHorizon: 'Short' | 'Medium' | 'Long';
  liquidityNeeds: 'High' | 'Medium' | 'Low';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  interestRateOutlook: 'Rising' | 'Stable' | 'Falling';
  marketOutlook: 'Bull' | 'Neutral' | 'Bear';

  // Regulatory compliance
  annuityRegulations: boolean;
  taxCompliance: boolean;
  fiduciaryDuty: boolean;

  // Performance tracking
  reviewFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly';

  // Education and communication
  annuityUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  advisorInvolvement: boolean;
  familyInput: boolean;

  // Documentation
  annuityContract: boolean;
  beneficiaryDesignations: boolean;
  taxDocuments: boolean;

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
  annuitizationFlexibility: boolean;
  beneficiaryFlexibility: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    expectedReturn: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    liquidity: 'High' | 'Medium' | 'Low';
  }>;

  // Historical performance
  annuityPerformance: number[];
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
  annuityRegulations: boolean;

  // Market timing
  marketTimingStrategy: 'Buy and Hold' | 'Market Timing' | 'Dollar Cost Averaging';
  entryTiming: string;

  // Professional advice
  financialAdvisor: boolean;
  taxAdvisor: boolean;
  estatePlanningAdvisor: boolean;

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
  annuityUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
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

export interface DeferredAnnuityOutputs {
  // Annuity projections
  projectedValue: number;
  totalPremiums: number;
  accumulatedValue: number;
  yearsToGoal: number;

  // Payment analysis
  monthlyPayment: number;
  annualPayment: number;
  totalPayments: number;
  paymentDuration: number;

  // Investment performance
  compoundAnnualGrowthRate: number;
  riskAdjustedReturn: number;
  volatility: number;
  sharpeRatio: number;

  // Tax benefits
  taxDeferredGrowth: number;
  taxSavings: number;
  afterTaxValue: number;
  taxEfficiency: number;

  // ROI analysis
  returnOnInvestment: number;
  costPerDollarIncome: number;
  annuityEfficiency: number;
  financialLeverage: number;

  // Scenario analysis
  bestCaseProjection: number;
  worstCaseProjection: number;
  baseCaseProjection: number;
  probabilityOfSuccess: number;

  // Comparative analysis
  vsImmediateAnnuity: number;
  vsSocialSecurity: number;
  vsPensions: number;
  vsInvestments: number;

  // Beneficiary analysis
  survivorBenefit: number;
  beneficiaryValue: number;
  estateTaxImpact: number;
  legacyValue: number;

  // Cost analysis
  setupCosts: number;
  annualCosts: number;
  totalCosts: number;
  costEfficiency: number;

  // Liquidity analysis
  liquidityScore: number;
  emergencyAccess: number;
  surrenderCharges: number;
  accessEfficiency: number;

  // Goal alignment
  incomeSecurityAchievement: number;
  legacyPlanningAchievement: number;
  taxDeferralAchievement: number;
  growthAchievement: number;

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
  interestRateDeclineScenario: number;
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
  annualCashFlow: number;
  cumulativeCashFlow: number;
  cashFlowStability: number;
  cashFlowEfficiency: number;

  // Investment allocation
  optimalAllocation: {
    fixedAnnuity: number;
    variableAnnuity: number;
    indexedAnnuity: number;
    cash: number;
  };

  // Rebalancing analysis
  rebalancingEfficiency: number;
  portfolioDrift: number;
  riskRebalancing: number;
  returnOptimization: number;

  // Tax optimization
  taxLossHarvesting: number;
  capitalGainManagement: number;
  deductionOptimization: number;
  taxEfficientStrategy: number;

  // Withdrawal optimization
  systematicWithdrawal: number;
  dynamicWithdrawal: number;
  inflationAdjustedWithdrawal: number;
  taxEfficientWithdrawal: number;

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
  annuitySustainability: number;
  longTermViability: number;
  insuranceCompanyStrength: number;
  sustainableStrategy: number;

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
  beneficiaryValue: number;
  advisorValue: number;
  societyValue: number;

  // Success metrics
  retirementReadiness: number;
  financialEfficiency: number;
  riskManagement: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Strong Implement' | 'Implement' | 'Consider Alternatives' | 'Do Not Implement';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  annuityEducation: string[];
  taxEducation: string[];
  retirementEducation: string[];
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
  taxCompliance: number;
  reportingCompliance: number;

  // Performance tracking
  annuityMetrics: string[];
  paymentMetrics: string[];
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
  beneficiaryEngagement: number;
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
  finalRecommendation: 'Strong Implement Deferred Annuity' | 'Implement Deferred Annuity' | 'Consider Immediate Annuity' | 'Do Not Implement';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  deferredAnnuityEducation: string[];
  retirementPlanningEducation: string[];
  taxAdvantagedEducation: string[];
  implementationEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  premiumAttribution: number;
  investmentAttribution: number;
  taxAttribution: number;
  planningAttribution: number;

  // Stress testing results
  stressTestResults: {
    severeMarketDecline: number;
    highInflation: number;
    lowInterestRates: number;
    healthEmergency: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    immediateAnnuity: number;
    systematicWithdrawal: number;
    bucketStrategy: number;
    guaranteedIncome: number;
  };

  // Portfolio impact
  portfolioDiversification: number;
  portfolioReturnEnhancement: number;
  portfolioRiskReduction: number;
  portfolioEfficiency: number;

  // Legacy value
  intergenerationalWealth: number;
  beneficiarySecurity: number;
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
  incomeValue: number;
  securityValue: number;
  legacyValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}