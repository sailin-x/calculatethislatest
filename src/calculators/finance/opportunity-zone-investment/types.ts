export interface OpportunityZoneInvestmentInputs {
  // Investment Information
  investmentAmount: number;
  investmentDate: string;
  investmentType: 'real_estate' | 'business' | 'infrastructure' | 'mixed_use' | 'development';
  investmentStructure: 'direct' | 'fund' | 'partnership' | 'syndication';
  
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'office' | 'retail' | 'industrial' | 'multifamily' | 'hotel' | 'mixed_use' | 'land' | 'other';
  propertySize: number;
  propertyAge: number;
  numberOfUnits: number;
  
  // Opportunity Zone Information
  opportunityZoneLocation: string;
  opportunityZoneDesignation: string;
  opportunityZoneTier: 'tier_1' | 'tier_2' | 'tier_3';
  opportunityZoneBenefits: Array<{
    benefit: string;
    applicable: boolean;
    details: string;
  }>;
  
  // Tax Information
  originalGainAmount: number;
  originalGainDate: string;
  originalGainType: 'capital_gain' | 'ordinary_income' | 'mixed';
  investorTaxRate: number;
  stateTaxRate: number;
  localTaxRate: number;
  
  // Investment Timeline
  investmentPeriod: number;
  deferralPeriod: number;
  exclusionPeriod: number;
  basisStepUpPeriod: number;
  exitDate: string;
  
  // Revenue Projections
  revenueProjections: Array<{
    year: number;
    revenue: number;
    expenses: number;
    noi: number;
    appreciation: number;
  }>;
  
  // Tax Benefits
  taxDeferral: boolean;
  taxExclusion: boolean;
  basisStepUp: boolean;
  deferralPercentage: number;
  exclusionPercentage: number;
  basisStepUpPercentage: number;
  
  // Investment Returns
  expectedAnnualReturn: number;
  expectedAppreciation: number;
  expectedCashFlow: number;
  expectedExitValue: number;
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  comparableInvestments: Array<{
    investment: string;
    roi: number;
    irr: number;
    capRate: number;
  }>;
  
  // Risk Factors
  marketRisk: 'low' | 'medium' | 'high';
  regulatoryRisk: 'low' | 'medium' | 'high';
  liquidityRisk: 'low' | 'medium' | 'high';
  developmentRisk: 'low' | 'medium' | 'high';
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  discountRate: number;
  taxDeductionPeriod: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface OpportunityZoneInvestmentMetrics {
  // Tax Benefit Analysis
  taxDeferralBenefit: number;
  taxExclusionBenefit: number;
  basisStepUpBenefit: number;
  totalTaxBenefit: number;
  effectiveTaxRate: number;
  
  // Investment Returns
  totalReturn: number;
  annualizedReturn: number;
  internalRateOfReturn: number;
  netPresentValue: number;
  paybackPeriod: number;
  
  // Cash Flow Analysis
  annualCashFlow: number;
  totalCashFlow: number;
  cashOnCashReturn: number;
  equityMultiple: number;
  
  // Tax Analysis
  taxSavings: number;
  afterTaxReturn: number;
  taxEfficiency: number;
  taxAdvantage: number;
  
  // Risk Analysis
  riskScore: number;
  probabilityOfSuccess: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    metric: string;
    opportunityZone: number;
    traditional: number;
    difference: number;
    advantage: string;
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
    roi: number;
    irr: number;
    taxBenefit: number;
  }>;
  
  // Timeline Analysis
  timelineAnalysis: Array<{
    year: number;
    investment: number;
    cashFlow: number;
    taxBenefit: number;
    totalValue: number;
  }>;
  
  // Market Analysis
  marketAnalysis: Array<{
    factor: string;
    impact: number;
    risk: string;
    opportunity: string;
  }>;
  
  // Performance Benchmarks
  performanceBenchmarks: Array<{
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }>;
}

export interface OpportunityZoneInvestmentAnalysis {
  // Executive Summary
  investmentRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  taxBenefitRating: 'High Benefit' | 'Good Benefit' | 'Moderate Benefit' | 'Low Benefit' | 'No Benefit';
  recommendation: 'Proceed' | 'Consider' | 'Reconsider' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  valueFactors: string[];
  opportunities: string[];
  
  // Investment Analysis
  investmentSummary: string;
  returnAnalysis: string;
  cashFlowAnalysis: string;
  
  // Tax Benefit Analysis
  taxBenefitSummary: string;
  deferralAnalysis: string;
  exclusionAnalysis: string;
  basisStepUpAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  marketRisk: string;
  regulatoryRisk: string;
  liquidityRisk: string;
  developmentRisk: string;
  
  // Market Analysis
  marketAnalysis: string;
  opportunityZoneAnalysis: string;
  competitiveAnalysis: string;
  
  // Comparison Analysis
  comparisonSummary: string;
  traditionalComparison: string;
  advantageAnalysis: string;
  
  // Timeline Analysis
  timelineSummary: string;
  benefitTimeline: string;
  exitStrategy: string;
  
  // Recommendations
  investmentRecommendations: string[];
  optimizationSuggestions: string[];
  riskMitigation: string[];
  
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

export interface OpportunityZoneInvestmentOutputs {
  // Core Metrics
  totalReturn: number;
  internalRateOfReturn: number;
  totalTaxBenefit: number;
  afterTaxReturn: number;
  riskScore: number;
  cashOnCashReturn: number;
  equityMultiple: number;
  netPresentValue: number;
  
  // Analysis
  analysis: OpportunityZoneInvestmentAnalysis;
  
  // Additional Metrics
  taxDeferralBenefit: number;
  taxExclusionBenefit: number;
  basisStepUpBenefit: number;
  effectiveTaxRate: number;
  annualizedReturn: number;
  paybackPeriod: number;
  annualCashFlow: number;
  totalCashFlow: number;
  taxSavings: number;
  taxEfficiency: number;
  taxAdvantage: number;
  probabilityOfSuccess: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
  comparisonAnalysis: any[];
  sensitivityMatrix: any[];
  scenarios: any[];
  timelineAnalysis: any[];
  marketAnalysis: any[];
  performanceBenchmarks: any[];
}
