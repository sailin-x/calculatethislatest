// Property Tax Calculator Types

export interface PropertyTaxInputs {
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial' | 'industrial' | 'land' | 'agricultural';
  propertySize: number; // square feet
  propertyAge: number; // years
  propertyUse: 'primary_residence' | 'secondary_residence' | 'investment' | 'commercial' | 'vacant';
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_repair';
  
  // Location Information
  state: string;
  county: string;
  city: string;
  zipCode: string;
  schoolDistrict: string;
  specialTaxDistrict: string;
  
  // Tax Rates and Assessments
  countyTaxRate: number; // per $1000 of assessed value
  cityTaxRate: number; // per $1000 of assessed value
  schoolTaxRate: number; // per $1000 of assessed value
  specialDistrictTaxRate: number; // per $1000 of assessed value
  assessmentRatio: number; // percentage of market value used for assessment
  homesteadExemption: boolean;
  homesteadExemptionAmount: number;
  seniorExemption: boolean;
  seniorExemptionAmount: number;
  veteranExemption: boolean;
  veteranExemptionAmount: number;
  disabilityExemption: boolean;
  disabilityExemptionAmount: number;
  
  // Assessment Information
  assessedValue: number;
  previousAssessedValue: number;
  assessmentDate: string;
  lastReassessmentDate: string;
  reassessmentCycle: number; // years between reassessments
  
  // Tax Calculation Parameters
  taxYear: number;
  paymentSchedule: 'annual' | 'semi_annual' | 'quarterly' | 'monthly';
  escrowAccount: boolean;
  escrowMonthlyPayment: number;
  escrowBalance: number;
  
  // Additional Taxes and Fees
  specialAssessments: Array<{
    description: string;
    amount: number;
    duration: number; // years
    annualAmount: number;
  }>;
  improvementAssessments: Array<{
    description: string;
    amount: number;
    duration: number; // years
    annualAmount: number;
  }>;
  bondAssessments: Array<{
    description: string;
    amount: number;
    duration: number; // years
    annualAmount: number;
  }>;
  
  // Market and Economic Factors
  marketAppreciationRate: number; // annual percentage
  inflationRate: number; // annual percentage
  localEconomicGrowth: number; // annual percentage
  propertyTaxCap: number; // maximum annual increase percentage
  
  // Historical Data
  previousYearTax: number;
  fiveYearAverageTax: number;
  tenYearAverageTax: number;
  taxHistory: Array<{
    year: number;
    assessedValue: number;
    taxAmount: number;
    taxRate: number;
  }>;
  
  // Analysis Parameters
  analysisPeriod: number; // years
  includeInflation: boolean;
  includeAppreciation: boolean;
  includeExemptions: boolean;
  includeSpecialAssessments: boolean;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
  includeComparisons: boolean;
}

export interface PropertyTaxMetrics {
  // Basic Tax Calculations
  totalTaxRate: number; // combined rate per $1000
  totalAnnualTax: number;
  totalMonthlyTax: number;
  effectiveTaxRate: number; // percentage of property value
  
  // Assessment Analysis
  assessmentToMarketRatio: number;
  assessmentChange: number;
  assessmentChangePercentage: number;
  
  // Exemption Analysis
  totalExemptions: number;
  taxableValue: number;
  exemptionSavings: number;
  exemptionPercentage: number;
  
  // Tax Breakdown
  countyTax: number;
  cityTax: number;
  schoolTax: number;
  specialDistrictTax: number;
  specialAssessmentsTotal: number;
  improvementAssessmentsTotal: number;
  bondAssessmentsTotal: number;
  
  // Payment Analysis
  paymentAmounts: {
    annual: number;
    semiAnnual: number;
    quarterly: number;
    monthly: number;
  };
  escrowAnalysis: {
    requiredMonthlyPayment: number;
    currentEscrowPayment: number;
    escrowDeficit: number;
    escrowSurplus: number;
  };
  
  // Historical Analysis
  taxGrowthRate: number;
  fiveYearProjection: number;
  tenYearProjection: number;
  taxBurdenTrend: 'increasing' | 'decreasing' | 'stable';
  
  // Comparative Analysis
  stateAverageTaxRate: number;
  countyAverageTaxRate: number;
  cityAverageTaxRate: number;
  comparisonPercentile: number; // where this property ranks
  taxEfficiency: 'low' | 'medium' | 'high';
}

