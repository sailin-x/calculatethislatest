export interface EmergencyFundInputs {
  // Personal information
  currentAge: number;
  householdSize: number;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfDependents: number;

  // Financial situation
  annualIncome: number;
  monthlyIncome: number;
  annualExpenses: number;
  monthlyExpenses: number;
  currentSavings: number;
  currentEmergencyFund: number;

  // Employment stability
  employmentType: 'Full-time' | 'Part-time' | 'Self-employed' | 'Contractor' | 'Unemployed';
  jobTenure: number; // Years
  industryStability: 'High' | 'Medium' | 'Low';
  unemploymentRisk: 'Low' | 'Medium' | 'High';

  // Expense categories
  housingCost: number; // Monthly
  foodCost: number; // Monthly
  transportationCost: number; // Monthly
  healthcareCost: number; // Monthly
  insuranceCost: number; // Monthly
  utilitiesCost: number; // Monthly
  childcareCost: number; // Monthly
  educationCost: number; // Monthly
  entertainmentCost: number; // Monthly
  miscellaneousCost: number; // Monthly

  // Emergency scenarios
  jobLossDuration: number; // Months
  medicalEmergencyCost: number;
  homeRepairCost: number;
  carRepairCost: number;
  legalFeesCost: number;
  travelEmergencyCost: number;

  // Risk factors
  healthRisk: 'Low' | 'Medium' | 'High';
  homeRisk: 'Low' | 'Medium' | 'High';
  vehicleRisk: 'Low' | 'Medium' | 'High';
  legalRisk: 'Low' | 'Medium' | 'High';
  travelRisk: 'Low' | 'Medium' | 'High';

  // Insurance coverage
  healthInsurance: boolean;
  disabilityInsurance: boolean;
  homeownersInsurance: boolean;
  autoInsurance: boolean;
  umbrellaInsurance: boolean;
  lifeInsurance: boolean;

  // Debt obligations
  creditCardDebt: number;
  studentLoanDebt: number;
  personalLoanDebt: number;
  medicalDebt: number;
  otherDebt: number;

  // Family support
  familySupport: boolean;
  spouseIncome: number;
  extendedFamily: boolean;
  communitySupport: boolean;

  // Geographic factors
  costOfLivingIndex: number;
  locationRisk: 'Low' | 'Medium' | 'High';
  naturalDisasterRisk: 'Low' | 'Medium' | 'High';

  // Lifestyle factors
  lifestyleFlexibility: 'High' | 'Medium' | 'Low';
  spendingHabits: 'Conservative' | 'Moderate' | 'Extravagant';
  financialDiscipline: 'High' | 'Medium' | 'Low';

  // Time horizon
  emergencyFundTimeframe: number; // Months
  savingsTimeframe: number; // Months
  goalAchievementTime: number; // Months

  // Investment assumptions
  savingsRate: number;
  expectedReturn: number;
  inflationRate: number;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';

  // Tax considerations
  taxBracket: number;
  taxAdvantagedSavings: boolean;
  capitalGainsTax: number;

  // Analysis options
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Comparative analysis
  compareToTraditionalSavings: boolean;
  compareToHighYieldSavings: boolean;
  compareToMoneyMarket: boolean;
  compareToCertificatesOfDeposit: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Behavioral factors
  savingsDiscipline: 'High' | 'Medium' | 'Low';
  emergencyPreparedness: 'High' | 'Medium' | 'Low';
  financialAnxiety: 'High' | 'Medium' | 'Low';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  interestRateOutlook: 'Rising' | 'Stable' | 'Falling';
  marketOutlook: 'Bull' | 'Neutral' | 'Bear';

  // Regulatory compliance
  fdicInsurance: boolean;
  stateInsurance: boolean;
  accountProtection: boolean;

  // Performance tracking
  reviewFrequency: 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual';

  // Education and communication
  financialLiteracy: 'High' | 'Medium' | 'Low';
  emergencyPlanningKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  familyCommunication: 'Excellent' | 'Good' | 'Fair' | 'Poor';

  // Documentation
  budgetDocuments: boolean;
  expenseTracking: boolean;
  savingsPlan: boolean;

  // Timeline
  implementationTimeframe: number; // Months
  reviewDate: string;

  // Contingency planning
  backupPlan: string;
  alternativeFunding: boolean;

  // Quality of life
  stressLevel: 'Low' | 'Medium' | 'High';
  financialSecurity: 'High' | 'Medium' | 'Low';
  peaceOfMind: 'High' | 'Medium' | 'Low';

  // Future flexibility
  fundAccessibility: boolean;
  withdrawalPenalties: boolean;
  reinvestmentOptions: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    expectedReturn: number;
    liquidity: 'High' | 'Medium' | 'Low';
    riskLevel: 'Low' | 'Medium' | 'High';
  }>;

  // Historical performance
  savingsHistory: number[];
  expenseHistory: number[];
  emergencyHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  peerComparison: string;
  familyExpectations: string;
  socialProof: string;

  // Technological factors
  onlineBanking: boolean;
  mobileApps: boolean;
  automatedSavings: boolean;

  // Regulatory changes
  pendingRegulations: boolean;
  insuranceChanges: boolean;

  // Market timing
  savingsTiming: 'Regular' | 'Lump Sum' | 'Windfall';
  investmentTiming: string;

  // Professional advice
  financialAdvisor: boolean;
  accountant: boolean;
  insuranceAgent: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  independentAnalysis: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  anxietyLevel: 'Low' | 'Medium' | 'High';
  excitementLevel: 'High' | 'Medium' | 'Low';

  // Financial readiness
  currentLiquidity: number;
  debtToIncomeRatio: number;
  savingsRate: number;

  // Knowledge assessment
  emergencyFundUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  riskManagementUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
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
  oneYearVision: string;
  threeYearVision: string;
  fiveYearVision: string;

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

