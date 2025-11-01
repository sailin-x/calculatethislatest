export interface UnionVsNonunionLaborCostInputs {
  // Company information
  companySize: 'Small' | 'Medium' | 'Large';
  industry: string;
  location: string;
  businessType: 'Manufacturing' | 'Construction' | 'Service' | 'Retail' | 'Other';

  // Workforce information
  totalEmployees: number;
  unionEmployees: number;
  nonunionEmployees: number;
  jobCategories: Array<{
    category: string;
    unionWage: number;
    nonunionWage: number;
    hoursPerWeek: number;
    employeesInCategory: number;
  }>;

  // Union costs
  unionDues: number; // Per employee per month
  initiationFees: number;
  unionRepresentation: number;
  grievanceProcedures: number;
  arbitrationCosts: number;
  contractNegotiationCosts: number;

  // Non-union costs
  trainingCosts: number;
  turnoverCosts: number;
  recruitmentCosts: number;
  benefitsAdministration: number;
  workersCompInsurance: number;
  unemploymentInsurance: number;

  // Benefits comparison
  unionBenefits: {
    healthInsurance: number;
    dentalInsurance: number;
    visionInsurance: number;
    retirementContributions: number;
    paidTimeOff: number;
    holidays: number;
  };

  nonunionBenefits: {
    healthInsurance: number;
    dentalInsurance: number;
    visionInsurance: number;
    retirementContributions: number;
    paidTimeOff: number;
    holidays: number;
  };

  // Productivity factors
  unionProductivity: number; // Percentage
  nonunionProductivity: number; // Percentage
  absenteeismRate: number; // Union
  absenteeismRateNonunion: number; // Non-union
  trainingTime: number; // Hours per employee

  // Risk factors
  strikeRisk: 'Low' | 'Medium' | 'High';
  laborDisputeRisk: 'Low' | 'Medium' | 'High';
  regulatoryRisk: 'Low' | 'Medium' | 'High';
  marketCompetition: 'Low' | 'Medium' | 'High';

  // Analysis options
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Comparative analysis
  compareToIndustryAverages: boolean;
  compareToLocalMarket: boolean;
  compareToNationalAverages: boolean;
  compareToCompetitors: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Operational factors
  overtimeRequirements: number;
  shiftDifferentials: number;
  weekendWork: boolean;
  holidayWork: boolean;

  // Cost escalation
  wageInflation: number;
  benefitCostInflation: number;
  unionContractEscalation: number;

  // Goal alignment
  primaryGoal: 'Cost Control' | 'Employee Relations' | 'Productivity' | 'Risk Management';
  secondaryGoal: 'Cost Control' | 'Employee Relations' | 'Productivity' | 'Risk Management';

  // Behavioral factors
  managementStyle: 'Authoritative' | 'Collaborative' | 'Delegative';
  employeeMorale: 'High' | 'Medium' | 'Low';
  unionRelations: 'Excellent' | 'Good' | 'Fair' | 'Poor';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  laborMarketConditions: 'Tight' | 'Balanced' | 'Loose';
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';

  // Regulatory compliance
  laborLaws: boolean;
  safetyStandards: boolean;
  wageStandards: boolean;
  discriminationLaws: boolean;

  // Performance tracking
  reviewFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly';

  // Education and communication
  laborRelationsKnowledge: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  stakeholderCommunication: boolean;
  employeeEducation: boolean;

  // Documentation
  unionContract: boolean;
  employeeHandbook: boolean;
  policiesProcedures: boolean;

  // Timeline
  implementationTimeframe: number; // Months
  transitionPeriod: number; // Months

  // Contingency planning
  backupStrategy: string;
  contingencyBudget: number;

  // Quality of life
  workplaceSatisfaction: 'High' | 'Medium' | 'Low';
  workLifeBalance: 'High' | 'Medium' | 'Low';
  jobSecurity: 'High' | 'Medium' | 'Low';

  // Future flexibility
  scalability: boolean;
  adaptability: boolean;
  flexibility: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    costSavings: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    implementationDifficulty: 'Low' | 'Medium' | 'High';
  }>;

  // Historical performance
  costHistory: number[];
  productivityHistory: number[];
  turnoverHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  communityRelations: string;
  reputationImpact: string;
  stakeholderExpectations: string;

  // Technological factors
  automationLevel: 'High' | 'Medium' | 'Low';
  technologyInvestment: number;
  trainingInvestment: number;

  // Regulatory changes
  pendingLegislation: boolean;
  laborLawChanges: boolean;

  // Market timing
  laborMarketTiming: 'Favorable' | 'Neutral' | 'Unfavorable';
  economicCycle: string;

  // Professional advice
  laborAttorney: boolean;
  hrConsultant: boolean;
  financialAdvisor: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  independentAnalysis: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  stakeholderBuyIn: 'High' | 'Medium' | 'Low';
  teamReadiness: 'High' | 'Medium' | 'Low';

  // Financial readiness
  budgetAvailability: number;
  capitalInvestment: number;
  cashFlowStability: 'High' | 'Medium' | 'Low';

  // Knowledge assessment
  unionUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  laborLawUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  costAnalysisUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  managementSupport: boolean;
  employeeSupport: boolean;
  unionSupport: boolean;
  expertSupport: boolean;

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
  businessValues: string[];
  employeeValues: string[];
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
  stakeholderConsensus: boolean;
  professionalAdviceObtained: boolean;
  documentationComplete: boolean;
}