export interface PropertyTaxAnalysis {
  // Overall Assessment
  taxRating: 'Low' | 'Medium' | 'High' | 'Very High';
  affordabilityRating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  recommendation: 'Keep Property' | 'Consider Selling' | 'Appeal Assessment' | 'Apply for Exemptions' | 'Monitor Closely';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  costFactors: string[];
  opportunities: string[];
  risks: string[];
  
  // Tax Optimization
  optimizationSuggestions: string[];
  exemptionRecommendations: string[];
  appealRecommendations: string[];
  paymentOptimization: string[];
  
  // Market Analysis
  marketFactors: string[];
  economicImpact: string[];
  futureProjections: string[];
  
  // Action Items
  nextSteps: string[];
  timeline: string[];
  priorityActions: string[];
  
  // Performance Metrics
  performanceBenchmarks: Array<{
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }>;
  
  // Presentation Data
  presentationPoints: string[];
  decisionFactors: string[];
  summaryPoints: string[];
}

export interface PropertyTaxOutputs {
  // Basic Information
  propertyValue: number;
  assessedValue: number;
  taxableValue: number;
  
  // Tax Calculations
  totalAnnualTax: number;
  totalMonthlyTax: number;
  effectiveTaxRate: number;
  totalTaxRate: number;
  
  // Tax Breakdown
  countyTax: number;
  cityTax: number;
  schoolTax: number;
  specialDistrictTax: number;
  specialAssessmentsTotal: number;
  improvementAssessmentsTotal: number;
  bondAssessmentsTotal: number;
  
  // Exemptions
  totalExemptions: number;
  exemptionSavings: number;
  exemptionPercentage: number;
  
  // Payment Information
  paymentAmounts: {
    annual: number;
    semiAnnual: number;
    quarterly: number;
    monthly: number;
  };
  
  // Escrow Analysis
  escrowAnalysis: {
    requiredMonthlyPayment: number;
    currentEscrowPayment: number;
    escrowDeficit: number;
    escrowSurplus: number;
  };
  
  // Assessment Analysis
  assessmentToMarketRatio: number;
  assessmentChange: number;
  assessmentChangePercentage: number;
  
  // Historical Analysis
  taxGrowthRate: number;
  fiveYearProjection: number;
  tenYearProjection: number;
  taxBurdenTrend: 'increasing' | 'decreasing' | 'stable';
  
  // Comparative Analysis
  stateAverageTaxRate: number;
  countyAverageTaxRate: number;
  cityAverageTaxRate: number;
  comparisonPercentile: number;
  taxEfficiency: 'low' | 'medium' | 'high';
  
  // Timeline Analysis
  timelineAnalysis: Array<{
    year: number;
    date: string;
    assessedValue: number;
    taxAmount: number;
    taxRate: number;
    effectiveRate: number;
    cumulativeTax: number;
  }>;
  
  // Sensitivity Analysis
  sensitivityMatrix: Array<{
    variable: string;
    values: number[];
    impacts: number[];
  }>;
  
  // Scenarios
  scenarios: Array<{
    scenario: string;
    probability: number;
    taxAmount: number;
    effectiveRate: number;
  }>;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    property: string;
    taxAmount: number;
    effectiveRate: number;
    assessmentRatio: number;
    exemptions: number;
  }>;
  
  // Market Analysis
  marketAnalysis: Array<{
    factor: string;
    impact: string;
    risk: 'low' | 'medium' | 'high';
  }>;
  
  // Analysis Object
  analysis: PropertyTaxAnalysis;
  
  // Additional Metrics
  taxPerSquareFoot: number;
  taxPerBedroom: number;
  taxPerBathroom: number;
  taxBurdenRatio: number; // tax to income ratio
  affordabilityIndex: number;
  taxEfficiencyScore: number;
  
  // Projections
  fiveYearTaxProjection: number;
  tenYearTaxProjection: number;
  lifetimeTaxProjection: number;
  
  // Risk Assessment
  taxRiskScore: number;
  assessmentRisk: 'low' | 'medium' | 'high';
  rateChangeRisk: 'low' | 'medium' | 'high';
  exemptionRisk: 'low' | 'medium' | 'high';
  
  // Optimization Opportunities
  potentialSavings: number;
  optimizationOpportunities: string[];
  exemptionOpportunities: string[];
  appealOpportunities: string[];
}