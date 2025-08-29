export interface AngelInvestmentInputs {
  // Investment Details
  investmentAmount: number; // Amount being invested
  investmentType: 'equity' | 'convertible_note' | 'safe' | 'preferred_stock' | 'debt';
  investmentStage: 'pre_seed' | 'seed' | 'series_a' | 'series_b' | 'series_c' | 'growth';
  
  // Company Information
  companyName: string;
  industry: string;
  sector: string;
  companyStage: 'idea' | 'mvp' | 'early_traction' | 'product_market_fit' | 'scaling' | 'mature';
  foundingYear: number;
  teamSize: number;
  
  // Financial Metrics
  currentRevenue: number; // Annual recurring revenue
  revenueGrowthRate: number; // Monthly growth rate
  burnRate: number; // Monthly burn rate
  runway: number; // Months of runway
  customerCount: number;
  averageRevenuePerUser: number;
  
  // Valuation Information
  preMoneyValuation: number;
  postMoneyValuation: number;
  valuationMethod: 'revenue_multiple' | 'comparable_companies' | 'discounted_cash_flow' | 'asset_based' | 'market_size';
  revenueMultiple: number;
  
  // Investment Terms
  equityPercentage: number; // Percentage of equity received
  boardSeat: boolean;
  votingRights: boolean;
  informationRights: boolean;
  firstRefusalRights: boolean;
  tagAlongRights: boolean;
  dragAlongRights: boolean;
  
  // Convertible Security Terms
  conversionPrice?: number;
  discountRate?: number;
  valuationCap?: number;
  interestRate?: number; // For convertible notes
  maturityDate?: string; // For convertible notes
  
  // Anti-Dilution Protection
  antiDilutionProtection: boolean;
  antiDilutionType?: 'full_ratchet' | 'weighted_average' | 'broad_based' | 'narrow_based';
  
  // Liquidation Preferences
  liquidationPreference: number; // Multiple of investment
  participationRights: boolean;
  dividendRate?: number;
  
  // Market Analysis
  totalAddressableMarket: number;
  serviceableAddressableMarket: number;
  serviceableObtainableMarket: number;
  marketGrowthRate: number;
  
  // Competitive Analysis
  competitors: {
    name: string;
    marketShare: number;
    competitiveAdvantage: string;
  }[];
  
  // Team Assessment
  founderExperience: number; // Years of relevant experience
  technicalTeam: boolean;
  salesTeam: boolean;
  marketingTeam: boolean;
  advisoryBoard: boolean;
  
  // Product/Service
  productType: 'saas' | 'marketplace' | 'ecommerce' | 'mobile_app' | 'hardware' | 'biotech' | 'fintech' | 'other';
  productStage: 'concept' | 'development' | 'beta' | 'launched' | 'scaling' | 'mature';
  intellectualProperty: boolean;
  patents: number;
  trademarks: number;
  
  // Traction Metrics
  monthlyActiveUsers?: number;
  dailyActiveUsers?: number;
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  churnRate: number;
  netPromoterScore?: number;
  
  // Financial Projections
  projectedRevenue: {
    year: number;
    revenue: number;
    growthRate: number;
  }[];
  
  projectedEBITDA: {
    year: number;
    ebitda: number;
    margin: number;
  }[];
  
  // Exit Scenarios
  exitScenarios: {
    scenario: string;
    probability: number; // 0-100%
    exitValue: number;
    exitYear: number;
    exitType: 'ipo' | 'acquisition' | 'merger' | 'secondary' | 'management_buyout';
  }[];
  
  // Risk Assessment
  riskFactors: {
    factor: string;
    impact: 'high' | 'medium' | 'low';
    probability: number; // 0-100%
    mitigation: string;
  }[];
  
  // Market Conditions
  marketConditions: 'bull' | 'bear' | 'neutral';
  sectorTrends: 'growing' | 'stable' | 'declining';
  regulatoryEnvironment: 'favorable' | 'neutral' | 'unfavorable';
  
  // Investment Thesis
  investmentThesis: string;
  valueAdd: string[];
  expectedReturn: number; // Expected IRR
  expectedTimeline: number; // Years to exit
  
  // Due Diligence
  financialDueDiligence: boolean;
  legalDueDiligence: boolean;
  technicalDueDiligence: boolean;
  marketDueDiligence: boolean;
  
  // Legal and Compliance
  regulatoryCompliance: boolean;
  securitiesLawCompliance: boolean;
  taxImplications: {
    qualifiedSmallBusiness: boolean;
    section1202Eligible: boolean;
    longTermCapitalGains: boolean;
  };
  
  // Portfolio Considerations
  portfolioFit: 'strategic' | 'financial' | 'both';
  sectorDiversification: boolean;
  stageDiversification: boolean;
  geographicDiversification: boolean;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'basis-points';
  includeCharts: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // Years to analyze
  discountRate: number; // Required rate of return
  sensitivityAnalysis: boolean;
  monteCarloSimulation: boolean;
  numberOfSimulations?: number;
}

export interface AngelInvestmentMetrics {
  // Investment Analysis
  investmentAmount: number;
  equityReceived: number; // Number of shares
  equityPercentage: number;
  effectivePricePerShare: number;
  
  // Valuation Analysis
  preMoneyValuation: number;
  postMoneyValuation: number;
  impliedValuation: number;
  valuationMultiple: number;
  