export interface UnionVsNonunionLaborCostOutputs {
  // Cost calculations
  totalUnionCosts: number;
  totalNonunionCosts: number;
  costDifference: number;
  costSavings: number;

  // Cost breakdown
  unionWageCosts: number;
  nonunionWageCosts: number;
  unionBenefitsCosts: number;
  nonunionBenefitsCosts: number;
  unionAdministrativeCosts: number;
  nonunionAdministrativeCosts: number;

  // Productivity analysis
  unionProductivityRate: number;
  nonunionProductivityRate: number;
  efficiencyDifference: number;
  outputPerDollar: number;

  // Risk analysis
  unionRiskScore: number;
  nonunionRiskScore: number;
  overallRiskAssessment: number;
  riskAdjustedCosts: number;

  // Scenario analysis
  bestCaseUnion: number;
  worstCaseUnion: number;
  bestCaseNonunion: number;
  worstCaseNonunion: number;

  // Comparative analysis
  vsIndustryAverages: number;
  vsLocalMarket: number;
  vsNationalAverages: number;
  vsCompetitors: number;

  // ROI analysis
  costReductionPotential: number;
  roiFromSwitching: number;
  paybackPeriod: number;
  netPresentValue: number;

  // Sensitivity analysis
  sensitivityToWages: number;
  sensitivityToBenefits: number;
  sensitivityToProductivity: number;
  sensitivityToTurnover: number;

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

  // Business impact
  profitImpact: number;
  competitivenessImpact: number;
  employeeMoraleImpact: number;
  operationalEfficiencyImpact: number;

  // Regulatory compliance
  unionCompliance: number;
  nonunionCompliance: number;
  laborLawCompliance: number;
  overallCompliance: number;

  // Performance attribution
  wageEffect: number;
  benefitEffect: number;
  productivityEffect: number;
  riskEffect: number;

  // Sustainability analysis
  unionSustainability: number;
  nonunionSustainability: number;
  longTermViability: number;
  sustainableStrategy: number;

  // Technology integration
  unionTechnologyAdoption: number;
  nonunionTechnologyAdoption: number;
  automationPotential: number;
  trainingEfficiency: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  employeeEngagement: number;

  // Market analysis
  laborMarketPosition: number;
  competitivePositioning: number;
  talentAcquisition: number;
  retentionCapability: number;

  // Economic analysis
  costInflationSensitivity: number;
  wageInflationSensitivity: number;
  benefitCostSensitivity: number;
  economicCycleSensitivity: number;

  // Geographic analysis
  locationOptimization: number;
  regionalCostDifferences: number;
  laborMarketVariability: number;
  geographicEfficiency: number;

  // Innovation opportunities
  processInnovation: number;
  organizationalInnovation: number;
  technologyInnovation: number;
  managementInnovation: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  managementSatisfaction: number;
  employeeSatisfaction: number;
  unionSatisfaction: number;
  communitySatisfaction: number;

  // Success metrics
  costOptimization: number;
  productivityEnhancement: number;
  employeeSatisfaction: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Maintain Union Status' | 'Switch to Non-union' | 'Hybrid Approach' | 'Reevaluate Strategy';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  unionEducation: string[];
  laborLawEducation: string[];
  costAnalysisEducation: string[];
  strategyEducation: string[];

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
  laborCompliance: number;
  reportingCompliance: number;

  // Performance tracking
  costMetrics: string[];
  productivityMetrics: string[];
  employeeMetrics: string[];
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
  managementEngagement: number;
  employeeEngagement: number;
  unionEngagement: number;
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
  operationalHealth: number;
  employeeHealth: number;
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
  finalRecommendation: 'Union Workforce' | 'Non-union Workforce' | 'Mixed Workforce' | 'Alternative Labor Strategies';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  laborRelationsEducation: string[];
  costManagementEducation: string[];
  employeeRelationsEducation: string[];
  businessStrategyEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  wageAttribution: number;
  benefitAttribution: number;
  productivityAttribution: number;
  riskAttribution: number;

  // Stress testing results
  stressTestResults: {
    economicDownturn: number;
    laborShortage: number;
    regulatoryChange: number;
    unionStrike: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    outsourcing: number;
    automation: number;
    remoteWork: number;
    flexibleScheduling: number;
  };

  // Portfolio impact
  laborCostOptimization: number;
  productivityEnhancement: number;
  riskReduction: number;
  employeeSatisfaction: number;

  // Legacy value
  organizationalLegacy: number;
  employeeLegacy: number;
  communityLegacy: number;
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
  costValue: number;
  productivityValue: number;
  employeeValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}