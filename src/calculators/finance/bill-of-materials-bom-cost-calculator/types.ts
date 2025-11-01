export interface BillOfMaterialsBomCostInputs {
  // Product information
  productName: string;
  productCategory: string;
  productDescription: string;
  productionVolume: number;
  productionFrequency: 'One-time' | 'Monthly' | 'Quarterly' | 'Annual';

  // Bill of Materials structure
  components: Array<{
    id: string;
    name: string;
    category: 'Raw Material' | 'Component' | 'Subassembly' | 'Packaging' | 'Labor' | 'Overhead';
    quantity: number;
    unitCost: number;
    supplier: string;
    leadTime: number; // Days
    minimumOrderQuantity: number;
    unitOfMeasure: string;
  }>;

  // Cost categories
  materialCosts: number;
  laborCosts: number;
  overheadCosts: number;
  packagingCosts: number;
  shippingCosts: number;
  qualityControlCosts: number;

  // Manufacturing information
  manufacturingProcess: string;
  productionLocation: string;
  laborHours: number;
  laborRate: number;
  machineHours: number;
  machineRate: number;

  // Supplier information
  suppliers: Array<{
    name: string;
    reliability: 'High' | 'Medium' | 'Low';
    paymentTerms: string;
    qualityRating: number;
    deliveryPerformance: number;
  }>;

  // Inventory management
  safetyStock: number;
  reorderPoint: number;
  carryingCost: number;
  orderingCost: number;
  stockoutCost: number;

  // Cost analysis options
  includeOverheadAllocation: boolean;
  includeQualityCosts: boolean;
  includeWasteCosts: boolean;
  includeTransportationCosts: boolean;

  // Comparative analysis
  compareToIndustryAverages: boolean;
  compareToCompetitors: boolean;
  compareToPreviousVersions: boolean;
  compareToAlternativeMaterials: boolean;

  // Advanced options
  monteCarloSimulations: number;
  confidenceLevel: number;
  includeBlackSwanEvents: boolean;

  // Risk factors
  supplyChainRisk: 'Low' | 'Medium' | 'High';
  materialPriceRisk: 'Low' | 'Medium' | 'High';
  laborCostRisk: 'Low' | 'Medium' | 'High';
  regulatoryRisk: 'Low' | 'Medium' | 'High';

  // Time horizon
  costAnalysisPeriod: number; // Months
  forecastPeriod: number; // Months
  budgetPeriod: number; // Months

  // Goal alignment
  primaryGoal: 'Cost Reduction' | 'Profit Maximization' | 'Quality Improvement' | 'Supply Chain Optimization';
  secondaryGoal: 'Cost Reduction' | 'Profit Maximization' | 'Quality Improvement' | 'Supply Chain Optimization';

  // Behavioral factors
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  costControlFocus: 'High' | 'Medium' | 'Low';
  supplierRelationships: 'Strong' | 'Moderate' | 'Weak';

  // External factors
  economicOutlook: 'Positive' | 'Neutral' | 'Negative';
  commodityPriceOutlook: 'Stable' | 'Rising' | 'Falling';
  regulatoryOutlook: 'Stable' | 'Changing' | 'Uncertain';

  // Regulatory compliance
  environmentalStandards: boolean;
  safetyStandards: boolean;
  qualityStandards: boolean;
  tradeCompliance: boolean;

  // Performance tracking
  reviewFrequency: 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual';

  // Education and communication
  costAnalysisUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  stakeholderCommunication: boolean;
  teamTraining: boolean;

  // Documentation
  bomDocument: boolean;
  costBreakdown: boolean;
  supplierContracts: boolean;

  // Timeline
  implementationTimeframe: number; // Months
  costReductionTarget: string;

  // Contingency planning
  backupSuppliers: boolean;
  alternativeMaterials: boolean;
  costContingency: number;

  // Quality of life
  productionEfficiency: 'High' | 'Medium' | 'Low';
  supplierSatisfaction: 'High' | 'Medium' | 'Low';
  teamMorale: 'High' | 'Medium' | 'Low';

  // Future flexibility
  scalability: boolean;
  adaptability: boolean;
  sustainability: boolean;

  // Comparative strategies
  competingStrategies: Array<{
    name: string;
    costReduction: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    implementationTime: number;
  }>;

  // Historical performance
  costHistory: number[];
  volumeHistory: number[];
  efficiencyHistory: number[];

  // Risk preferences
  lossAversion: 'High' | 'Medium' | 'Low';
  regretAversion: 'High' | 'Medium' | 'Low';
  statusQuoBias: 'High' | 'Medium' | 'Low';

  // Social factors
  supplierRelationships: string;
  teamCollaboration: string;
  stakeholderExpectations: string;

  // Technological factors
  automationLevel: 'High' | 'Medium' | 'Low';
  digitalTools: boolean;
  dataAnalytics: boolean;

  // Regulatory changes
  pendingRegulations: boolean;
  complianceChanges: boolean;

  // Market timing
  costReductionTiming: 'Immediate' | 'Phased' | 'Long-term';
  supplierNegotiationTiming: string;

  // Professional advice
  costConsultant: boolean;
  supplyChainExpert: boolean;
  financialAdvisor: boolean;

  // Documentation completeness
  allDocumentsReviewed: boolean;
  professionalReview: boolean;
  independentAnalysis: boolean;

  // Emotional readiness
  decisionConfidence: 'High' | 'Medium' | 'Low';
  teamBuyIn: 'High' | 'Medium' | 'Low';
  stakeholderReadiness: 'High' | 'Medium' | 'Low';

  // Financial readiness
  budgetAvailability: number;
  capitalInvestment: number;
  cashFlowStability: 'High' | 'Medium' | 'Low';

  // Knowledge assessment
  bomUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  costAnalysisUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';
  supplyChainUnderstanding: 'Expert' | 'Knowledgeable' | 'Basic' | 'Novice';

  // Support network
  managementSupport: boolean;
  teamSupport: boolean;
  supplierSupport: boolean;
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
  operationalValues: string[];
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

export interface BillOfMaterialsBomCostOutputs {
  // Cost calculations
  totalBomCost: number;
  costPerUnit: number;
  totalProductionCost: number;
  grossMargin: number;

  // Cost breakdown
  materialCostPercentage: number;
  laborCostPercentage: number;
  overheadCostPercentage: number;
  otherCostPercentage: number;

  // Component analysis
  highestCostComponent: string;
  lowestCostComponent: string;
  costVariance: number;
  costEfficiency: number;

  // Supplier analysis
  supplierCostDistribution: Array<{
    supplier: string;
    cost: number;
    percentage: number;
    reliability: number;
  }>;

  // Production efficiency
  laborEfficiency: number;
  machineEfficiency: number;
  overallEfficiency: number;
  productivityIndex: number;

  // Inventory analysis
  inventoryCarryingCost: number;
  stockoutCost: number;
  totalInventoryCost: number;
  inventoryTurnover: number;

  // Quality analysis
  defectRate: number;
  qualityCost: number;
  reworkCost: number;
  scrapCost: number;

  // Risk analysis
  supplyChainRisk: number;
  costVolatilityRisk: number;
  supplierRisk: number;
  totalRiskScore: number;

  // Scenario analysis
  bestCaseCost: number;
  worstCaseCost: number;
  baseCaseCost: number;
  probabilityOfCostIncrease: number;

  // Comparative analysis
  vsIndustryAverages: number;
  vsCompetitors: number;
  vsPreviousVersions: number;
  vsAlternativeMaterials: number;

  // ROI analysis
  costReductionPotential: number;
  roiFromOptimizations: number;
  paybackPeriod: number;
  netPresentValue: number;

  // Sensitivity analysis
  sensitivityToMaterialCosts: number;
  sensitivityToLaborCosts: number;
  sensitivityToVolume: number;
  sensitivityToSupplierChanges: number;

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
  marketShareImpact: number;
  customerSatisfactionImpact: number;

  // Regulatory compliance
  environmentalCompliance: number;
  safetyCompliance: number;
  qualityCompliance: number;
  overallCompliance: number;

  // Performance attribution
  materialEffect: number;
  laborEffect: number;
  overheadEffect: number;
  efficiencyEffect: number;

  // Sustainability analysis
  environmentalImpact: number;
  socialImpact: number;
  economicImpact: number;
  overallSustainability: number;

  // Technology integration
  automationPotential: number;
  digitalTransformation: number;
  dataAnalytics: number;
  smartManufacturing: number;

  // Behavioral finance
  behavioralBiases: string[];
  decisionSupport: number;
  nudgeStrategies: number;
  teamEngagement: number;

  // Market analysis
  costCompetitiveness: number;
  pricingPower: number;
  marketPosition: number;
  competitiveAdvantage: number;

  // Economic analysis
  costInflationSensitivity: number;
  currencyRisk: number;
  commodityPriceRisk: number;
  economicCycleSensitivity: number;

  // Geographic analysis
  locationOptimization: number;
  transportationCost: number;
  tariffImpact: number;
  supplyChainEfficiency: number;

  // Innovation opportunities
  processInnovation: number;
  productInnovation: number;
  supplyChainInnovation: number;
  technologyInnovation: number;

  // Regulatory evolution
  regulatoryChanges: string[];
  complianceBurden: number;
  adaptationStrategies: string[];
  futureProofing: number;

  // Stakeholder analysis
  managementSatisfaction: number;
  teamSatisfaction: number;
  supplierSatisfaction: number;
  customerSatisfaction: number;

  // Success metrics
  costOptimization: number;
  efficiencyImprovement: number;
  qualityEnhancement: number;
  overallSuccess: number;

  // Recommendation
  overallRecommendation: 'Implement Cost Reduction Program' | 'Optimize Supply Chain' | 'Improve Efficiency' | 'Maintain Current Strategy';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyBenefits: string[];
  keyRisks: string[];
  actionPlan: string[];

  // Educational content
  bomEducation: string[];
  costAnalysisEducation: string[];
  supplyChainEducation: string[];
  optimizationEducation: string[];

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
  safetyCompliance: number;
  reportingCompliance: number;

  // Performance tracking
  costMetrics: string[];
  efficiencyMetrics: string[];
  qualityMetrics: string[];
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
  teamEngagement: number;
  supplierEngagement: number;
  customerEngagement: number;

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
  organizationalHealth: number;
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
  finalRecommendation: 'Aggressive Cost Optimization' | 'Balanced Approach' | 'Conservative Strategy' | 'Innovation Focus';
  implementationConfidence: 'High' | 'Medium' | 'Low';
  strategicConsiderations: string[];
  tacticalActions: string[];

  // Educational content
  billOfMaterialsEducation: string[];
  costManagementEducation: string[];
  supplyChainOptimizationEducation: string[];
  manufacturingEfficiencyEducation: string[];

  // Success tracking
  milestoneAchievement: number;
  goalProgress: number;
  strategyExecution: number;
  outcomeAchievement: number;

  // Attribution analysis
  materialAttribution: number;
  laborAttribution: number;
  overheadAttribution: number;
  efficiencyAttribution: number;

  // Stress testing results
  stressTestResults: {
    materialPriceSpike: number;
    laborCostIncrease: number;
    supplyChainDisruption: number;
    regulatoryChange: number;
  };

  // Alternative strategies
  alternativeApproaches: {
    outsourcing: number;
    automation: number;
    supplierConsolidation: number;
    processRedesign: number;
  };

  // Portfolio impact
  costPortfolioOptimization: number;
  efficiencyPortfolioEnhancement: number;
  riskPortfolioReduction: number;
  valuePortfolioCreation: number;

  // Legacy value
  operationalLegacy: number;
  efficiencyLegacy: number;
  costLegacy: number;
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
  efficiencyValue: number;
  qualityValue: number;
  totalValue: number;

  // Innovation metrics
  adoptionRate: number;
  userSatisfaction: number;
  featureUtilization: number;
  improvementRate: number;
}