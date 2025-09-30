export interface EconomicValueAddedInputs {
  // Financial Information
  netOperatingProfitAfterTax: number;
  capitalEmployed: number;
  costOfCapital: number;
  taxRate: number;

  // Company Information
  totalAssets: number;
  currentLiabilities: number;
  totalEquity: number;

  // Performance Metrics
  revenue: number;
  operatingExpenses: number;
  depreciation: number;
  amortization: number;

  // Analysis Parameters
  analysisPeriod: number;
  industry: string;
  benchmarkComparison: boolean;

  // Risk Factors
  businessRisk: number;
  financialRisk: number;
  operationalRisk: number;
}

export interface EconomicValueAddedMetrics {
  // EVA Calculations
  economicValueAdded: number;
  nopat: number;
  capitalCharge: number;
  valueCreation: number;

  // Performance Analysis
  evaMargin: number;
  evaSpread: number;
  evaMomentum: number;

  // Efficiency Metrics
  capitalProductivity: number;
  operatingProfitability: number;
  economicProfitability: number;

  // Comparative Analysis
  vsIndustryAverage: number;
  vsPeerGroup: number;
  vsHistoricalPerformance: number;

  // Risk Analysis
  riskAdjustedEva: number;
  volatilityAdjustment: number;
  uncertaintyFactor: number;

  // Optimization Metrics
  optimalCapitalStructure: number;
  efficiencyImprovement: number;
  valueEnhancement: number;
}

export interface EconomicValueAddedAnalysis {
  // EVA Assessment
  evaBreakdown: string;
  performanceAnalysis: string;
  valueCreation: string;

  // Strategic Implications
  strategicPlanning: string;
  capitalAllocation: string;
  investmentDecisions: string;

  // Operational Efficiency
  efficiencyAnalysis: string;
  costManagement: string;
  productivityImprovement: string;

  // Risk Management
  riskAssessment: string;
  mitigationStrategies: string;
  uncertaintyAnalysis: string;

  // Comparative Analysis
  industryComparison: string;
  peerAnalysis: string;
  benchmarkAnalysis: string;

  // Implementation Plan
  actionPlan: string[];
  monitoringPlan: string;
  adjustmentStrategy: string;

  // Professional Advice
  professionalRecommendations: string[];
  regulatoryConsiderations: string;
  stakeholderCommunication: string;

  // Decision Framework
  decisionFactors: string[];
  sensitivityAnalysis: string;
  scenarioPlanning: string;
}

export interface EconomicValueAddedOutputs {
  // Core Results
  economicValueAdded: number;
  valueCreation: number;
  performanceRating: string;

  // Analysis
  analysis: EconomicValueAddedAnalysis;

  // Additional Metrics
  evaMargin: number;
  capitalProductivity: number;
  riskAdjustedEva: number;
}