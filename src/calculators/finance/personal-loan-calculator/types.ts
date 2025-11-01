export interface PersonalLoanInputs {
  // Loan details
  loanAmount: number;
  interestRate: number;
  loanTerm: number; // Months
  loanPurpose: 'Debt Consolidation' | 'Home Improvement' | 'Medical Expenses' | 'Vacation' | 'Wedding' | 'Education' | 'Emergency' | 'Other';

  // Borrower information
  borrowerIncome: number;
  borrowerCreditScore: number;
  debtToIncomeRatio: number;
  employmentStatus: 'Employed' | 'Self-employed' | 'Unemployed' | 'Retired';
  employmentLength: number; // Months

  // Additional costs
  originationFees: number;
  processingFees: number;
  latePaymentFees: number;
  prepaymentPenalties: number;

  // Repayment options
  paymentFrequency: 'Monthly' | 'Bi-weekly' | 'Weekly';
  autoPayDiscount: boolean;
  paymentAmount: number;

  // Credit profile
  creditUtilization: number;
  numberOfCreditCards: number;
  averageCreditAge: number;
  hardInquiries: number;

  // Financial situation
  monthlyDebtPayments: number;
  monthlyExpenses: number;
  emergencyFund: number;
  savingsRate: number;

  // Analysis options
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Comparative analysis
  compareToCreditCards: boolean;
  compareToSavings: boolean;
  compareToOtherLoans: boolean;
  compareToInvestment: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Economic factors
  inflationRate: number;
  interestRateOutlook: 'Rising' | 'Stable' | 'Falling';
  unemploymentRate: number;
  economicGrowth: number;

  // Goal alignment
  primaryGoal: 'Debt Reduction' | 'Cash Flow' | 'Emergency Fund' | 'Investment Opportunity';
  secondaryGoal: 'Debt Reduction' | 'Cash Flow' | 'Emergency Fund' | 'Investment Opportunity';

  // Behavioral factors
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  financialLiteracy: 'High' | 'Medium' | 'Low';
  spendingHabits: 'Disciplined' | 'Moderate' | 'Impulsive';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  marketConditions: 'Favorable' | 'Neutral' | 'Unfavorable';
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';

  // Regulatory compliance
  truthInLending: boolean;
  fairCreditReporting: boolean;
  equalCreditOpportunity: boolean;
  consumerProtection: boolean;

  // Performance tracking
  reviewFrequency: 'Monthly' | 'Quarterly' | 'Annually';
  paymentTracking: boolean;
  creditMonitoring: boolean;

  // Education and communication
  financialLiteracyLevel: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  stakeholderCommunication: boolean;
  familyInvolvement: boolean;

  // Documentation
  loanAgreement: boolean;
  creditReport: boolean;
  incomeVerification: boolean;

  // Timeline
  loanApprovalTime: number; // Days
  fundingTime: number; // Days

  // Contingency planning
  backupFunding: boolean;
  emergencyPlan: boolean;

  // Quality of life
  financialStress: 'High' | 'Medium' | 'Low';
  peaceOfMind: 'High' | 'Medium' | 'Low';
  financialFreedom: 'High' | 'Medium' | 'Low';

  // Future flexibility
  prepaymentOption: boolean;
  refinancingOption: boolean;
  loanModification: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    cost: number;
    riskLevel: 'Low' | 'Medium' | 'High';
  }>;

  // Historical performance
  paymentHistory: number[];
  interestRateHistory: number[];
  creditScoreHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  peerComparison: string;
  communityStandards: string;
  familyExpectations: string;

  // Technological factors
  digitalBanking: boolean;
  mobilePayments: boolean;
  automatedPayments: boolean;

  // Regulatory changes
  pendingRegulations: boolean;
  interestRateCaps: boolean;

  // Market timing
  loanMarketTiming: 'Optimal' | 'Good' | 'Poor';
  rateEnvironment: string;

  // Professional advice
  financialAdvisor: boolean;
  creditCounselor: boolean;
  loanOfficer: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  independentAnalysis: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  financialAnxiety: 'Low' | 'Medium' | 'High';
  debtStress: 'Low' | 'Medium' | 'High';

  // Financial readiness
  budgetAvailability: number;
  debtCapacity: number;
  repaymentAbility: 'High' | 'Medium' | 'Low';

  // Knowledge assessment
  loanUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  creditUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  interestUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  familySupport: boolean;
  friendAdvice: boolean;
  professionalNetwork: boolean;
  onlineResources: boolean;

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

export interface PersonalLoanOutputs {
  // Loan calculations
  monthlyPayment: number;
  totalLoanCost: number;
  totalInterestPaid: number;
  totalPayments: number;

