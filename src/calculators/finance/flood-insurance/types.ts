export interface FloodInsuranceInputs {
  // Property Information
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial' | 'rental';
  propertyValue: number;
  propertySize: number; // square feet
  yearBuilt: number;
  numberOfStories: number;
  foundationType: 'slab' | 'crawlspace' | 'basement' | 'elevated' | 'pier_and_beam';
  
  // Location Information
  floodZone: 'A' | 'AE' | 'AH' | 'AO' | 'AR' | 'A99' | 'V' | 'VE' | 'B' | 'C' | 'D' | 'X' | 'M' | 'P';
  elevationCertificate: boolean;
  baseFloodElevation: number; // feet above sea level
  propertyElevation: number; // feet above sea level
  distanceToWater: number; // feet
  coastalLocation: boolean;
  
  // Coverage Information
  buildingCoverage: number;
  contentsCoverage: number;
  replacementCostValue: number;
  actualCashValue: boolean;
  replacementCost: boolean;
  
  // Deductible Information
  buildingDeductible: number;
  contentsDeductible: number;
  separateDeductibles: boolean;
  
  // Policy Information
  policyType: 'standard' | 'preferred' | 'excess' | 'private';
  policyTerm: number; // months
  policyStartDate: string;
  policyEndDate: string;
  
  // Risk Factors
  floodHistory: boolean;
  numberOfPreviousClaims: number;
  yearsSinceLastClaim: number;
  floodRiskScore: number; // 1-10 scale
  elevationRisk: 'low' | 'medium' | 'high';
  
  // Building Characteristics
  constructionType: 'frame' | 'masonry' | 'fire_resistive' | 'non_combustible';
  roofType: 'gable' | 'hip' | 'flat' | 'mansard' | 'gambrel';
  roofAge: number; // years
  foundationHeight: number; // feet above ground
  floodVents: boolean;
  numberOfFloodVents: number;
  
  // Community Information
  communityRatingSystem: number; // 1-10 scale
  floodplainManagement: boolean;
  buildingCodes: 'none' | 'basic' | 'enhanced' | 'strict';
  emergencyServices: boolean;
  
  // Insurance Company Information
  insuranceCompany: string;
  companyRating: 'A++' | 'A+' | 'A' | 'A-' | 'B++' | 'B+' | 'B' | 'B-' | 'C++' | 'C+' | 'C' | 'C-' | 'D' | 'E' | 'F';
  claimsService: 'excellent' | 'good' | 'fair' | 'poor';
  
  // Discounts and Credits
  multiPolicyDiscount: boolean;
  claimsFreeDiscount: boolean;
  protectiveDeviceDiscount: boolean;
  communityDiscount: boolean;
  elevationDiscount: boolean;
  
  // Additional Coverage
  lossOfUse: boolean;
  lossOfUseLimit: number;
  ordinanceOrLaw: boolean;
  ordinanceOrLawLimit: number;
  sewerBackup: boolean;
  sewerBackupLimit: number;
  
  // Analysis Parameters
  analysisPeriod: number; // years
  inflationRate: number;
  propertyAppreciationRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'basis-points';
  includeCharts: boolean;
}

export interface FloodInsuranceMetrics {
  // Premium Analysis
  annualPremium: number;
  monthlyPremium: number;
  totalPremium: number;
  premiumPerSquareFoot: number;
  premiumToValueRatio: number;
  
  // Coverage Analysis
  totalCoverage: number;
  coverageGap: number;
  coverageAdequacy: number; // percentage
  replacementCostCoverage: number;
  
  // Risk Analysis
  floodRiskLevel: 'low' | 'medium' | 'high' | 'very_high';
  riskScore: number; // 1-10 scale
  probabilityOfFlood: number; // percentage
  expectedLoss: number;
  
  // Cost Analysis
  totalCost: number;
  costPerYear: number;
  costPerMonth: number;
  costEffectiveness: number; // percentage
  
  // Deductible Analysis
  totalDeductible: number;
  deductibleImpact: number;
  outOfPocketMaximum: number;
  
  // Policy Analysis
  policyEfficiency: number; // percentage
  coverageEfficiency: number; // percentage
  premiumEfficiency: number; // percentage
}

export interface FloodInsuranceAnalysis {
  // Executive Summary
  policyRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Purchase' | 'Consider' | 'Shop Around' | 'Avoid' | 'Require Changes';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Policy Analysis
  policySummary: string;
  coverageAnalysis: string;
  costAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  floodRisk: string;
  elevationRisk: string;
  communityRisk: string;
  
  // Coverage Assessment
  coverageAssessment: string;
  adequacyAnalysis: string;
  gapAnalysis: string;
  
  // Cost Assessment
  costAssessment: string;
  valueAnalysis: string;
  affordabilityAnalysis: string;
  
  // Recommendations
  coverageRecommendations: string[];
  costOptimization: string[];
  riskMitigation: string[];
  
  // Implementation
  implementationPlan: string;
  nextSteps: string[];
  timeline: string;
  
  // Monitoring
  monitoringPlan: string;
  reviewSchedule: string;
  updateTriggers: string[];
  
  // Risk Management
  riskManagement: string;
  mitigationStrategies: string[];
  contingencyPlans: string[];
  
  // Performance Benchmarks
  performanceBenchmarks: {
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }[];
  
  // Decision Support
  decisionRecommendation: string;
  presentationPoints: string[];
  decisionFactors: string[];
}

export interface FloodInsuranceOutputs extends FloodInsuranceMetrics {
  analysis: FloodInsuranceAnalysis;
  
  // Additional Output Metrics
  dataQuality: number; // Data quality score (0-100)
  modelAccuracy: number; // Model accuracy score (0-100)
  confidenceLevel: number; // Overall confidence level (0-100)
  
  // Time Series Analysis
  premiumProjections: {
    year: number;
    premium: number;
    inflationAdjusted: number;
    cumulativeCost: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenario: string;
    probability: number;
    impact: number;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
  
  // Comparative Analysis
  comparativeAnalysis: {
    metric: string;
    thisPolicy: number;
    marketAverage: number;
    topQuartile: number;
    bottomQuartile: number;
  }[];
  
  // Risk Metrics
  riskMetrics: {
    metric: string;
    value: number;
    benchmark: number;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
  
  // Financial Projections
  financialProjections: {
    year: number;
    premium: number;
    potentialLoss: number;
    netBenefit: number;
  }[];
  
  // Policy Timeline
  policyTimeline: {
    phase: string;
    duration: string;
    activities: string[];
    deliverables: string[];
  }[];
  
  // Coverage Checklist
  coverageChecklist: {
    category: string;
    items: {
      item: string;
      status: 'covered' | 'not_covered' | 'partial' | 'not_applicable';
      priority: 'high' | 'medium' | 'low';
      notes: string;
    }[];
  }[];
  
  // Risk Mitigation Plan
  riskMitigationPlan: {
    risk: string;
    mitigation: string;
    cost: number;
    effectiveness: number;
  }[];
  
  // Policy Optimization
  policyOptimization: {
    area: string;
    current: number;
    recommended: number;
    savings: number;
  }[];
  
  // Claims History
  claimsHistory: {
    year: number;
    claimAmount: number;
    claimType: string;
    settlement: number;
  }[];
  
  // Market Analysis
  marketAnalysis: {
    metric: string;
    current: number;
    marketAverage: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  }[];
  
  // Performance Tracking
  performanceTracking: {
    metric: string;
    current: number;
    target: number;
    frequency: string;
    owner: string;
  }[];
}
