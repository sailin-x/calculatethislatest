export interface FixAndFlipInputs {
  // Property Information
  propertyAddress: string;
  propertyType: 'single_family' | 'townhouse' | 'condo' | 'multi_family' | 'commercial' | 'land';
  propertySize: number; // square feet
  lotSize: number; // square feet
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_work';
  
  // Purchase Information
  purchasePrice: number;
  purchaseDate: string;
  closingCosts: number;
  inspectionCosts: number;
  titleInsurance: number;
  transferTaxes: number;
  attorneyFees: number;
  otherPurchaseCosts: number;
  
  // Financing Information
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number; // in months
  loanType: 'hard_money' | 'private_money' | 'conventional' | 'cash' | 'portfolio';
  originationFee: number;
  points: number;
  monthlyPayment: number;
  
  // Renovation Information
  renovationBudget: number;
  renovationTimeline: number; // in months
  renovationCategories: {
    category: string;
    budget: number;
    actualCost: number;
    description: string;
  }[];
  
  // Renovation Details
  structuralWork: boolean;
  structuralWorkCost: number;
  electricalWork: boolean;
  electricalWorkCost: number;
  plumbingWork: boolean;
  plumbingWorkCost: number;
  hvacWork: boolean;
  hvacWorkCost: number;
  roofingWork: boolean;
  roofingWorkCost: number;
  kitchenRemodel: boolean;
  kitchenRemodelCost: number;
  bathroomRemodel: boolean;
  bathroomRemodelCost: number;
  flooringWork: boolean;
  flooringWorkCost: number;
  paintingWork: boolean;
  paintingWorkCost: number;
  landscapingWork: boolean;
  landscapingWorkCost: number;
  permitsAndFees: number;
  contingencyBudget: number;
  
  // Holding Costs
  propertyTaxes: number; // monthly
  insurance: number; // monthly
  utilities: number; // monthly
  hoaFees: number; // monthly
  propertyManagement: number; // monthly
  maintenance: number; // monthly
  otherHoldingCosts: number; // monthly
  
  // Market Information
  comparableProperties: {
    address: string;
    salePrice: number;
    saleDate: string;
    squareFootage: number;
    bedrooms: number;
    bathrooms: number;
    condition: string;
  }[];
  marketTrends: 'appreciating' | 'stable' | 'declining';
  averageDaysOnMarket: number;
  marketAbsorptionRate: number; // months of inventory
  
  // Exit Strategy
  targetSalePrice: number;
  targetSaleDate: string;
  sellingStrategy: 'mls' | 'fsbo' | 'wholesale' | 'auction' | 'investor_network';
  realtorCommission: number; // percentage
  closingCostsSeller: number;
  stagingCosts: number;
  marketingCosts: number;
  
  // Timeline
  acquisitionTimeline: number; // days
  renovationTimeline: number; // days
  marketingTimeline: number; // days
  totalProjectTimeline: number; // days
  
  // Risk Factors
  marketRisk: 'low' | 'medium' | 'high';
  renovationRisk: 'low' | 'medium' | 'high';
  financingRisk: 'low' | 'medium' | 'high';
  timelineRisk: 'low' | 'medium' | 'high';
  
  // Analysis Parameters
  analysisPeriod: number; // months
  discountRate: number;
  taxRate: number;
  inflationRate: number;
  appreciationRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'basis-points';
  includeCharts: boolean;
}

export interface FixAndFlipMetrics {
  // Investment Analysis
  totalInvestment: number;
  totalCosts: number;
  totalRevenue: number;
  netProfit: number;
  roi: number; // percentage
  cashOnCashReturn: number; // percentage
  annualizedReturn: number; // percentage
  
  // Financial Metrics
  purchaseCosts: number;
  renovationCosts: number;
  holdingCosts: number;
  sellingCosts: number;
  financingCosts: number;
  
  // Timeline Analysis
  totalTimeline: number; // days
  acquisitionTimeline: number; // days
  renovationTimeline: number; // days
  marketingTimeline: number; // days
  holdingPeriod: number; // days
  
  // Profitability Analysis
  profitMargin: number; // percentage
  profitPerSquareFoot: number;
  profitPerDay: number;
  breakEvenPrice: number;
  breakEvenTimeline: number; // days
  
