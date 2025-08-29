export interface GroundLeaseValuationInputs {
  // Property Information
  propertyAddress: string;
  propertyType: 'commercial' | 'residential' | 'industrial' | 'retail' | 'office' | 'mixed_use';
  propertySize: number; // square feet
  landSize: number; // acres
  zoning: string;
  currentUse: string;
  highestBestUse: string;
  
  // Lease Information
  leaseType: 'ground_lease' | 'land_lease' | 'master_lease' | 'sublease';
  leaseStartDate: string;
  leaseEndDate: string;
  leaseTerm: number; // years
  remainingTerm: number; // years
  renewalOptions: number;
  renewalTerm: number; // years per renewal
  
  // Financial Information
  currentRent: number; // annual
  rentEscalation: number; // percentage
  rentEscalationFrequency: 'annual' | 'biennial' | 'quinquennial' | 'decennial';
  rentReviewClause: boolean;
  rentReviewFrequency: number; // years
  rentReviewMethod: 'market' | 'cpi' | 'fixed' | 'hybrid';
  
  // Operating Information
  operatingExpenses: number; // annual
  propertyTaxes: number; // annual
  insurance: number; // annual
  maintenance: number; // annual
  utilities: number; // annual
  managementFees: number; // annual
  
  // Market Information
  marketRent: number; // annual per square foot
  marketCapRate: number; // percentage
  marketDiscountRate: number; // percentage
  marketGrowthRate: number; // percentage
  comparableSales: {
    address: string;
    salePrice: number;
    saleDate: string;
    capRate: number;
    size: number;
  }[];
  
  // Improvements
  buildingValue: number;
  buildingAge: number; // years
  buildingCondition: 'excellent' | 'good' | 'fair' | 'poor';
  remainingEconomicLife: number; // years
  depreciationRate: number; // percentage
  
  // Risk Factors
  tenantCredit: 'aaa' | 'aa' | 'a' | 'bbb' | 'bb' | 'b' | 'ccc' | 'default';
  leaseSecurity: 'guaranteed' | 'secured' | 'unsecured' | 'subordinated';
  marketRisk: 'low' | 'medium' | 'high';
  redevelopmentRisk: 'low' | 'medium' | 'high';
  
  // Legal and Regulatory
  zoningRestrictions: boolean;
  environmentalIssues: boolean;
  titleIssues: boolean;
  easements: boolean;
  restrictions: string[];
  
  // Analysis Parameters
  analysisPeriod: number; // years
  terminalCapRate: number; // percentage
  reversionValue: number;
  discountRate: number; // percentage
  inflationRate: number; // percentage
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'basis-points';
  includeCharts: boolean;
}

export interface GroundLeaseValuationMetrics {
  // Valuation Analysis
  presentValue: number;
  netPresentValue: number;
  internalRateOfReturn: number; // percentage
  yieldToMaturity: number; // percentage
  capitalizationRate: number; // percentage
  
  // Cash Flow Analysis
  annualCashFlow: number;
  totalCashFlow: number;
  cashOnCashReturn: number; // percentage
  debtServiceCoverage: number;
  
  // Income Analysis
  grossIncome: number;
  netOperatingIncome: number;
  effectiveGrossIncome: number;
  vacancyLoss: number;
  collectionLoss: number;
  
  // Expense Analysis
  totalExpenses: number;
  expenseRatio: number; // percentage
  netIncomeMultiplier: number;
  
  // Market Analysis
  marketValue: number;
  marketValuePerSquareFoot: number;
  marketValuePerAcre: number;
  comparableValue: number;
  
  // Risk Metrics
  riskScore: number; // 1-10 scale
  probabilityOfDefault: number; // percentage
  lossGivenDefault: number; // percentage
  expectedLoss: number;
  
  // Sensitivity Analysis
  sensitivityMatrix: {
    variable: string;
    values: number[];
    impacts: number[];
  }[];
  
  // Scenario Analysis
  scenarios: {
    scenario: string;
    probability: number;
    value: number;
    irr: number;
  }[];
}

export interface GroundLeaseValuationAnalysis {
  // Executive Summary
  valuationRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Invest' | 'Consider' | 'Hold' | 'Sell' | 'Avoid';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Valuation Analysis
  valuationSummary: string;
  incomeAnalysis: string;
  marketAnalysis: string;
  
  // Cash Flow Analysis
  cashFlowSummary: string;
  returnAnalysis: string;
  riskAnalysis: string;
  
  // Market Assessment
  marketAssessment: string;
  comparableAnalysis: string;
  marketPosition: string;
  
  // Risk Assessment
  riskAssessment: string;
  tenantRisk: string;
  marketRisk: string;
  legalRisk: string;
  
  // Lease Analysis
  leaseAnalysis: string;
  termAnalysis: string;
  renewalAnalysis: string;
  
  // Property Analysis
  propertyAnalysis: string;
  improvementAnalysis: string;
  landAnalysis: string;
  
  // Recommendations
  investmentRecommendations: string[];
  riskMitigation: string[];
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

export interface GroundLeaseValuationOutputs extends GroundLeaseValuationMetrics {
  analysis: GroundLeaseValuationAnalysis;
  
  // Additional Output Metrics
  dataQuality: number; // Data quality score (0-100)
  modelAccuracy: number; // Model accuracy score (0-100)
  confidenceLevel: number; // Overall confidence level (0-100)
  
  // Time Series Analysis
  cashFlowProjections: {
    year: number;
    grossIncome: number;
    expenses: number;
    netIncome: number;
    cashFlow: number;
    presentValue: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenario: string;
    probability: number;
    value: number;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
  
  // Comparative Analysis
  comparativeAnalysis: {
    metric: string;
    thisProperty: number;
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
    revenue: number;
    expenses: number;
    netIncome: number;
    value: number;
  }[];
  
  // Valuation Timeline
  valuationTimeline: {
    phase: string;
    duration: string;
    activities: string[];
    deliverables: string[];
  }[];
  
  // Due Diligence Checklist
  dueDiligenceChecklist: {
    category: string;
    items: {
      item: string;
      status: 'complete' | 'pending' | 'not_applicable';
      priority: 'high' | 'medium' | 'low';
      notes: string;
    }[];
  }[];
  
  // Investment Analysis
  investmentAnalysis: {
    metric: string;
    current: number;
    target: number;
    variance: number;
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
