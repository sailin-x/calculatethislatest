export interface DynastyTrustGrowthEstimatorInputs {
  // Trust Information
  initialTrustValue: number;
  trustType: 'grantor' | 'non_grantor' | 'perpetual' | 'rule_against_perpetuities';
  stateOfCreation: string;
  trustDuration: number; // years

  // Growth Parameters
  expectedAnnualReturn: number;
  inflationRate: number;
  annualContributions: number;
  contributionGrowthRate: number;

  // Tax Information
  generationSkippingTaxRate: number;
  estateTaxRate: number;
  incomeTaxRate: number;
  gstExemptionAmount: number;

  // Beneficiary Information
  numberOfGenerations: number;
  generationInterval: number; // years between generations
  beneficiaryLifeExpectancy: number;

  // Trust Administration
  annualAdministrativeFees: number;
  investmentManagementFees: number;
  trusteeFees: number;

  // Distribution Strategy
  distributionStrategy: 'equal' | 'needs_based' | 'percentage' | 'discretionary';
  annualDistributionRate: number;
  minimumDistributionAmount: number;

  // Risk Factors
  marketVolatility: number;
  longevityRisk: number;
  regulatoryRisk: number;

  // Analysis Parameters
  analysisHorizon: number; // years
  discountRate: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface DynastyTrustGrowthMetrics {
  // Growth Projections
  projectedValue: number;
  totalGrowth: number;
  compoundAnnualGrowthRate: number;
  realReturn: number;

  // Tax Analysis
  totalGSTPaid: number;
  totalEstateTaxPaid: number;
  totalIncomeTaxPaid: number;
  afterTaxValue: number;

  // Distribution Analysis
  totalDistributions: number;
  remainingTrustValue: number;
  distributionEfficiency: number;

  // Generation Analysis
  valuePerGeneration: number[];
  gstUtilization: number;
  exemptionEfficiency: number;

  // Fee Analysis
  totalFeesPaid: number;
  feeImpact: number;
  netValue: number;

  // Risk Analysis
  volatilityAdjustedValue: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
}

export interface DynastyTrustGrowthAnalysis {
  // Executive Summary
  trustRating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';
  recommendation: string;
  keyInsights: string[];

  // Growth Analysis
  growthProjection: string;
  returnAnalysis: string;
  riskAdjustedReturns: string;

  // Tax Optimization
  gstStrategy: string;
  estatePlanning: string;
  taxEfficiency: string;

  // Distribution Strategy
  distributionPlan: string;
  beneficiaryImpact: string;
  wealthPreservation: string;

  // Fee Analysis
  costAnalysis: string;
  feeOptimization: string;
  valueForMoney: string;

  // Regulatory Compliance
  complianceStatus: string;
  regulatoryRisk: string;
  legalConsiderations: string;

  // Multi-Generational Impact
  generationalWealth: string;
  legacyPreservation: string;
  familyGovernance: string;

  // Action Plan
  immediateActions: string[];
  longTermStrategy: string;
  monitoringPlan: string;

  // Educational Resources
  recommendedResources: string[];
  nextSteps: string[];
}

export interface DynastyTrustGrowthEstimatorOutputs {
  // Core Results
  metrics: DynastyTrustGrowthMetrics;
  analysis: DynastyTrustGrowthAnalysis;

  // Summary
  finalTrustValue: number;
  totalTaxesPaid: number;
  netGenerationalWealth: number;
  trustEfficiency: number;
}