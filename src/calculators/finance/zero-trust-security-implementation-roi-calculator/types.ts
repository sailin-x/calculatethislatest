export interface ZeroTrustSecurityRoiInputs {
  // Implementation Costs
  initialSetupCost: number;
  annualOperatingCost: number;
  trainingCost: number;
  consultingFees: number;

  // Current Security Environment
  currentAnnualSecurityBudget: number;
  annualBreachCost: number;
  numberOfBreaches: number;
  averageBreachCost: number;

  // Expected Benefits
  breachReductionPercentage: number;
  productivityGainPercentage: number;
  complianceCostReduction: number;

  // Risk Metrics
  currentRiskScore: number;
  targetRiskScore: number;
  regulatoryFinesAvoided: number;

  // Time Parameters
  implementationPeriod: number; // months
  analysisPeriod: number; // years
  paybackPeriodTarget: number; // years

  // Financial Parameters
  discountRate: number;
  inflationRate: number;
  taxRate: number;

  // Organizational Factors
  numberOfEmployees: number;
  industry: string;
  companySize: 'small' | 'medium' | 'large' | 'enterprise';
}

export interface ZeroTrustSecurityRoiMetrics {
  // ROI Calculations
  netPresentValue: number;
  returnOnInvestment: number;
  paybackPeriod: number;
  internalRateOfReturn: number;

  // Cost Analysis
  totalImplementationCost: number;
  totalOperatingCost: number;
  costSavings: number;
  benefitCostRatio: number;

  // Risk Analysis
  riskReduction: number;
  breachCostSavings: number;
  complianceSavings: number;

  // Productivity Analysis
  productivityGains: number;
  timeToValue: number;
  efficiencyImprovements: number;

  // Comparative Analysis
  vsTraditionalSecurity: number;
  vsIndustryAverage: number;
  vsBestPractices: number;

  // Optimization Metrics
  optimalImplementationTimeline: number;
  scalabilityFactor: number;
  maintenanceEfficiency: number;
}

export interface ZeroTrustSecurityRoiAnalysis {
  // ROI Assessment
  roiEvaluation: string;
  financialImpact: string;
  riskMitigation: string;

  // Implementation Strategy
  deploymentStrategy: string;
  resourceRequirements: string;
  timelineOptimization: string;

  // Risk Management
  securityEnhancement: string;
  complianceBenefits: string;
  incidentResponse: string;

  // Business Value
  productivityImpact: string;
  operationalEfficiency: string;
  strategicAdvantages: string;

  // Comparative Analysis
  industryComparison: string;
  competitorAnalysis: string;
  marketPositioning: string;

  // Implementation Plan
  actionPlan: string[];
  monitoringPlan: string;
  adjustmentStrategy: string;

  // Professional Advice
  professionalRecommendations: string[];
  vendorSelection: string;
  regulatoryCompliance: string;

  // Decision Framework
  decisionFactors: string[];
  costBenefitAnalysis: string;
  sensitivityAnalysis: string;
}

export interface ZeroTrustSecurityRoiOutputs {
  // Core Results
  returnOnInvestment: number;
  netPresentValue: number;
  paybackPeriod: number;

  // Analysis
  analysis: ZeroTrustSecurityRoiAnalysis;

  // Additional Metrics
  totalCostSavings: number;
  riskReduction: number;
  productivityGains: number;
}