export interface EmergencyFundOutputs {
  // Fund size calculations
  recommendedFundSize: number;
  currentFundStatus: number;
  fundShortfall: number;
  monthsOfExpensesCovered: number;

  // Savings projections
  monthlySavingsNeeded: number;
  annualSavingsNeeded: number;
  timeToGoal: number; // Months
  savingsProgress: number;

  // Expense analysis
  totalMonthlyExpenses: number;
  essentialExpenses: number;
  discretionaryExpenses: number;
  emergencyExpenseBuffer: number;

  // Risk assessment
  overallRiskScore: number;
  employmentRisk: number;
  healthRisk: number;
  financialRisk: number;
  geographicRisk: number;

  // Scenario analysis
  jobLossScenario: number;
  medicalEmergencyScenario: number;
  homeRepairScenario: number;
  comprehensiveEmergencyScenario: number;

  // Investment performance
  expectedReturn: number;
  riskAdjustedReturn: number;
  inflationAdjustedReturn: number;
  realReturn: number;

  // Liquidity analysis
  liquidityScore: number;
  accessTime: number; // Days
  penaltyCosts: number;
  opportunityCost: number;

  // ROI analysis
  returnOnInvestment: number;
  costOfUnderfunding: number;
  valueOfPeaceOfMind: number;
  financialLeverage: number;

  // Comparative analysis
  vsTraditionalSavings: number;
  vsHighYieldSavings: number;
  vsMoneyMarket: number;
  vsCertificatesOfDeposit: number;

  // Tax analysis
  taxEfficiency: number;
  afterTaxReturn: number;
  taxAdvantagedSavings: number;
  taxOptimization: number;

  // Cash flow analysis
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashFlowStability: number;
  cashFlowEfficiency: number;

  // Sensitivity analysis
  sensitivityToExpenses: number;
  sensitivityToIncome: number;
  sensitivityToReturns: number;
  sensitivityToInflation: number;

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
  year1Projection: number;
  year3Projection: number;
  year5Projection: number;
  year10Projection: number;

  // Family impact
  familySecurity: number;
  spouseImpact: number;
  childrenImpact: number;
  overallFamilyWellbeing: number;

  // Regulatory compliance
  fdicCompliance: number;
  stateCompliance: number;
  insuranceCompliance: number;
  overallCompliance: number;

  // Performance attribution
  savingsEffect: number;
  investmentEffect: number;
  expenseEffect: number;
  riskEffect: number;

  // Sustainability analysis
  fundSustainability: number;
  longTermViability: number;
  familyCommitment: number;
  sustainableStrategy: number;

  // Technology integration
  digitalTools: number;
  automatedSavings: number;
  onlineAccess: number;
  mobileApps: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  financialWellness: number;

  // Demographic analysis
  ageDistribution: number;
  incomeDistribution: number;
  expenseDistribution: number;
  riskDistribution: number;

  // Economic analysis
  businessCycleSensitivity: number;
  interestRateSensitivity: number;
  inflationSensitivity: number;
  unemploymentSensitivity: number;

  // Geographic analysis
  locationOptimization: number;
  costOfLivingAdjustment: number;
  riskAdjustment: number;
  geographicEfficiency: number;

  // Innovation opportunities
  fintechIntegration: number;
  roboAdvising: number;
  personalizedPlanning: number;
  automatedOptimization: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  individualSatisfaction: number;
  familySatisfaction: number;
  advisorSatisfaction: number;
  regulatorSatisfaction: number;

  // Success metrics
  emergencyPreparedness: number;
  financialSecurity: number;
  riskManagement: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Build Emergency Fund Immediately' | 'Build Emergency Fund Gradually' | 'Maintain Current Fund' | 'Reevaluate Strategy';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  emergencyFundEducation: string[];
  riskManagementEducation: string[];
  savingsEducation: string[];
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
  insuranceCompliance: number;
  reportingCompliance: number;

  // Performance tracking
  savingsMetrics: string[];
  expenseMetrics: string[];
  riskMetrics: string[];
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
  finalRecommendation: 'Aggressive Fund Building' | 'Balanced Approach' | 'Conservative Strategy' | 'Alternative Methods';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  emergencyFundEducation: string[];
  financialSecurityEducation: string[];
  riskManagementEducation: string[];
  familyPlanningEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  savingsAttribution: number;
  expenseAttribution: number;
  riskAttribution: number;
  planningAttribution: number;

  // Stress testing results
  stressTestResults: {
    severeJobLoss: number;
    majorMedicalEmergency: number;
    homeDisaster: number;
    familyCrisis: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    creditLine: number;
    familySupport: number;
    insuranceOptions: number;
    investmentBuffer: number;
  };

  // Portfolio impact
  portfolioDiversification: number;
  portfolioReturnEnhancement: number;
  portfolioRiskReduction: number;
  portfolioEfficiency: number;

  // Legacy value
  familySecurity: number;
  financialIndependence: number;
  peaceOfMind: number;
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
  securityValue: number;
  peaceOfMindValue: number;
  familyValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}