export interface HOAFeeInputs {
  // Property Information
  propertyAddress: string;
  propertyType: 'condo' | 'townhouse' | 'single_family' | 'coop' | 'pud';
  propertySize: number;
  unitNumber: string;
  buildingNumber: string;
  
  // HOA Information
  hoaName: string;
  hoaType: 'condo_association' | 'homeowners_association' | 'coop_board' | 'master_association';
  totalUnits: number;
  totalBuildings: number;
  associationAge: number;
  
  // Fee Structure
  monthlyFee: number;
  quarterlyFee: number;
  annualFee: number;
  specialAssessment: number;
  transferFee: number;
  lateFee: number;
  otherFees: number;
  
  // Budget Information
  totalAnnualBudget: number;
  reserveFund: number;
  operatingExpenses: number;
  insuranceCosts: number;
  maintenanceCosts: number;
  utilityCosts: number;
  managementFees: number;
  legalFees: number;
  accountingFees: number;
  otherExpenses: number;
  
  // Amenities and Services
  amenities: Array<{
    name: string;
    cost: number;
    usage: 'included' | 'extra' | 'optional';
  }>;
  
  // Insurance Coverage
  masterInsurance: boolean;
  insuranceDeductible: number;
  coverageAmount: number;
  personalLiabilityCoverage: number;
  
  // Maintenance and Repairs
  maintenanceSchedule: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
  lastMajorRenovation: number;
  upcomingRenovations: Array<{
    project: string;
    cost: number;
    timeline: string;
  }>;
  
  // Financial Health
  reserveStudy: boolean;
  reserveStudyDate: string;
  reserveFundingLevel: number;
  reserveFundingTarget: number;
  
  // Market Information
  marketLocation: string;
  comparableHOAFees: Array<{
    property: string;
    monthlyFee: number;
    amenities: string[];
  }>;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  propertyAppreciationRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface HOAFeeMetrics {
  // Fee Analysis
  totalMonthlyCost: number;
  totalAnnualCost: number;
  costPerSquareFoot: number;
  costPerUnit: number;
  
  // Budget Analysis
  budgetPerUnit: number;
  reservePerUnit: number;
  operatingCostPerUnit: number;
  budgetUtilization: number;
  
  // Financial Health
  reserveHealth: number;
  reserveAdequacy: number;
  financialStability: number;
  
  // Cost Comparison
  marketComparison: number;
  costEfficiency: number;
  valueForMoney: number;
  
  // Projections
  projectedFees: Array<{
    year: number;
    monthlyFee: number;
    annualCost: number;
    inflationAdjustment: number;
  }>;
  
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
    monthlyFee: number;
    totalCost: number;
  }>;
  
  // Cost Breakdown
  costBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

export interface HOAFeeAnalysis {
  // Executive Summary
  hoaRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  financialHealth: 'Strong' | 'Stable' | 'Concerning' | 'Weak';
  recommendation: 'Good Value' | 'Fair Value' | 'Overpriced' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Fee Analysis
  feeSummary: string;
  costAnalysis: string;
  valueAnalysis: string;
  
  // Financial Analysis
  financialSummary: string;
  budgetAnalysis: string;
  reserveAnalysis: string;
  
  // Market Analysis
  marketSummary: string;
  comparisonAnalysis: string;
  competitivePosition: string;
  
  // Risk Assessment
  riskAssessment: string;
  financialRisk: string;
  maintenanceRisk: string;
  marketRisk: string;
  
  // Recommendations
  valueRecommendations: string[];
  financialRecommendations: string[];
  maintenanceRecommendations: string[];
  
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

export interface HOAFeeOutputs {
  // Core Metrics
  totalMonthlyCost: number;
  totalAnnualCost: number;
  costPerSquareFoot: number;
  costPerUnit: number;
  budgetPerUnit: number;
  reserveHealth: number;
  marketComparison: number;
  hoaRating: string;
  
  // Analysis
  analysis: HOAFeeAnalysis;
  
  // Additional Metrics
  reservePerUnit: number;
  operatingCostPerUnit: number;
  budgetUtilization: number;
  reserveAdequacy: number;
  financialStability: number;
  costEfficiency: number;
  valueForMoney: number;
  projectedFees: any[];
  sensitivityMatrix: any[];
  scenarios: any[];
  costBreakdown: any[];
}