  // Financial analysis
  effectiveInterestRate: number;
  annualPercentageRate: number;
  costOfBorrowing: number;
  breakEvenAnalysis: number;

  // Cash flow analysis
  monthlyCashFlowImpact: number;
  annualCashFlowImpact: number;
  debtServiceCoverage: number;
  liquidityRatio: number;

  // Risk analysis
  defaultRisk: number;
  creditImpact: number;
  financialStressIndex: number;
  repaymentRisk: number;

  // Scenario analysis
  bestCaseCost: number;
  worstCaseCost: number;
  baseCaseCost: number;
  probabilityOfSuccessfulRepayment: number;

  // Comparative analysis
  vsCreditCards: number;
  vsSavings: number;
  vsOtherLoans: number;
  vsInvestment: number;

  // Cost breakdown
  principalPayments: number;
  interestPayments: number;
  feePayments: number;
  totalCostOfCredit: number;

  // Credit impact
  creditScoreChange: number;
  creditUtilizationChange: number;
  debtToIncomeChange: number;
  paymentHistoryImpact: number;

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
  netWorthImpact: number;
  savingsImpact: number;
  investmentOpportunityCost: number;
  retirementImpact: number;

  // Regulatory compliance
  consumerProtectionCompliance: number;
  fairLendingCompliance: number;
  disclosureCompliance: number;
  overallCompliance: number;

  // Performance attribution
  interestRateAttribution: number;
  feeAttribution: number;
  termAttribution: number;
  borrowerAttribution: number;

  // Sustainability analysis
  debtSustainability: number;
  financialHealthIndex: number;
  longTermViability: number;
  sustainableBorrowing: number;

  // Technology integration
  digitalBankingBenefits: number;
  mobilePaymentEfficiency: number;
  automatedPaymentSavings: number;
  onlineAccountManagement: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  financialWellness: number;

  // Market analysis
  loanMarketPosition: number;
  competitivePositioning: number;
  rateCompetitiveness: number;
  marketTiming: number;

  // Economic analysis
  inflationSensitivity: number;
  interestRateSensitivity: number;
  unemploymentSensitivity: number;
  economicCycleSensitivity: number;

  // Geographic analysis
  regionalRateDifferences: number;
  localEconomicFactors: number;
  geographicRiskFactors: number;
  locationOptimization: number;

  // Innovation opportunities
  fintechInnovation: number;
  paymentInnovation: number;
  creditScoringInnovation: number;
  lendingInnovation: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  borrowerSatisfaction: number;
  lenderSatisfaction: number;
  familyImpact: number;
  communityEffect: number;

  // Success metrics
  loanPerformance: number;
  borrowerSuccess: number;
  financialGoalsAchievement: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Take Loan' | 'Delay Decision' | 'Alternative Financing' | 'Reevaluate Needs';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  personalLoanEducation: string[];
  creditEducation: string[];
  debtManagementEducation: string[];
  financialPlanningEducation: string[];

  // Success metrics
  goalAchievement: number;
  strategyEffectiveness: number;
  implementationSuccess: number;
  overallAchievement: number;

  // Future considerations
  regulatoryOutlook: string[];
  economicTrends: string[];
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
  consumerCompliance: number;
  reportingCompliance: number;

  // Performance tracking
  loanMetrics: string[];
  paymentMetrics: string[];
  creditMetrics: string[];
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
  borrowerEngagement: number;
  lenderEngagement: number;
  familyEngagement: number;
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
  personalHealth: number;
  creditHealth: number;
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
  finalRecommendation: 'Proceed with Loan' | 'Explore Alternatives' | 'Delay and Save' | 'Reconsider Financing Needs';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  debtConsolidationEducation: string[];
  creditBuildingEducation: string[];
  financialLiteracyEducation: string[];
  decisionMakingEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  interestAttribution: number;
  feeAttribution: number;
  termAttribution: number;
  purposeAttribution: number;

  // Stress testing results
  stressTestResults: {
    rateIncrease: number;
    incomeReduction: number;
    emergencyExpense: number;
    economicDownturn: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    creditCard: number;
    homeEquity: number;
    peerToPeer: number;
    balanceTransfer: number;
  };

  // Portfolio impact
  debtPortfolioOptimization: number;
  creditPortfolioEnhancement: number;
  financialPortfolioImprovement: number;
  riskPortfolioReduction: number;

  // Legacy value
  financialLegacy: number;
  creditLegacy: number;
  debtLegacy: number;
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
  financialValue: number;
  creditValue: number;
  convenienceValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}