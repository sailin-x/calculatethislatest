export interface NetOperatingIncomeInputs {
  // Property Information
  propertyName: string;
  propertyAddress: string;
  propertyType: 'office' | 'retail' | 'industrial' | 'multifamily' | 'hotel' | 'mixed_use' | 'land' | 'other';
  propertySize: number;
  propertyAge: number;
  numberOfUnits: number;
  occupancyRate: number;
  
  // Revenue Information
  grossRentalIncome: number;
  otherIncome: number;
  parkingIncome: number;
  laundryIncome: number;
  storageIncome: number;
  amenityIncome: number;
  lateFees: number;
  applicationFees: number;
  petFees: number;
  otherFees: number;
  
  // Operating Expenses
  propertyManagementFee: number;
  propertyManagementRate: number;
  propertyTaxes: number;
  propertyInsurance: number;
  utilities: number;
  maintenance: number;
  repairs: number;
  landscaping: number;
  janitorial: number;
  security: number;
  advertising: number;
  legalFees: number;
  accountingFees: number;
  otherExpenses: number;
  
  // Vacancy and Collection Loss
  vacancyRate: number;
  collectionLossRate: number;
  badDebtExpense: number;
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  comparableProperties: Array<{
    property: string;
    noi: number;
    noiPerSqFt: number;
    capRate: number;
  }>;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  rentGrowthRate: number;
  expenseGrowthRate: number;
  discountRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface NetOperatingIncomeMetrics {
  // Revenue Analysis
  totalRevenue: number;
  effectiveGrossIncome: number;
  grossRentalIncome: number;
  otherIncome: number;
  vacancyLoss: number;
  collectionLoss: number;
  netRentalIncome: number;
  
  // Expense Analysis
  totalOperatingExpenses: number;
  propertyManagementExpense: number;
  propertyTaxes: number;
  propertyInsurance: number;
  utilities: number;
  maintenance: number;
  repairs: number;
  landscaping: number;
  janitorial: number;
  security: number;
  advertising: number;
  legalFees: number;
  accountingFees: number;
  otherExpenses: number;
  
  // NOI Analysis
  netOperatingIncome: number;
  noiMargin: number;
  noiPerSquareFoot: number;
  noiPerUnit: number;
  
  // Performance Metrics
  grossRentMultiplier: number;
  netRentMultiplier: number;
  expenseRatio: number;
  vacancyLossRatio: number;
  collectionLossRatio: number;
  
  // Cash Flow Analysis
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashFlowMargin: number;
  
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
    noi: number;
    noiMargin: number;
    cashFlow: number;
  }>;
  
  // Trend Analysis
  trendAnalysis: Array<{
    year: number;
    revenue: number;
    expenses: number;
    noi: number;
    noiMargin: number;
  }>;
  
  // Benchmark Analysis
  benchmarkAnalysis: Array<{
    metric: string;
    property: number;
    market: number;
    difference: number;
    percentile: number;
  }>;
  
  // Risk Analysis
  riskScore: number;
  noiVolatility: number;
  expenseVolatility: number;
  revenueVolatility: number;
  
  // Market Analysis
  marketPosition: string;
  competitiveAnalysis: Array<{
    property: string;
    noi: number;
    noiPerSqFt: number;
    noiMargin: number;
    ranking: number;
  }>;
}

export interface NetOperatingIncomeAnalysis {
  // Executive Summary
  noiRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  performanceRating: 'High Performance' | 'Good Performance' | 'Average Performance' | 'Low Performance' | 'Poor Performance';
  recommendation: 'Optimize' | 'Maintain' | 'Improve' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  performanceFactors: string[];
  opportunities: string[];
  
  // NOI Analysis
  noiSummary: string;
  revenueAnalysis: string;
  expenseAnalysis: string;
  
  // Performance Analysis
  performanceSummary: string;
  marginAnalysis: string;
  efficiencyAnalysis: string;
  
  // Cash Flow Analysis
  cashFlowSummary: string;
  profitabilityAnalysis: string;
  sustainabilityAnalysis: string;
  
  // Market Analysis
  marketSummary: string;
  competitiveAnalysis: string;
  marketPosition: string;
  
  // Risk Assessment
  riskAssessment: string;
  revenueRisk: string;
  expenseRisk: string;
  marketRisk: string;
  
  // Benchmark Analysis
  benchmarkSummary: string;
  comparisonAnalysis: string;
  performanceGap: string;
  
  // Recommendations
  optimizationRecommendations: string[];
  improvementSuggestions: string[];
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

export interface NetOperatingIncomeOutputs {
  // Core Metrics
  netOperatingIncome: number;
  noiMargin: number;
  noiPerSquareFoot: number;
  noiPerUnit: number;
  totalRevenue: number;
  totalOperatingExpenses: number;
  effectiveGrossIncome: number;
  riskScore: number;
  
  // Analysis
  analysis: NetOperatingIncomeAnalysis;
  
  // Additional Metrics
  grossRentalIncome: number;
  otherIncome: number;
  vacancyLoss: number;
  collectionLoss: number;
  netRentalIncome: number;
  propertyManagementExpense: number;
  propertyTaxes: number;
  propertyInsurance: number;
  utilities: number;
  maintenance: number;
  repairs: number;
  landscaping: number;
  janitorial: number;
  security: number;
  advertising: number;
  legalFees: number;
  accountingFees: number;
  otherExpenses: number;
  grossRentMultiplier: number;
  netRentMultiplier: number;
  expenseRatio: number;
  vacancyLossRatio: number;
  collectionLossRatio: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashFlowMargin: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  trendAnalysis: any[];
  benchmarkAnalysis: any[];
  noiVolatility: number;
  expenseVolatility: number;
  revenueVolatility: number;
  marketPosition: string;
  competitiveAnalysis: any[];
}
