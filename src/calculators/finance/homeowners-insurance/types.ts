export interface HomeownersInsuranceInputs {
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'condo' | 'townhouse' | 'multi_family' | 'mobile_home';
  propertyAge: number;
  propertySize: number;
  constructionType: 'wood_frame' | 'brick' | 'stone' | 'concrete' | 'steel_frame' | 'mixed';
  roofType: 'asphalt_shingle' | 'metal' | 'tile' | 'slate' | 'wood_shake' | 'flat';
  roofAge: number;
  
  // Location Information
  state: string;
  city: string;
  zipCode: string;
  floodZone: 'low_risk' | 'moderate_risk' | 'high_risk' | 'very_high_risk' | 'unknown';
  crimeRate: 'low' | 'medium' | 'high' | 'very_high';
  fireStationDistance: number;
  policeStationDistance: number;
  
  // Coverage Information
  dwellingCoverage: number;
  personalPropertyCoverage: number;
  liabilityCoverage: number;
  medicalPaymentsCoverage: number;
  lossOfUseCoverage: number;
  otherStructuresCoverage: number;
  
  // Deductibles
  dwellingDeductible: number;
  personalPropertyDeductible: number;
  liabilityDeductible: number;
  hurricaneDeductible: number;
  windstormDeductible: number;
  
  // Policy Features
  replacementCost: boolean;
  guaranteedReplacementCost: boolean;
  ordinanceOrLawCoverage: boolean;
  waterBackupCoverage: boolean;
  identityTheftCoverage: boolean;
  equipmentBreakdownCoverage: boolean;
  
  // Discounts
  multiPolicyDiscount: boolean;
  claimsFreeDiscount: boolean;
  securitySystemDiscount: boolean;
  smokeDetectorDiscount: boolean;
  deadboltDiscount: boolean;
  newHomeDiscount: boolean;
  seniorDiscount: boolean;
  
  // Claims History
  claimsInLast3Years: number;
  claimsInLast5Years: number;
  claimsInLast10Years: number;
  totalClaimAmount: number;
  
  // Risk Factors
  swimmingPool: boolean;
  trampoline: boolean;
  aggressiveDog: boolean;
  homeBusiness: boolean;
  rentalUnits: number;
  vacantProperty: boolean;
  
  // Insurance Company
  insuranceCompany: string;
  policyType: 'standard' | 'premium' | 'basic' | 'custom';
  policyTerm: number;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  propertyAppreciationRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface HomeownersInsuranceMetrics {
  // Premium Analysis
  annualPremium: number;
  monthlyPremium: number;
  premiumPerSquareFoot: number;
  premiumToValueRatio: number;
  
  // Coverage Analysis
  totalCoverage: number;
  coverageGap: number;
  overInsuranceAmount: number;
  underInsuranceAmount: number;
  
  // Cost Analysis
  totalDeductibles: number;
  outOfPocketMaximum: number;
  costOfInsurance: number;
  
  // Risk Metrics
  riskScore: number;
  probabilityOfClaim: number;
  expectedLoss: number;
  riskRating: 'low' | 'medium' | 'high' | 'very_high';
  
  // Discount Analysis
  totalDiscounts: number;
  discountPercentage: number;
  effectivePremium: number;
  
  // Comparison Metrics
  marketAveragePremium: number;
  premiumComparison: number;
  valueForMoney: number;
  
  // Sensitivity Analysis
  sensitivityMatrix: Array<{
    variable: string;
    values: number[];
    impacts: number[];
  }>;
  
  // Scenario Analysis
  scenarios: Array<{
    scenario: string;
    probability: number;
    premium: number;
    coverage: number;
  }>;
  
  // Coverage Breakdown
  coverageBreakdown: Array<{
    coverage: string;
    amount: number;
    percentage: number;
  }>;
}

export interface HomeownersInsuranceAnalysis {
  // Executive Summary
  insuranceRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Purchase' | 'Consider' | 'Avoid' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Insurance Analysis
  insuranceSummary: string;
  coverageAnalysis: string;
  premiumAnalysis: string;
  
  // Cost Analysis
  costSummary: string;
  valueAnalysis: string;
  comparisonAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  propertyRisk: string;
  locationRisk: string;
  coverageRisk: string;
  
  // Coverage Assessment
  coverageAssessment: string;
  adequacyAnalysis: string;
  gapAnalysis: string;
  
  // Market Assessment
  marketAssessment: string;
  competitiveAnalysis: string;
  marketPosition: string;
  
  // Recommendations
  purchaseRecommendations: string[];
  coverageRecommendations: string[];
  optimizationSuggestions: string[];
  
  // Implementation
  implementationPlan: string;
  nextSteps: string[];
  timeline: string;
  
  // Monitoring
  monitoringPlan: string;
  keyMetrics: string[];
  reviewSchedule: string;
  
  // Risk Management
  riskManagement: string;
  mitigationStrategies: string[];
  contingencyPlans: string[];
  
  // Performance Benchmarks
  performanceBenchmarks: Array<{
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }>;
  
  // Decision Support
  decisionRecommendation: string;
  presentationPoints: string[];
  decisionFactors: string[];
}

export interface HomeownersInsuranceOutputs {
  // Core Metrics
  annualPremium: number;
  monthlyPremium: number;
  totalCoverage: number;
  riskScore: number;
  premiumToValueRatio: number;
  totalDiscounts: number;
  effectivePremium: number;
  
  // Analysis
  analysis: HomeownersInsuranceAnalysis;
  
  // Additional Metrics
  premiumPerSquareFoot: number;
  coverageGap: number;
  overInsuranceAmount: number;
  underInsuranceAmount: number;
  totalDeductibles: number;
  outOfPocketMaximum: number;
  costOfInsurance: number;
  probabilityOfClaim: number;
  expectedLoss: number;
  riskRating: string;
  discountPercentage: number;
  marketAveragePremium: number;
  premiumComparison: number;
  valueForMoney: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  coverageBreakdown: any[];
}
