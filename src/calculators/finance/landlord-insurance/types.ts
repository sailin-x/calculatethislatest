export interface LandlordInsuranceInputs {
  // Property Information
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'apartment' | 'commercial';
  propertySize: number;
  numberOfUnits: number;
  propertyAge: number;
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
  lossOfRentCoverage: number;
  otherStructuresCoverage: number;
  
  // Deductibles
  dwellingDeductible: number;
  personalPropertyDeductible: number;
  liabilityDeductible: number;
  lossOfRentDeductible: number;
  
  // Policy Features
  replacementCost: boolean;
  ordinanceOrLawCoverage: boolean;
  waterBackupCoverage: boolean;
  equipmentBreakdownCoverage: boolean;
  identityTheftCoverage: boolean;
  
  // Rental Information
  monthlyRent: number;
  annualRent: number;
  vacancyRate: number;
  tenantType: 'residential' | 'commercial' | 'mixed';
  leaseTerm: number;
  
  // Risk Factors
  tenantRisk: 'low' | 'medium' | 'high';
  propertyRisk: 'low' | 'medium' | 'high';
  marketRisk: 'low' | 'medium' | 'high';
  
  // Claims History
  claimsInLast3Years: number;
  claimsInLast5Years: number;
  totalClaimAmount: number;
  
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

export interface LandlordInsuranceMetrics {
  // Premium Analysis
  annualPremium: number;
  monthlyPremium: number;
  premiumPerUnit: number;
  premiumToRentRatio: number;
  
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
  
  // Rental Analysis
  rentalIncome: number;
  netRentalIncome: number;
  insuranceCostPercentage: number;
  
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

export interface LandlordInsuranceAnalysis {
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
  tenantRisk: string;
  propertyRisk: string;
  marketRisk: string;
  
  // Rental Analysis
  rentalAnalysis: string;
  incomeAnalysis: string;
  profitabilityAnalysis: string;
  
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

export interface LandlordInsuranceOutputs {
  // Core Metrics
  annualPremium: number;
  monthlyPremium: number;
  totalCoverage: number;
  riskScore: number;
  premiumToRentRatio: number;
  rentalIncome: number;
  netRentalIncome: number;
  
  // Analysis
  analysis: LandlordInsuranceAnalysis;
  
  // Additional Metrics
  premiumPerUnit: number;
  coverageGap: number;
  overInsuranceAmount: number;
  underInsuranceAmount: number;
  totalDeductibles: number;
  outOfPocketMaximum: number;
  costOfInsurance: number;
  probabilityOfClaim: number;
  expectedLoss: number;
  riskRating: string;
  insuranceCostPercentage: number;
  marketAveragePremium: number;
  premiumComparison: number;
  valueForMoney: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  coverageBreakdown: any[];
}