  // Financial Metrics
  revenueMultiple: number;
  priceToSalesRatio: number;
  burnRate: number;
  runway: number;
  customerLifetimeValue: number;
  customerAcquisitionCost: number;
  ltvToCacRatio: number;
  
  // Market Analysis
  marketPenetration: number; // Percentage of SAM captured
  marketShare: number;
  competitivePosition: number; // 1-10 scale
  
  // Risk Metrics
  riskScore: number; // 1-10 scale
  riskAdjustedReturn: number;
  probabilityOfSuccess: number;
  
  // Return Analysis
  expectedIRR: number;
  expectedMOIC: number;
  expectedReturn: number;
  expectedExitValue: number;
  
  // Exit Scenarios
  exitReturns: {
    scenario: string;
    probability: number;
    exitValue: number;
    investorReturn: number;
    investorIRR: number;
    investorMOIC: number;
    exitYear: number;
  }[];
  
  // Sensitivity Analysis
  sensitivityMatrix: {
    variable: string;
    values: number[];
    returns: number[];
    irrs: number[];
  }[];
  
  // Monte Carlo Results
  monteCarloResults?: {
    meanReturn: number;
    medianReturn: number;
    standardDeviation: number;
    percentiles: { [key: string]: number };
    probabilityOfPositiveReturn: number;
  };
  
  // Comparable Analysis
  comparableMetrics: {
    metric: string;
    thisInvestment: number;
    industryAverage: number;
    topQuartile: number;
    bottomQuartile: number;
  }[];
  
  // Portfolio Impact
  portfolioImpact: {
    sectorAllocation: number;
    stageAllocation: number;
    geographicAllocation: number;
    diversificationScore: number;
  };
}

export interface AngelInvestmentAnalysis {
  // Executive Summary
  investmentRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Invest' | 'Pass' | 'Negotiate' | 'Strong Invest' | 'Strong Pass';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Investment Analysis
  investmentSummary: string;
  valuationAnalysis: string;
  returnAnalysis: string;
  
  // Market Analysis
  marketAssessment: string;
  competitiveAnalysis: string;
  growthPotential: string;
  
  // Team Assessment
  teamAnalysis: string;
  executionCapability: string;
  trackRecord: string;
  
  // Product/Service Analysis
  productAssessment: string;
  marketFit: string;
  competitiveAdvantage: string;
  
  // Financial Analysis
  financialHealth: string;
  cashFlowAnalysis: string;
  fundingRequirements: string;
  
  // Risk Assessment
  riskProfile: string;
  marketRisk: string;
  executionRisk: string;
  financialRisk: string;
  
  // Investment Terms
  termSheetAssessment: string;
  negotiationPoints: string[];
  dealStructure: string;
  
  // Exit Strategy
  exitStrategy: string;
  exitTimeline: string;
  exitValueProjections: string;
  
  // Due Diligence
  dueDiligenceStatus: string;
  criticalIssues: string[];
  recommendedActions: string[];
  
  // Investment Thesis
  thesisValidation: string;
  valueAddAssessment: string;
  strategicFit: string;
  
  // Portfolio Considerations
  portfolioFit: string;
  diversificationImpact: string;
  correlationAnalysis: string;
  
  // Market Context
  marketEnvironment: string;
  sectorOutlook: string;
  regulatoryOutlook: string;
  
  // Sensitivity Analysis
  sensitivityFactors: {
    factor: string;
    impact: number;
    direction: 'positive' | 'negative';
  }[];
  
  // Implementation Considerations
  investmentProcess: string[];
  legalRequirements: string[];
  operationalRequirements: string[];
  
  // Post-Investment
  postInvestmentPlan: string;
  valueAddActivities: string[];
  monitoringFrequency: string;
  
  // Exit Planning
  exitPlanning: string;
  exitTriggers: string[];
  exitPreparation: string[];
  
  // Risk Management
  riskMitigation: string[];
  contingencyPlans: string[];
  insuranceRequirements: string[];
  
  // Performance Benchmarks
  performanceBenchmarks: {
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }[];
  
  // Investment Committee
  committeeRecommendation: string;
  presentationPoints: string[];
  decisionFactors: string[];
}

export interface AngelInvestmentOutputs extends AngelInvestmentMetrics {
  analysis: AngelInvestmentAnalysis;
  
  // Additional Output Metrics
  dataQuality: number; // Data quality score (0-100)
  modelAccuracy: number; // Model accuracy score (0-100)
  confidenceLevel: number; // Overall confidence level (0-100)
  
  // Time Series Analysis
  investmentReturns: {
    year: number;
    return: number;
    cumulativeReturn: number;
    ownership: number;
    companyValue: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenario: string;
    probability: number;
    investorReturn: number;
    companyValue: number;
    exitYear: number;
  }[];
  
  // Comparative Analysis
  comparativeAnalysis: {
    metric: string;
    thisInvestment: number;
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
    year: number;
    revenue: number;
    ebitda: number;
    cashFlow: number;
    valuation: number;
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
  
  // Post-Investment Plan
  postInvestmentPlan: {
    quarter: string;
    activities: string[];
    metrics: string[];
    milestones: string[];
  }[];
  
  // Exit Planning
  exitPlanning: {
    scenario: string;
    timeline: string;
    preparation: string[];
    requirements: string[];
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
