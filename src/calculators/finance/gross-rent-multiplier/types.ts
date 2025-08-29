export interface GrossRentMultiplierInputs {
  // Property Information
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'commercial' | 'industrial' | 'retail' | 'office' | 'mixed_use';
  propertySize: number; // square feet
  lotSize: number; // square feet
  yearBuilt: number;
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_work';
  bedrooms: number;
  bathrooms: number;
  
  // Financial Information
  purchasePrice: number;
  marketValue: number;
  annualGrossRent: number;
  monthlyGrossRent: number;
  annualOperatingExpenses: number;
  monthlyOperatingExpenses: number;
  annualNetOperatingIncome: number;
  monthlyNetOperatingIncome: number;
  
  // Rent Information
  rentPerUnit: number[];
  numberOfUnits: number;
  vacancyRate: number; // percentage
  collectionLoss: number; // percentage
  effectiveGrossIncome: number;
  
  // Expense Breakdown
  propertyTaxes: number; // annual
  insurance: number; // annual
  utilities: number; // annual
  maintenance: number; // annual
  propertyManagement: number; // annual
  repairs: number; // annual
  landscaping: number; // annual
  pestControl: number; // annual
  otherExpenses: number; // annual
  
  // Market Information
  marketGRM: number; // market gross rent multiplier
  marketCapRate: number; // percentage
  marketRent: number; // per square foot per year
  comparableProperties: {
    address: string;
    salePrice: number;
    annualRent: number;
    grm: number;
    saleDate: string;
    propertyType: string;
    size: number;
  }[];
  
  // Location Information
  city: string;
  state: string;
  zipCode: string;
  neighborhood: string;
  marketType: 'hot' | 'stable' | 'declining' | 'emerging';
  marketTrend: 'appreciating' | 'stable' | 'declining';
  
  // Property Features
  amenities: string[];
  parkingSpaces: number;
  hasPool: boolean;
  hasGym: boolean;
  hasLaundry: boolean;
  hasStorage: boolean;
  hasBalcony: boolean;
  hasFireplace: boolean;
  hasCentralAC: boolean;
  hasDishwasher: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // years
  rentGrowthRate: number; // percentage
  expenseGrowthRate: number; // percentage
  appreciationRate: number; // percentage
  discountRate: number; // percentage
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'basis-points';
  includeCharts: boolean;
}

export interface GrossRentMultiplierMetrics {
  // GRM Analysis
  grossRentMultiplier: number;
  netRentMultiplier: number;
  effectiveGrossRentMultiplier: number;
  marketGRMComparison: number; // difference from market
  
  // Financial Metrics
  totalInvestment: number;
  annualCashFlow: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number; // percentage
  returnOnInvestment: number; // percentage
  
  // Income Analysis
  grossIncome: number;
  netIncome: number;
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
  marketValuePerUnit: number;
  comparableValue: number;
  
  // Performance Metrics
  breakEvenRent: number;
  breakEvenOccupancy: number;
  profitMargin: number; // percentage
  operatingExpenseRatio: number; // percentage
  
  // Risk Metrics
  riskScore: number; // 1-10 scale
  vacancyRisk: number; // percentage
  marketRisk: number; // percentage
  expenseRisk: number; // percentage
  
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
    grm: number;
    roi: number;
  }[];
}

export interface GrossRentMultiplierAnalysis {
  // Executive Summary
  investmentRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Buy' | 'Consider' | 'Hold' | 'Sell' | 'Avoid';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // GRM Analysis
  grmSummary: string;
  marketComparison: string;
  investmentAnalysis: string;
  
  // Financial Analysis
  financialSummary: string;
  cashFlowAnalysis: string;
  returnAnalysis: string;
  
  // Market Assessment
  marketAssessment: string;
  comparableAnalysis: string;
  marketPosition: string;
  
  // Risk Assessment
  riskAssessment: string;
  vacancyRisk: string;
  marketRisk: string;
  expenseRisk: string;
  
  // Property Analysis
  propertyAnalysis: string;
  locationAnalysis: string;
  conditionAnalysis: string;
  
  // Income Analysis
  incomeAnalysis: string;
  rentAnalysis: string;
  expenseAnalysis: string;
  
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

export interface GrossRentMultiplierOutputs extends GrossRentMultiplierMetrics {
  analysis: GrossRentMultiplierAnalysis;
  
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
    grm: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenario: string;
    probability: number;
    grm: number;
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
    grm: number;
  }[];
  
  // Investment Timeline
  investmentTimeline: {
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