  // Risk Metrics
  riskScore: number; // 1-10 scale
  probabilityOfProfit: number; // percentage
  worstCaseScenario: number;
  bestCaseScenario: number;
  expectedValue: number;
  
  // Market Analysis
  afterRepairValue: number;
  marketValue: number;
  pricePerSquareFoot: number;
  comparableAnalysis: {
    averagePrice: number;
    medianPrice: number;
    priceRange: { min: number; max: number };
    daysOnMarket: number;
  };
  
  // Financing Analysis
  monthlyPayment: number;
  totalInterestPaid: number;
  debtServiceCoverage: number;
  loanToValueRatio: number;
  debtToEquityRatio: number;
  
  // Cash Flow Analysis
  monthlyCashFlow: number;
  totalCashFlow: number;
  cashFlowTimeline: {
    month: number;
    cashFlow: number;
    cumulativeCashFlow: number;
  }[];
  
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
    profit: number;
    roi: number;
    timeline: number;
  }[];
}

export interface FixAndFlipAnalysis {
  // Executive Summary
  projectRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Proceed' | 'Proceed with Caution' | 'Reconsider' | 'Decline' | 'Require Changes';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Project Analysis
  projectSummary: string;
  financialAnalysis: string;
  marketAnalysis: string;
  
  // Investment Analysis
  investmentSummary: string;
  profitabilityAnalysis: string;
  cashFlowAnalysis: string;
  
  // Market Assessment
  marketAssessment: string;
  comparableAnalysis: string;
  pricingStrategy: string;
  
  // Risk Assessment
  riskProfile: string;
  marketRisk: string;
  renovationRisk: string;
  financingRisk: string;
  timelineRisk: string;
  
  // Timeline Analysis
  timelineAssessment: string;
  criticalPath: string;
  timelineRisks: string;
  
  // Financing Analysis
  financingAssessment: string;
  debtServiceAnalysis: string;
  equityAnalysis: string;
  
  // Exit Strategy
  exitStrategy: string;
  marketingPlan: string;
  contingencyPlans: string[];
  
  // Recommendations
  approvalConditions: string[];
  riskMitigation: string[];
  optimizationSuggestions: string[];
  
  // Implementation
  projectPlan: string;
  resourceRequirements: string[];
  timelineMilestones: string[];
  
  // Monitoring
  monitoringPlan: string;
  keyMetrics: string[];
  reportingSchedule: string;
  
  // Exit Planning
  exitPlanning: string;
  marketingStrategy: string;
  pricingStrategy: string;
  
  // Risk Management
  riskMitigationStrategies: string[];
  contingencyPlans: string[];
  insuranceRequirements: string[];
  
  // Performance Benchmarks
  performanceBenchmarks: {
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }[];
  
  // Decision Support
  committeeRecommendation: string;
  presentationPoints: string[];
  decisionFactors: string[];
}

export interface FixAndFlipOutputs extends FixAndFlipMetrics {
  analysis: FixAndFlipAnalysis;
  
  // Additional Output Metrics
  dataQuality: number; // Data quality score (0-100)
  modelAccuracy: number; // Model accuracy score (0-100)
  confidenceLevel: number; // Overall confidence level (0-100)
  
  // Time Series Analysis
  projectTimeline: {
    day: number;
    activity: string;
    cost: number;
    cumulativeCost: number;
    progress: number; // percentage
  }[];
  
  // Cash Flow Projections
  cashFlowProjections: {
    month: number;
    revenue: number;
    expenses: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
  }[];
  
  // Comparative Analysis
  comparativeAnalysis: {
    metric: string;
    thisProject: number;
    industryAverage: number;
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
    month: number;
    revenue: number;
    expenses: number;
    profit: number;
    roi: number;
  }[];
  
  // Project Timeline
  projectTimeline: {
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
  
  // Project Plan
  projectPlan: {
    phase: string;
    activities: string[];
    timeline: string;
    budget: number;
  }[];
  
  // Exit Planning
  exitPlanning: {
    strategy: string;
    timeline: string;
    marketing: string[];
    pricing: string[];
  }[];
  
  // Risk Mitigation
  riskMitigation: {
    risk: string;
    mitigation: string;
    cost: number;
    effectiveness: number;
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
